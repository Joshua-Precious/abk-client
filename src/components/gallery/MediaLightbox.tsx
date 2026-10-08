import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import type { GalleryMedia } from "../../types/gallery";

interface MediaLightboxProps {
  items: GalleryMedia[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  /** More pages are available for this album. */
  hasMore?: boolean;
  /** Asks the parent to fetch the next page (called before the user runs out). */
  onRequestMore?: () => void;
  /** Whether the visible item is part of the multi-select download. */
  isSelected?: boolean;
  /** Adds/removes the visible item from the multi-select download. */
  onToggleSelected?: () => void;
  /** How many items the multi-select download currently holds. */
  selectedCount?: number;
  onDownloadSelected?: () => void;
  isPreparingDownload?: boolean;
  /** Live one-liner (`Preparing 3/12`, `12.4 of ~38 MB`) while the ZIP builds. */
  downloadProgressLabel?: string | null;
  downloadError?: string | null;
}

/**
 * Full-screen viewer.
 *
 * Shows the PREVIEW variant (never the original), falls back to the thumbnail
 * while it loads, and offers the original only through the explicit download
 * button. Nothing here is served by our API: downloadUrl / streamUrl are
 * Cloudflare URLs (or API redirects to Cloudflare).
 *
 * Rendered through a portal into `document.body` on purpose: the pages that
 * open it animate with `transform` (`.section-fade-in`) and use
 * `backdrop-filter` (`.liquid-glass`), and both make an ancestor a containing
 * block for `position: fixed`. Mounted inline, the overlay was sized and
 * positioned against that ancestor instead of the viewport, which showed the
 * page behind it and let the page scroll under the viewer.
 */
export default function MediaLightbox({
  items,
  index,
  onClose,
  onNavigate,
  hasMore = false,
  onRequestMore,
  isSelected = false,
  onToggleSelected,
  selectedCount = 0,
  onDownloadSelected,
  isPreparingDownload = false,
  downloadProgressLabel = null,
  downloadError = null,
}: MediaLightboxProps) {
  const total = items.length;
  const item = items[index] as GalleryMedia | undefined;

  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [failedId, setFailedId] = useState<string | null>(null);
  const [useThumbnail, setUseThumbnail] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const requestedForLength = useRef<number>(-1);

  // Keep the keyboard handler stable while always seeing fresh props.
  const latest = useRef({ index, total, onNavigate, onClose });
  useEffect(() => {
    latest.current = { index, total, onNavigate, onClose };
  });

  const goPrev = () => {
    if (total === 0) return;
    onNavigate((index - 1 + total) % total);
  };

  const goNext = () => {
    if (total === 0) return;
    onNavigate((index + 1) % total);
  };

  // Freeze the page behind the viewer.
  //
  // `overflow: hidden` alone is not enough: iOS Safari ignores it on the body
  // and the gallery still scrolls under the photo. Pinning the body (keeping
  // the scroll offset as a negative top) stops both, and restoring the offset
  // on close puts the user back exactly where they were.
  useEffect(() => {
    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Focus the overlay so the arrow keys work immediately.
  useEffect(() => {
    overlayRef.current?.focus();
  }, []);

  // Keyboard navigation.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { index: currentIndex, total: currentTotal, onClose: close, onNavigate: navigate } =
        latest.current;
      if (event.key === "Escape") {
        close();
        return;
      }
      if (currentTotal === 0) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate((currentIndex - 1 + currentTotal) % currentTotal);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate((currentIndex + 1) % currentTotal);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset the fallback chain whenever the visible item changes.
  useEffect(() => {
    setUseThumbnail(false);
  }, [item?.id]);

  // Load ahead so the user rarely hits the end of the loaded page.
  useEffect(() => {
    if (!hasMore || !onRequestMore || total === 0) return;
    if (index < total - 3) return;
    if (requestedForLength.current === total) return;
    requestedForLength.current = total;
    onRequestMore();
  }, [hasMore, onRequestMore, index, total]);

  if (!item) return null;

  const previewSrc = useThumbnail ? item.thumbnailUrl : item.previewUrl;
  const isLoaded = loadedId === item.id;
  const isFailed = failedId === item.id;

  const handleImageError = () => {
    // One graceful downgrade (preview -> thumbnail) before giving up.
    if (!useThumbnail && item.thumbnailUrl) {
      setUseThumbnail(true);
      return;
    }
    setFailedId(item.id);
  };

  const retryImage = () => {
    setFailedId(null);
    setUseThumbnail(false);
    setReloadKey((key) => key + 1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const end = event.changedTouches[0]?.clientX ?? start;
    const delta = end - start;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  const viewer = (
    <div
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.filename} — ${index + 1} of ${total}`}
      onClick={onClose}
      style={{ touchAction: "none" }}
      className="fixed inset-0 z-[200] flex h-screen w-screen flex-col overflow-hidden overscroll-none bg-black/95 backdrop-blur-lg outline-none select-none"
    >
      {/* Header */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2 md:px-8 md:py-3"
      >
        <div className="min-w-0">
          <p className="truncate text-xs font-bold uppercase tracking-widest text-white/90 md:text-sm">
            {item.filename}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/40 md:text-xs">
            {item.type === "VIDEO" ? "Video" : "Photo"} · {index + 1} / {total}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {onToggleSelected && (
            <button
              type="button"
              onClick={onToggleSelected}
              aria-pressed={isSelected}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors md:text-xs ${
                isSelected
                  ? "bg-[#f0b405] text-[#00060e] hover:bg-[#f0b405]/90"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Icon
                icon={isSelected ? "lucide:check-circle-2" : "lucide:circle-plus"}
                className="h-4 w-4"
              />
              <span className="hidden sm:inline">{isSelected ? "Selected" : "Select"}</span>
            </button>
          )}

          {onDownloadSelected && selectedCount > 1 && (
            <button
              type="button"
              onClick={onDownloadSelected}
              disabled={isPreparingDownload}
              className="flex items-center gap-2 rounded-full bg-[#f0b405] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#00060e] transition-colors hover:bg-[#f0b405]/90 disabled:opacity-60 md:text-xs"
            >
              {isPreparingDownload ? (
                <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon icon="lucide:folder-down" className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {isPreparingDownload && downloadProgressLabel
                  ? downloadProgressLabel
                  : `Download ${selectedCount}`}
              </span>
              <span className="sm:hidden">{selectedCount}</span>
            </button>
          )}

          <a
            href={item.downloadUrl}
            download={item.filename}
            rel="noopener"
            className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/20 md:text-xs"
          >
            <Icon icon="lucide:download" className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:rotate-90 hover:bg-white/20 md:h-10 md:w-10"
          >
            <Icon icon="lucide:x" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {downloadError && (
        <p className="shrink-0 border-b border-red-500/20 bg-red-500/10 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-red-200">
          {downloadError}
        </p>
      )}

      {/* Media */}
      <div
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
        className="relative flex min-h-0 grow items-center justify-center overflow-hidden px-2 py-3 md:px-16"
      >
        {item.type === "VIDEO" ? (
          item.streamUrl ? (
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              src={item.streamUrl}
              poster={item.posterUrl ?? undefined}
              className="max-h-full max-w-full rounded-2xl border border-white/10 bg-black shadow-2xl"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <Icon icon="lucide:video-off" className="h-10 w-10 text-white/40" />
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                This video is not available yet
              </p>
            </div>
          )
        ) : isFailed ? (
          <div className="flex max-w-sm flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
            <Icon icon="lucide:image-off" className="h-10 w-10 text-white/40" />
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              This photo could not be loaded
            </p>
            <button
              type="button"
              onClick={retryImage}
              className="cursor-pointer rounded-full bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/20"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin text-[#f0b405]" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Loading preview
                  </p>
                </div>
              </div>
            )}
            {previewSrc && (
              <img
                key={`${item.id}-${reloadKey}-${useThumbnail ? "thumb" : "preview"}`}
                src={previewSrc}
                alt={item.caption ?? item.filename}
                decoding="async"
                onLoad={() => setLoadedId(item.id)}
                onError={handleImageError}
                className={`max-h-full max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl transition-opacity duration-300 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
            {!previewSrc && (
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                No preview available for this photo
              </p>
            )}
          </>
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="absolute left-1 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-transform hover:scale-110 hover:bg-black/80 md:left-4 md:h-14 md:w-14"
            >
              <Icon icon="lucide:chevron-left" className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="absolute right-1 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-transform hover:scale-110 hover:bg-black/80 md:right-4 md:h-14 md:w-14"
            >
              <Icon icon="lucide:chevron-right" className="h-7 w-7" />
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex shrink-0 items-center justify-center gap-3 border-t border-white/10 px-4 py-2 md:py-3"
      >
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">
          {index + 1} / {total}
        </p>
        {selectedCount > 0 && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#f0b405]/90">
            {selectedCount} selected
          </p>
        )}
        {hasMore && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#f0b405]/80">
            Loading more…
          </span>
        )}
      </div>
    </div>
  );

  return createPortal(viewer, document.body);
}

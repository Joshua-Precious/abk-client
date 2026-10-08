import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
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
}

/**
 * Full-screen viewer.
 *
 * Shows the PREVIEW variant (never the original), falls back to the thumbnail
 * while it loads, and offers the original only through the explicit download
 * button. Nothing here is served by our API: downloadUrl / streamUrl are
 * Cloudflare URLs (or API redirects to Cloudflare).
 */
export default function MediaLightbox({
  items,
  index,
  onClose,
  onNavigate,
  hasMore = false,
  onRequestMore,
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

  // Lock page scroll while the viewer is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
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

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.filename} — ${index + 1} of ${total}`}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex flex-col bg-black/95 backdrop-blur-lg outline-none select-none"
    >
      {/* Header */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-8 md:py-4"
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-bold uppercase tracking-widest text-white/90 md:text-base">
            {item.filename}
          </p>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-white/40">
            {item.type === "VIDEO" ? "Video" : "Photo"} · {index + 1} / {total}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={item.downloadUrl}
            download={item.filename}
            rel="noopener"
            className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/20 md:px-4 md:text-sm"
          >
            <Icon icon="lucide:download" className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:rotate-90 hover:bg-white/20"
          >
            <Icon icon="lucide:x" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Media */}
      <div
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
        className="relative flex grow items-center justify-center overflow-hidden px-2 py-4 md:px-16"
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
              className="max-h-[80vh] max-w-full rounded-2xl border border-white/10 bg-black shadow-2xl"
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
                className={`max-h-[80vh] max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl transition-opacity duration-300 ${
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
              className="absolute left-1 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-transform hover:scale-110 hover:bg-black/80 md:left-4 md:h-14 md:w-14"
            >
              <Icon icon="lucide:chevron-left" className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="absolute right-1 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-transform hover:scale-110 hover:bg-black/80 md:right-4 md:h-14 md:w-14"
            >
              <Icon icon="lucide:chevron-right" className="h-7 w-7" />
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex items-center justify-center gap-3 border-t border-white/10 px-4 py-3 md:py-4"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-white/50">
          {index + 1} / {total}
        </p>
        {hasMore && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#f0b405]/80">
            Loading more…
          </span>
        )}
      </div>
    </div>
  );
}

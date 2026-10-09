/**
 * Album media grid: 30-40 thumbnails per page, lazy loaded, mobile first.
 * Originals are only ever fetched through an explicit download action, and a
 * multi-select download is packaged server-side into one ZIP.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { useInfiniteMedia } from "../../hooks/useInfiniteMedia";
import { downloadSelectionZipWithProgress, MAX_ZIP_SELECTION } from "../../services/gallery.api";
import type { ZipDownloadProgress } from "../../services/gallery.api";
import LazyVideo from "./LazyVideo";
import MediaLightbox from "./MediaLightbox";
import type { GalleryAlbum, GalleryMedia, GalleryMediaType } from "../../types/gallery";

type Filter = "ALL" | GalleryMediaType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "IMAGE", label: "Photos" },
  { value: "VIDEO", label: "Videos" },
];

const formatDuration = (seconds: number | null): string | null => {
  if (seconds === null || !Number.isFinite(seconds) || seconds <= 0) return null;
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  return `${minutes}:${String(total % 60).padStart(2, "0")}`;
};

/** `1048576` -> `1.0 MB`, for the download progress readout. */
const formatBytes = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

/** One-line human summary of a running ZIP download (`Preparing 3/12`, `12.4 of ~38 MB`). */
const progressLabel = (progress: ZipDownloadProgress | null): string | null => {
  if (!progress || progress.phase === "done") return null;
  if (progress.phase === "preparing" && progress.filesTotal !== null) {
    return `Preparing ${progress.filesDone}/${progress.filesTotal}`;
  }
  if (progress.bytesTotal !== null && progress.bytesTotal > 0) {
    return `${formatBytes(progress.bytesReceived)} of ~${formatBytes(progress.bytesTotal)}`;
  }
  return `${formatBytes(progress.bytesReceived)} received`;
};

/** 0-100 for the determinate bar, or null while nothing measurable has arrived. */
const progressPercent = (progress: ZipDownloadProgress | null): number | null => {
  if (!progress || progress.phase === "done") return null;
  if (progress.bytesTotal !== null && progress.bytesTotal > 0 && progress.bytesReceived > 0) {
    return Math.min(99, (progress.bytesReceived / progress.bytesTotal) * 100);
  }
  if (progress.filesTotal !== null && progress.filesTotal > 0 && progress.filesDone > 0) {
    return Math.min(99, (progress.filesDone / progress.filesTotal) * 100);
  }
  return null;
};

/** Saves a Blob under a filename, the same way the admin export does. */
const saveBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
};

function SkeletonTiles({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="aspect-square rounded-xl border border-white/10 bg-white/5 animate-pulse"
        />
      ))}
    </>
  );
}

interface MediaTileProps {
  media: GalleryMedia;
  onOpen: () => void;
  selectMode: boolean;
  selected: boolean;
  onToggle: () => void;
}

function MediaTile({ media, onOpen, selectMode, selected, onToggle }: MediaTileProps) {
  const [failed, setFailed] = useState(false);
  const duration = formatDuration(media.duration);

  if (media.type === "VIDEO") {
    return (
      <div
        className={`relative aspect-square rounded-xl overflow-hidden border bg-black/40 ${
          selected ? "border-[#f0b405]" : "border-white/10"
        }`}
      >
        <LazyVideo
          src={media.streamUrl ?? ""}
          poster={media.posterUrl}
          className="h-full w-full"
        />
        {duration !== null && (
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white/90">
            {duration}
          </span>
        )}
        {selectMode && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={selected ? `Deselect ${media.filename}` : `Select ${media.filename}`}
            aria-pressed={selected}
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white"
          >
            <Icon
              icon={selected ? "lucide:check" : "lucide:plus"}
              className="h-4 w-4"
            />
          </button>
        )}
      </div>
    );
  }

  const showImage = Boolean(media.thumbnailUrl) && !failed;

  return (
    <button
      type="button"
      onClick={selectMode ? onToggle : onOpen}
      aria-pressed={selectMode ? selected : undefined}
      aria-label={
        selectMode
          ? selected
            ? `Deselect ${media.filename}`
            : `Select ${media.filename}`
          : `Open ${media.filename}`
      }
      className={`group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-xl border bg-neutral/40 ${
        selected ? "border-[#f0b405] ring-2 ring-[#f0b405]/70" : "border-white/10"
      }`}
    >
      {showImage ? (
        <img
          src={media.thumbnailUrl ?? ""}
          alt={media.caption ?? media.filename}
          loading="lazy"
          decoding="async"
          width={media.width ?? undefined}
          height={media.height ?? undefined}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-2 text-center text-white/35">
          <Icon icon="lucide:image-off" className="w-6 h-6" />
          <span className="text-[10px] font-semibold uppercase tracking-widest">
            Unavailable
          </span>
        </div>
      )}

      {selectMode ? (
        <span
          className={`pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border ${
            selected
              ? "border-[#f0b405] bg-[#f0b405] text-[#00060e]"
              : "border-white/40 bg-black/60 text-white/70"
          }`}
        >
          <Icon
            icon={selected ? "lucide:check" : "lucide:circle"}
            className="h-4 w-4"
          />
        </span>
      ) : (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
          <Icon icon="lucide:maximize-2" className="w-5 h-5 text-white" />
        </span>
      )}
    </button>
  );
}

export default function MediaGrid({ album }: { album: GalleryAlbum }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [isPreparing, setIsPreparing] = useState(false);
  const [zipProgress, setZipProgress] = useState<ZipDownloadProgress | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Pages load silently as the visitor scrolls (and ahead of them inside the
  // viewer): there is deliberately no "loading more"/"load more" affordance on
  // screen, only the sentinel below.
  const { items, isLoading, error, hasMore, loadMore, retry } = useInfiniteMedia(
    album.slug,
    filter,
    36,
  );

  const showFilter = album.imageCount > 0 && album.videoCount > 0;
  const selectedCount = selection.size;
  const atSelectionLimit = selectedCount >= MAX_ZIP_SELECTION;

  const handleFilter = (next: Filter) => {
    setFilter(next);
    setOpenIndex(null);
  };

  const toggleSelected = useCallback((id: string) => {
    setDownloadError(null);
    setSelection((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= MAX_ZIP_SELECTION) return current;
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectLoaded = () => {
    setDownloadError(null);
    setSelection(new Set(items.slice(0, MAX_ZIP_SELECTION).map((media) => media.id)));
  };

  const exitSelectMode = () => {
    setSelectMode(false);
    setSelection(new Set());
    setDownloadError(null);
  };

  const handleDownloadSelection = async () => {
    if (selectedCount === 0 || isPreparing) return;
    setIsPreparing(true);
    setZipProgress(null);
    setDownloadError(null);
    try {
      const blob = await downloadSelectionZipWithProgress([...selection], {
        onProgress: setZipProgress,
      });
      saveBlob(blob, `ABK-${selectedCount}${selectedCount === 1 ? "-photo" : "-photos"}.zip`);
    } catch (caught) {
      setDownloadError(
        caught instanceof Error ? caught.message : "Could not prepare the download",
      );
    } finally {
      setIsPreparing(false);
      setZipProgress(null);
    }
  };

  const downloadLabel = progressLabel(zipProgress);
  const downloadPercent = progressPercent(zipProgress);

  // Fetch the next page well before the user reaches the bottom of the grid.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: "600px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <section className="w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        {showFilter ? (
          <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
            {FILTERS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleFilter(option.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all md:text-sm ${
                  filter === option.value
                    ? "bg-[#f0b405] text-[#00060e] shadow-lg shadow-[#f0b405]/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            {selectMode ? (
              <>
                <button
                  type="button"
                  onClick={selectLoaded}
                  className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/80 transition-colors hover:bg-white/10"
                >
                  Select all loaded
                </button>
                <button
                  type="button"
                  onClick={exitSelectMode}
                  className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/80 transition-colors hover:bg-white/10"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setSelectMode(true)}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/80 transition-colors hover:bg-white/10"
              >
                <Icon icon="lucide:check-square" className="h-4 w-4" />
                Select
              </button>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          <SkeletonTiles count={12} />
        </div>
      ) : error !== null && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Icon icon="lucide:cloud-off" className="mb-4 h-14 w-14 text-red-400/80" />
          <h3 className="mb-2 text-xl font-bold text-white">Could not load this album</h3>
          <p className="mb-6 max-w-md text-sm text-white/60">{error}</p>
          <button
            type="button"
            onClick={retry}
            className="flex items-center gap-2 rounded-xl bg-[#f0b405] px-5 py-2.5 text-sm font-bold text-[#00060e] transition-all hover:bg-[#f0b405]/90"
          >
            <Icon icon="lucide:refresh-cw" className="h-4 w-4" /> Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Icon icon="lucide:image-off" className="h-8 w-8 text-white/40" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">No media in this album yet</h3>
          <p className="text-sm text-white/60">
            Photos and videos appear here as soon as they are published.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {items.map((media, index) => (
              <MediaTile
                key={media.id}
                media={media}
                onOpen={() => setOpenIndex(index)}
                selectMode={selectMode}
                selected={selection.has(media.id)}
                onToggle={() => toggleSelected(media.id)}
              />
            ))}
          </div>

          {error !== null && (
            <div className="mt-6 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-red-400/90">{error}</p>
              <button
                type="button"
                onClick={retry}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                <Icon icon="lucide:refresh-cw" className="h-4 w-4" /> Try again
              </button>
            </div>
          )}

          {!hasMore && (
            <p className="mt-6 text-center text-[10px] font-semibold uppercase tracking-widest text-white/35">
              End of album
            </p>
          )}
        </>
      )}

      <div ref={sentinelRef} className="h-10" aria-hidden="true" />

      {/*
        Selection bar: pinned to the bottom of the screen so the action stays
        reachable in a long album. Rendered through a portal into `document.body`
        because the album page wraps this grid in `.section-fade-in`, whose
        animated `transform` makes that ancestor a containing block - an inline
        `position: fixed` bar was laid out at the bottom of the section instead
        of the viewport, thousands of pixels below the fold.
      */}
      {selectMode && createPortal(
        <div className="fixed inset-x-0 bottom-0 z-[150] border-t border-white/10 bg-[#0f0f13]/95 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              {selectedCount} selected
              {atSelectionLimit && (
                <span className="ml-2 text-[#f0b405]">
                  (max {MAX_ZIP_SELECTION} per download)
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadSelection}
                disabled={selectedCount === 0 || isPreparing}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-[#f0b405] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#00060e] transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPreparing ? (
                  <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon icon="lucide:folder-down" className="h-4 w-4" />
                )}
                {isPreparing ? (downloadLabel ?? "Preparing ZIP") : `Download ${selectedCount || ""}`.trim()}
              </button>
              <button
                type="button"
                onClick={() => setSelection(new Set())}
                disabled={selectedCount === 0}
                className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white/80 transition-colors hover:bg-white/10 disabled:opacity-40"
              >
                Clear
              </button>
            </div>
          </div>
          {isPreparing && (
            <div className="mx-auto mt-2 max-w-5xl" aria-live="polite">
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                {downloadPercent !== null ? (
                  <div
                    className="h-full rounded-full bg-[#f0b405] transition-[width] duration-300"
                    style={{ width: `${downloadPercent}%` }}
                  />
                ) : (
                  <div className="h-full w-1/3 animate-pulse rounded-full bg-[#f0b405]/70" />
                )}
              </div>
              {downloadLabel && (
                <p className="mt-1 text-center text-[10px] font-bold uppercase tracking-widest text-white/60">
                  {downloadLabel}
                </p>
              )}
            </div>
          )}
          {downloadError && (
            <p className="mx-auto mt-2 max-w-5xl text-center text-[11px] font-semibold uppercase tracking-wider text-red-300">
              {downloadError}
            </p>
          )}
        </div>,
        document.body,
      )}

      <div className={selectMode ? "h-24" : undefined} aria-hidden="true" />

      {openIndex !== null && items[openIndex] && (
        <MediaLightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
          hasMore={hasMore}
          onRequestMore={loadMore}
          isSelected={selection.has(items[openIndex].id)}
          onToggleSelected={() => {
            setSelectMode(true);
            toggleSelected(items[openIndex].id);
          }}
          selectedCount={selectedCount}
          onDownloadSelected={handleDownloadSelection}
          isPreparingDownload={isPreparing}
          downloadProgressLabel={downloadLabel}
          downloadError={downloadError}
        />
      )}
    </section>
  );
}

/**
 * Album media grid: 30-40 thumbnails per page, lazy loaded, mobile first.
 * Originals are only ever fetched through the lightbox download action.
 */
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useInfiniteMedia } from "../../hooks/useInfiniteMedia";
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

function MediaTile({ media, onOpen }: { media: GalleryMedia; onOpen: () => void }) {
  const [failed, setFailed] = useState(false);
  const duration = formatDuration(media.duration);

  if (media.type === "VIDEO") {
    return (
      <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40">
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
      </div>
    );
  }

  const showImage = Boolean(media.thumbnailUrl) && !failed;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${media.filename}`}
      className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-neutral/40"
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
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
        <Icon icon="lucide:maximize-2" className="w-5 h-5 text-white" />
      </span>
    </button>
  );
}

export default function MediaGrid({ album }: { album: GalleryAlbum }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { items, isLoading, isLoadingMore, error, hasMore, loadMore, retry } = useInfiniteMedia(
    album.slug,
    filter,
    36,
  );

  const showFilter = album.imageCount > 0 && album.videoCount > 0;

  const handleFilter = (next: Filter) => {
    setFilter(next);
    setOpenIndex(null);
  };

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
      {showFilter && (
        <div className="mb-6 flex justify-center md:justify-start">
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
        </div>
      )}

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
              <MediaTile key={media.id} media={media} onOpen={() => setOpenIndex(index)} />
            ))}
          </div>

          {isLoadingMore && (
            <div
              className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4"
              aria-hidden="true"
            >
              <SkeletonTiles count={4} />
            </div>
          )}

          {error !== null && (
            <div className="mt-6 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-red-400/90">{error}</p>
              <button
                type="button"
                onClick={retry}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                <Icon icon="lucide:refresh-cw" className="h-4 w-4" /> Load more
              </button>
            </div>
          )}

          {hasMore && error === null && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={isLoadingMore}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/90 transition-all hover:bg-white/10 disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                )}
                Load more
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

      {openIndex !== null && items[openIndex] && (
        <MediaLightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
          hasMore={hasMore}
          onRequestMore={loadMore}
        />
      )}
    </section>
  );
}

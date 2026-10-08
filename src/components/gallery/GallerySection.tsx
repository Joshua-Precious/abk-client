import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router";
import AlbumGrid from "./AlbumGrid";
import { fetchAlbums } from "../../services/gallery.api";
import type { GalleryAlbum } from "../../types/gallery";

interface GallerySectionProps {
  className?: string;
}

const AlbumSkeleton = () => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="mb-4 aspect-square animate-pulse rounded-xl bg-white/10" />
    <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-white/10" />
    <div className="mx-auto mt-2 h-3 w-1/3 animate-pulse rounded bg-white/5" />
  </div>
);

/**
 * Album browser used inside the About page. Data-driven: adding next year's
 * media to R2 and running the import is all it takes for this to update.
 */
export default function GallerySection({ className = "" }: GallerySectionProps) {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    setIsLoading(true);
    setError(null);

    fetchAlbums(controller.signal)
      .then((data) => {
        if (isActive) setAlbums(data);
      })
      .catch((caught: unknown) => {
        if (!isActive) return;
        if ((caught as Error)?.name === "AbortError") return;
        setError(caught instanceof Error ? caught.message : "Could not load the gallery");
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [reloadKey]);

  return (
    <div className={`w-full max-w-6xl mx-auto px-4 ${className}`}>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, index) => (
            <AlbumSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="liquid-glass mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-500/20 px-6 py-10 text-center">
          <Icon icon="lucide:alert-circle" className="h-10 w-10 text-red-400" />
          <div>
            <p className="text-lg font-bold uppercase tracking-wider text-white">
              Gallery unavailable
            </p>
            <p className="mt-1 text-sm text-white/60">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
            className="cursor-pointer rounded-full bg-[#f0b405] px-6 py-2 text-xs font-extrabold uppercase tracking-widest text-[#00060e] transition-transform hover:scale-105"
          >
            Try again
          </button>
        </div>
      ) : albums.length === 0 ? (
        <div className="liquid-glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/10 px-6 py-10 text-center">
          <Icon icon="lucide:images" className="h-10 w-10 text-white/40" />
          <p className="text-lg font-bold uppercase tracking-wider text-white">
            Coming soon
          </p>
          <p className="text-sm text-white/60">
            The gallery for this year is being uploaded. Please check back shortly.
          </p>
        </div>
      ) : (
        <>
          <AlbumGrid albums={albums} />
          <div className="mt-10 flex justify-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all hover:scale-[1.03] hover:border-[#f0b405]/50 hover:text-[#f0b405]"
            >
              View full gallery
              <Icon icon="lucide:arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

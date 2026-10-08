import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router";
import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";
import MediaGrid from "../components/gallery/MediaGrid";
import ScrollToTop from "../components/ui/ScrollToTop";
import { fetchAlbum, GalleryApiError } from "../services/gallery.api";
import type { GalleryAlbum } from "../types/gallery";

export default function GalleryAlbumPage() {
  const { slug } = useParams<{ slug: string }>();
  const [album, setAlbum] = useState<GalleryAlbum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    setIsLoading(true);
    setError(null);
    setNotFound(false);

    fetchAlbum(slug, controller.signal)
      .then((data) => {
        if (isActive) setAlbum(data);
      })
      .catch((caught: unknown) => {
        if (!isActive) return;
        if ((caught as Error)?.name === "AbortError") return;
        if (caught instanceof GalleryApiError && caught.status === 404) {
          setNotFound(true);
          return;
        }
        setError(caught instanceof Error ? caught.message : "Could not load this album");
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [slug, reloadKey]);

  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <ScrollToTop />
      <Header />

      <main className="pt-28 md:pt-36 grow relative z-10 container mx-auto px-4 pb-20">
        <div className="mb-6 flex justify-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/60 transition-colors hover:text-[#f0b405]"
          >
            <Icon icon="lucide:arrow-left" className="h-4 w-4" />
            Back to albums
          </Link>
        </div>

        {isLoading ? (
          <>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mx-auto h-12 w-2/3 animate-pulse rounded bg-white/10" />
              <div className="mx-auto mt-4 h-4 w-1/3 animate-pulse rounded bg-white/5" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {Array.from({ length: 12 }, (_, index) => (
                <div key={index} className="aspect-square animate-pulse rounded-xl bg-white/10" />
              ))}
            </div>
          </>
        ) : notFound ? (
          <div className="liquid-glass mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-white/10 px-6 py-12 text-center section-fade-in">
            <Icon icon="lucide:image-off" className="h-12 w-12 text-white/40" />
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wider text-white">
                Album not found
              </h1>
              <p className="mt-1 text-sm text-white/60">
                This album may have been renamed or is not published yet.
              </p>
            </div>
            <Link
              to="/gallery"
              className="rounded-full bg-[#f0b405] px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-[#00060e] transition-transform hover:scale-105"
            >
              Browse albums
            </Link>
          </div>
        ) : error || !album ? (
          <div className="liquid-glass mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-500/20 px-6 py-12 text-center section-fade-in">
            <Icon icon="lucide:alert-circle" className="h-12 w-12 text-red-400" />
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wider text-white">
                Album unavailable
              </h1>
              <p className="mt-1 text-sm text-white/60">
                {error ?? "Could not load this album"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="cursor-pointer rounded-full bg-[#f0b405] px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-[#00060e] transition-transform hover:scale-105"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="section-fade-in">
            <div className="mx-auto mb-6 max-w-2xl text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-[#f0b405] tracking-wider uppercase mb-3">
                {album.name}
              </h1>
              {album.description && (
                <p className="text-white/75 text-sm md:text-base font-semibold uppercase tracking-wide">
                  {album.description}
                </p>
              )}
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-white/50">
                {album.mediaCount} {album.mediaCount === 1 ? "item" : "items"}
                {album.videoCount > 0
                  ? ` · ${album.videoCount} ${album.videoCount === 1 ? "video" : "videos"}`
                  : ""}
                {album.eventYear ? ` · ABK ${String(album.eventYear).slice(2)}` : ""}
              </p>
              <div className="w-24 h-1 bg-[#f0b405] mx-auto mt-6 rounded-full" />
            </div>

            <MediaGrid album={album} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

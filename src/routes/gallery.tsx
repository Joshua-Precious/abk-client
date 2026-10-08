import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";
import AlbumGrid from "../components/gallery/AlbumGrid";
import ScrollToTop from "../components/ui/ScrollToTop";
import { fetchAlbums } from "../services/gallery.api";
import type { GalleryAlbum } from "../types/gallery";

export default function GalleryPage() {
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
    <div className="flex flex-col min-h-screen text-neutral-content">
      <ScrollToTop />
      <Header />

      <main className="pt-28 md:pt-36 grow relative z-10 container mx-auto px-4 pb-20">
        <div className="text-center mb-12 section-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-[#f0b405] tracking-wider uppercase mb-4">
            Gallery
          </h1>
          <p className="text-white/80 text-lg md:text-2xl font-semibold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
            Relive the moments from Accra&apos;s Boogie King
          </p>
          <div className="w-24 h-1 bg-[#f0b405] mx-auto mt-6 rounded-full" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-4 aspect-square animate-pulse rounded-xl bg-white/10" />
                <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-white/10" />
                <div className="mx-auto mt-2 h-3 w-1/3 animate-pulse rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="liquid-glass mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-500/20 px-6 py-12 text-center section-fade-in">
            <Icon icon="lucide:alert-circle" className="h-12 w-12 text-red-400" />
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                Gallery unavailable
              </h2>
              <p className="mt-1 text-sm text-white/60">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="cursor-pointer rounded-full bg-[#f0b405] px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-[#00060e] transition-transform hover:scale-105"
            >
              Try again
            </button>
          </div>
        ) : albums.length === 0 ? (
          <div className="liquid-glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/10 px-6 py-12 text-center section-fade-in">
            <Icon icon="lucide:images" className="h-12 w-12 text-white/40" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">
              Coming soon
            </h2>
            <p className="text-sm text-white/60">
              The gallery for this year is being uploaded. Please check back shortly.
            </p>
          </div>
        ) : (
          <div className="section-fade-in">
            <AlbumGrid albums={albums} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

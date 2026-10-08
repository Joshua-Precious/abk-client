import { useState } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import type { GalleryAlbum } from "../../types/gallery";

/** Cover tile that degrades to a placeholder instead of a broken image. */
function AlbumCover({ album }: { album: GalleryAlbum }) {
  const [failed, setFailed] = useState(false);

  if (!album.coverThumbnailUrl || failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/30">
        <Icon icon="lucide:image-off" className="w-7 h-7" />
        <span className="text-[10px] font-semibold uppercase tracking-widest">
          No cover
        </span>
      </div>
    );
  }

  return (
    <img
      src={album.coverThumbnailUrl}
      alt={`${album.name} cover`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

const countLabel = (album: GalleryAlbum): string => {
  const parts: string[] = [];

  if (album.imageCount > 0) {
    parts.push(`${album.imageCount} ${album.imageCount === 1 ? "PHOTO" : "PHOTOS"}`);
  }
  if (album.videoCount > 0) {
    parts.push(`${album.videoCount} ${album.videoCount === 1 ? "VIDEO" : "VIDEOS"}`);
  }

  return parts.length > 0 ? parts.join(" · ") : "EMPTY";
};

/** Presentational album grid: thumbnails only, never originals. */
export default function AlbumGrid({ albums }: { albums: GalleryAlbum[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {albums.map((album) => (
        <Link
          key={album.id}
          to={`/gallery/${album.slug}`}
          className="group relative block rounded-2xl liquid-glass border border-white/10 p-3 md:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(240,180,5,0.18)]"
        >
          <div className="relative aspect-square rounded-xl overflow-hidden mb-3 border border-white/10 bg-neutral/50">
            <AlbumCover album={album} />

            {album.eventYear !== null && (
              <div className="absolute top-2 left-2 bg-[#f0b405] text-black font-extrabold px-2.5 py-0.5 rounded-md text-xs shadow-md">
                {album.eventYear}
              </div>
            )}

            {album.videoCount > 0 && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 border border-white/15 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                <Icon icon="lucide:play" className="w-3 h-3" />
                {album.videoCount}
              </div>
            )}
          </div>

          <h3 className="text-sm md:text-lg font-bold text-white tracking-wide uppercase truncate transition-colors group-hover:text-[#f0b405]">
            {album.name}
          </h3>
          <p className="text-[10px] md:text-xs text-white/50 tracking-widest mt-1 uppercase font-semibold">
            {countLabel(album)}
          </p>
        </Link>
      ))}
    </div>
  );
}

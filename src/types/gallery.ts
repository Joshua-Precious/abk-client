/**
 * Shared gallery types. These mirror the shapes returned by the gallery API
 * (`GET /api/albums`, `GET /api/albums/:slug`, `GET /api/albums/:slug/media`).
 */

export type GalleryMediaType = "IMAGE" | "VIDEO";

export interface GalleryMedia {
  id: string;
  // Prisma enum serialises as the string literal "IMAGE" | "VIDEO".
  type: GalleryMediaType;
  albumSlug: string;
  filename: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  /** Seconds, videos only. */
  duration: number | null;
  caption: string | null;
  /** Small grid image. Never the original. */
  thumbnailUrl: string | null;
  /** Lightbox image (roughly 1600px). Never the original. */
  previewUrl: string | null;
  /** API endpoint that redirects to the original file as an attachment. */
  downloadUrl: string;
  /** API endpoint that redirects to the video object. Videos only. */
  streamUrl: string | null;
  /** Video poster image, or the thumbnail for images. */
  posterUrl: string | null;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  eventYear: number | null;
  imageCount: number;
  videoCount: number;
  mediaCount: number;
  /** Derived thumbnail of the cover media, or null when the album is empty. */
  coverThumbnailUrl: string | null;
  coverPreviewUrl: string | null;
}

export interface GalleryMediaPage {
  data: GalleryMedia[];
  /** Opaque cursor for the next page, or null when the album is exhausted. */
  nextCursor: string | null;
}

export interface GalleryMediaQuery {
  cursor?: string | null;
  limit?: number;
  type?: GalleryMediaType | "ALL";
}

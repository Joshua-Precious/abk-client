/**
 * Thin typed wrapper around the gallery API.
 *
 * The backend only returns metadata (keys, counts, derived CDN URLs); the
 * browser fetches the actual media bytes straight from Cloudflare, never
 * through this API.
 */
import type {
  GalleryAlbum,
  GalleryMediaPage,
  GalleryMediaQuery,
  GalleryMediaType,
} from "../types/gallery";

const API_URL = import.meta.env.VITE_API_URL || "";

export const galleryEndpoint = (path: string) => `${API_URL}/api${path}`;

export class GalleryApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GalleryApiError";
    this.status = status;
  }
}

const request = async <T>(path: string, signal?: AbortSignal): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(galleryEndpoint(path), {
      headers: { Accept: "application/json" },
      signal,
    });
  } catch (error) {
    if ((error as Error).name === "AbortError") throw error;
    // A blocked cross-origin request rejects here with a bare TypeError, which
    // is indistinguishable from an outage unless the URL is in the message.
    throw new GalleryApiError(
      `Could not reach the gallery API at ${galleryEndpoint(path)}. ` +
        "Check VITE_API_URL, and that the API allows this origin (CLIENT_URL) - " +
        "a cross-origin request the API does not allow fails exactly like this.",
      0,
    );
  }

  if (!response.ok) {
    let message = `Gallery request failed (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // Non-JSON error body (proxy/HTML) - keep the generic message.
    }
    throw new GalleryApiError(message, response.status);
  }

  return (await response.json()) as T;
};

/** All published albums, newest event first. */
export const fetchAlbums = async (signal?: AbortSignal): Promise<GalleryAlbum[]> => {
  const body = await request<{ data: GalleryAlbum[] }>("/albums", signal);
  return body.data ?? [];
};

/** A single album, including its cover URLs and counters. */
export const fetchAlbum = async (slug: string, signal?: AbortSignal): Promise<GalleryAlbum> => {
  const body = await request<{ data: GalleryAlbum }>(`/albums/${encodeURIComponent(slug)}`, signal);
  return body.data;
};

/**
 * One page of album media. `limit` stays small (30-40) on purpose so a phone on
 * a slow connection never downloads more than it can show.
 */
export const fetchAlbumMedia = async (
  slug: string,
  query: GalleryMediaQuery = {},
  signal?: AbortSignal,
): Promise<GalleryMediaPage> => {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 36));
  if (query.cursor) params.set("cursor", query.cursor);
  if (query.type && query.type !== "ALL") params.set("type", query.type satisfies GalleryMediaType);

  const body = await request<GalleryMediaPage>(
    `/albums/${encodeURIComponent(slug)}/media?${params.toString()}`,
    signal,
  );

  return { data: body.data ?? [], nextCursor: body.nextCursor ?? null };
};

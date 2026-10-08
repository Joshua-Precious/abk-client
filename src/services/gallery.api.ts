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

/**
 * Items per ZIP download. Mirrors `MAX_ZIP_FILES` in the API: a bigger
 * selection is one huge response, so the client stops the user before the
 * server refuses.
 */
export const MAX_ZIP_SELECTION = 40;

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

/**
 * Downloads a selection as a single ZIP.
 *
 * One request instead of N downloads on purpose: browsers throttle or block
 * bursts of downloads, and a ZIP keeps the originals' filenames.
 */
export const downloadSelectionZip = async (
  ids: string[],
  signal?: AbortSignal,
): Promise<Blob> => {
  let response: Response;
  try {
    response = await fetch(galleryEndpoint("/media/download-zip"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/zip" },
      body: JSON.stringify({ ids }),
      signal,
    });
  } catch (error) {
    if ((error as Error).name === "AbortError") throw error;
    throw new GalleryApiError(
      `Could not reach the gallery API at ${galleryEndpoint("/media/download-zip")}. ` +
        "Check VITE_API_URL, and that the API allows this origin (CLIENT_URL) - " +
        "a cross-origin request the API does not allow fails exactly like this.",
      0,
    );
  }

  if (!response.ok) {
    let message = `Download failed (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // Non-JSON body (proxy/HTML) - keep the generic message.
    }
    throw new GalleryApiError(message, response.status);
  }

  return await response.blob();
};

/** Live state of one ZIP download, delivered to `onProgress` as it changes. */
export interface ZipDownloadProgress {
  phase: "preparing" | "downloading" | "done";
  /** Originals the server has fetched so far (null until the first poll answers). */
  filesDone: number;
  filesTotal: number | null;
  /** Archive bytes received so far. */
  bytesReceived: number;
  /** Server's estimated archive size (null when progress is unavailable). */
  bytesTotal: number | null;
  /** False when the progress endpoint 404s (e.g. a multi-instance deploy). */
  progressAvailable: boolean;
}

interface ZipJobState {
  done: number;
  total: number;
  estimatedZipBytes: number;
  status: string;
}

const newJobId = (): string => {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    // Non-secure contexts fall through to the counter below.
  }
  return `zip-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
};

/**
 * Downloads a selection as a single ZIP with real progress.
 *
 * The request carries a client-generated job id; while the archive streams,
 * `GET /media/download-zip/progress/:jobId` reports how many originals the
 * server has fetched (`preparing`), and the streamed body is counted locally
 * (`downloading`). When the progress endpoint is unreachable the download
 * still works - the UI just counts received megabytes instead.
 */
export const downloadSelectionZipWithProgress = async (
  ids: string[],
  options: {
    signal?: AbortSignal;
    pollIntervalMs?: number;
    onProgress?: (progress: ZipDownloadProgress) => void;
  } = {},
): Promise<Blob> => {
  const jobId = newJobId();
  let response: Response;
  try {
    response = await fetch(galleryEndpoint("/media/download-zip"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/zip" },
      body: JSON.stringify({ ids, jobId }),
      signal: options.signal,
    });
  } catch (error) {
    if ((error as Error).name === "AbortError") throw error;
    throw new GalleryApiError(
      `Could not reach the gallery API at ${galleryEndpoint("/media/download-zip")}. ` +
        "Check VITE_API_URL, and that the API allows this origin (CLIENT_URL) - " +
        "a cross-origin request the API does not allow fails exactly like this.",
      0,
    );
  }

  if (!response.ok) {
    let message = `Download failed (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // Non-JSON body (proxy/HTML) - keep the generic message.
    }
    throw new GalleryApiError(message, response.status);
  }

  let filesDone = 0;
  let filesTotal: number | null = null;
  let bytesTotal: number | null = null;
  let progressAvailable = false;
  let bytesReceived = 0;
  let finished = false;

  const emit = (phase: ZipDownloadProgress["phase"]) => {
    options.onProgress?.({
      phase,
      filesDone,
      filesTotal,
      bytesReceived,
      bytesTotal,
      progressAvailable,
    });
  };

  const currentPhase = (): ZipDownloadProgress["phase"] =>
    filesTotal !== null && filesDone < filesTotal ? "preparing" : "downloading";

  const poll = async () => {
    try {
      const progressResponse = await fetch(
        galleryEndpoint(`/media/download-zip/progress/${encodeURIComponent(jobId)}`),
        { headers: { Accept: "application/json" }, signal: options.signal },
      );
      if (!progressResponse.ok) return;
      const body = (await progressResponse.json()) as { data?: ZipJobState };
      if (!body?.data || typeof body.data.total !== "number") return;
      filesDone = body.data.done;
      filesTotal = body.data.total;
      bytesTotal = body.data.estimatedZipBytes;
      progressAvailable = true;
      if (!finished) emit(currentPhase());
    } catch {
      // Sibling instance, abort, or network blip: byte counting continues.
    }
  };

  // Without a readable stream (very old browsers) there is nothing to count;
  // the download still completes, just without intermediate progress.
  if (!response.body?.getReader) return await response.blob();

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  const timer = window.setInterval(() => {
    if (!finished) void poll();
  }, options.pollIntervalMs ?? 350);

  try {
    await poll();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        bytesReceived += value.length;
        emit(currentPhase());
      }
    }
  } finally {
    finished = true;
    window.clearInterval(timer);
  }

  emit("done");
  return new Blob(chunks as BlobPart[], { type: "application/zip" });
};

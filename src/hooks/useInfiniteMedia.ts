/**
 * Cursor-paginated media loading for one album.
 *
 * Keeps the already loaded pages when a later page fails, drops responses that
 * belong to a previous slug/filter, and only ever holds one request in flight.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { GalleryApiError, fetchAlbumMedia } from "../services/gallery.api";
import type { GalleryMedia, GalleryMediaType } from "../types/gallery";

export interface UseInfiniteMediaResult {
  items: GalleryMedia[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  retry: () => void;
}

const messageFor = (caught: unknown): string => {
  if (caught instanceof GalleryApiError) return caught.message;
  return "Something went wrong while loading this album.";
};

export function useInfiniteMedia(
  slug: string,
  type: GalleryMediaType | "ALL" = "ALL",
  pageSize = 36,
): UseInfiniteMediaResult {
  const [items, setItems] = useState<GalleryMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  // Bumped whenever the album or filter changes: any response carrying an older
  // generation is discarded instead of being appended to the new list.
  const generationRef = useRef(0);
  const cursorRef = useRef<string | null>(null);
  const hasMoreRef = useRef(false);
  const inFlightRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const request = useCallback(
    async (cursor: string | null, generation: number) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      inFlightRef.current = true;

      try {
        const page = await fetchAlbumMedia(
          slug,
          { cursor, limit: pageSize, type },
          controller.signal,
        );

        if (generation !== generationRef.current) return;

        cursorRef.current = page.nextCursor;
        hasMoreRef.current = page.nextCursor !== null;
        setHasMore(page.nextCursor !== null);
        setItems((previous) => (cursor === null ? page.data : [...previous, ...page.data]));
        setError(null);
      } catch (caught) {
        if ((caught as Error)?.name === "AbortError") return;
        if (generation !== generationRef.current) return;
        // A failed page keeps whatever is already on screen.
        setError(messageFor(caught));
      } finally {
        if (generation === generationRef.current) {
          inFlightRef.current = false;
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [slug, pageSize, type],
  );

  const loadInitial = useCallback(() => {
    generationRef.current += 1;
    cursorRef.current = null;
    hasMoreRef.current = false;
    setItems([]);
    setHasMore(false);
    setError(null);
    setIsLoading(true);
    setIsLoadingMore(false);
    void request(null, generationRef.current);
  }, [request]);

  const loadMore = useCallback(() => {
    if (inFlightRef.current || !hasMoreRef.current || cursorRef.current === null) return;
    setIsLoadingMore(true);
    setError(null);
    void request(cursorRef.current, generationRef.current);
  }, [request]);

  const retry = useCallback(() => {
    setError(null);
    if (items.length === 0) {
      loadInitial();
      return;
    }
    // A later page failed: the cursor still points at the page that failed, so
    // retrying resumes instead of restarting the album.
    if (hasMoreRef.current && cursorRef.current !== null) {
      setIsLoadingMore(true);
      void request(cursorRef.current, generationRef.current);
      return;
    }
    loadInitial();
  }, [items.length, loadInitial, request]);

  useEffect(() => {
    loadInitial();
    return () => {
      abortRef.current?.abort();
    };
  }, [loadInitial]);

  return { items, isLoading, isLoadingMore, error, hasMore, loadMore, retry };
}

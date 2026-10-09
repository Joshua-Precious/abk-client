/**
 * Admin download metrics.
 *
 * Reads `GET /api/gallery/download-stats` (admin bearer token) and answers the
 * two questions the dashboard needs: how many downloads have happened, and
 * which resources were downloaded. Self-contained on purpose - the admin page
 * stays about registrations and just drops this panel in.
 */
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import GlassyContainer from "../ui/GlassyContainer";

interface DownloadStatsResource {
  mediaId: string;
  filename: string;
  albumSlug: string;
  count: number;
  lastDownloadedAt: string | null;
}

interface DownloadStatsEvent {
  id: string;
  mediaId: string;
  filename: string;
  albumSlug: string;
  kind: "ORIGINAL" | "ZIP";
  createdAt: string;
}

interface DownloadStats {
  totals: {
    allTime: number;
    today: number;
    last7Days: number;
    last30Days: number;
    resources: number;
  };
  byKind: { kind: "ORIGINAL" | "ZIP"; count: number }[];
  daily: { date: string; count: number }[];
  windowDays: number;
  topResources: DownloadStatsResource[];
  recent: DownloadStatsEvent[];
}

interface DownloadMetricsProps {
  /** Called when the API rejects the token, so the page can send the user back to the login form. */
  onUnauthorized?: () => void;
}

const formatCount = (value: number) => value.toLocaleString("en-US");

/** `2h ago` style stamp: precise enough to spot a spike, short enough for a table. */
const formatRelative = (iso: string | null): string => {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "—";
  const seconds = Math.max(0, (Date.now() - then) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(then));
};

/** `first-love-church` -> `First Love Church` (album slugs are the only label we store). */
const albumLabel = (slug: string) =>
  slug === "misc"
    ? "Uncategorised"
    : slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

const dayOfMonth = (date: string) => String(Number(date.slice(8, 10)));

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: string;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="liquid-glass rounded-2xl border border-white/10 p-4 md:p-5">
      <div className="mb-3 flex items-center gap-2 text-[#f0b405]">
        <Icon icon={icon} className="h-4 w-4" />
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/60">
          {label}
        </span>
      </div>
      <p className="font-mono text-2xl font-bold text-white md:text-3xl">{value}</p>
      {hint && <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">{hint}</p>}
    </div>
  );
}

export default function DownloadMetrics({ onUnauthorized }: DownloadMetricsProps) {
  const [stats, setStats] = useState<DownloadStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const load = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const API_URL = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${API_URL}/api/gallery/download-stats`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });

      if (response.status === 401 || response.status === 403) {
        onUnauthorized?.();
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) throw new Error("Failed to fetch download stats");

      const payload = await response.json();
      setStats(payload.data as DownloadStats);
      setError("");
    } catch (caught) {
      if ((caught as Error)?.name === "AbortError") return;
      setError(caught instanceof Error ? caught.message : "Could not load download stats");
    } finally {
      setIsLoading(false);
    }
  }, [onUnauthorized]);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, reloadKey]);

  const peak = Math.max(1, ...(stats?.daily ?? []).map((day) => day.count));
  const single = stats?.byKind.find((entry) => entry.kind === "ORIGINAL")?.count ?? 0;
  const bulk = stats?.byKind.find((entry) => entry.kind === "ZIP")?.count ?? 0;

  return (
    <GlassyContainer className="rounded-3xl p-4 md:p-8 overflow-hidden">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f0b405]/30 bg-[#f0b405]/10">
            <Icon icon="lucide:download" className="h-5 w-5 text-[#f0b405]" />
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white md:text-2xl">
              Downloads
            </h2>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
              How much media visitors have saved
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setReloadKey((key) => key + 1)}
          disabled={isLoading}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-[#f0b405]/10 hover:text-[#f0b405] disabled:opacity-50"
        >
          <Icon
            icon="lucide:refresh-cw"
            className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          <span>Refresh</span>
        </button>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Icon icon="lucide:alert-circle" className="mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 text-lg font-bold text-white">Could not load download stats</h3>
          <p className="max-w-md text-sm text-red-400/80">{error}</p>
        </div>
      ) : isLoading && !stats ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Icon icon="lucide:loader-2" className="mb-4 h-10 w-10 animate-spin text-[#f0b405]" />
          <p className="text-sm font-medium text-white/60">Loading download stats...</p>
        </div>
      ) : stats ? (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            <StatCard
              icon="lucide:download"
              label="Total downloads"
              value={formatCount(stats.totals.allTime)}
              hint={`${formatCount(single)} single · ${formatCount(bulk)} bulk`}
            />
            <StatCard
              icon="lucide:sun"
              label="Today"
              value={formatCount(stats.totals.today)}
            />
            <StatCard
              icon="lucide:calendar-days"
              label="Last 7 days"
              value={formatCount(stats.totals.last7Days)}
            />
            <StatCard
              icon="lucide:calendar-range"
              label="Last 30 days"
              value={formatCount(stats.totals.last30Days)}
            />
            <StatCard
              icon="lucide:image"
              label="Files downloaded"
              value={formatCount(stats.totals.resources)}
              hint="distinct resources"
            />
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/60">
              <Icon icon="lucide:bar-chart-3" className="h-4 w-4 text-[#f0b405]" />
              Last {stats.windowDays} days
            </h3>
            <div className="flex h-28 items-end gap-1 rounded-2xl border border-white/10 bg-black/20 p-3">
              {stats.daily.map((day) => (
                <div
                  key={day.date}
                  className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
                  title={`${day.date}: ${formatCount(day.count)} download${day.count === 1 ? "" : "s"}`}
                >
                  <div
                    className={`w-full rounded-t transition-all ${
                      day.count > 0
                        ? "bg-[#f0b405] group-hover:bg-[#f0b405]/80"
                        : "bg-white/10"
                    }`}
                    style={{ height: `${day.count > 0 ? Math.max(6, (day.count / peak) * 100) : 3}%` }}
                  />
                  <span className="text-[9px] font-semibold text-white/30">
                    {dayOfMonth(day.date)}
                  </span>
                </div>
              ))}
              {stats.daily.length === 0 && (
                <p className="w-full text-center text-sm text-white/40">No data yet</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/60">
                <Icon icon="lucide:trending-up" className="h-4 w-4 text-[#f0b405]" />
                Most downloaded resources
              </h3>
              {stats.topResources.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/20 py-10 text-center">
                  <p className="text-sm text-white/50">No downloads recorded yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20 custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/50">
                        <th className="px-4 py-3 font-semibold min-w-[220px]">Resource</th>
                        <th className="px-4 py-3 font-semibold min-w-[140px]">Album</th>
                        <th className="px-4 py-3 text-right font-semibold">Downloads</th>
                        <th className="px-4 py-3 font-semibold min-w-[120px]">Last</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {stats.topResources.map((resource) => (
                        <tr
                          key={resource.mediaId}
                          className="transition-colors hover:bg-white/5"
                        >
                          <td className="px-4 py-3">
                            <div
                              className="max-w-xs truncate font-mono text-xs text-white/90"
                              title={resource.filename}
                            >
                              {resource.filename}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-white/60">
                            {albumLabel(resource.albumSlug)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex min-w-10 justify-center rounded-full border border-[#f0b405]/30 bg-[#f0b405]/10 px-2 py-0.5 font-mono text-xs font-bold text-[#f0b405]">
                              {formatCount(resource.count)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-white/50">
                            {formatRelative(resource.lastDownloadedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/60">
                <Icon icon="lucide:clock" className="h-4 w-4 text-[#f0b405]" />
                Latest activity
              </h3>
              {stats.recent.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/20 py-10 text-center">
                  <p className="text-sm text-white/50">Nothing downloaded yet.</p>
                </div>
              ) : (
                <ul className="max-h-96 space-y-1 overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-2 custom-scrollbar">
                  {stats.recent.map((event) => (
                    <li
                      key={event.id}
                      className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
                    >
                      <div className="min-w-0">
                        <p
                          className="truncate font-mono text-[11px] text-white/85"
                          title={event.filename}
                        >
                          {event.filename}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
                          {albumLabel(event.albumSlug)}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                          {formatRelative(event.createdAt)}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0b405]/80">
                          {event.kind === "ZIP" ? "Bulk" : "Single"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </GlassyContainer>
  );
}

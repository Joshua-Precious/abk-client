import { useState } from "react";
import { Icon } from "@iconify/react";

interface LazyVideoProps {
  src: string;
  poster?: string | null;
  className?: string;
}

/**
 * Click-to-load video.
 *
 * The gallery never requests the video bytes: until the viewer presses play
 * this renders only the poster image (or a placeholder), so 200+ videos cost
 * nothing on load.
 */
export default function LazyVideo({ src, poster, className = "" }: LazyVideoProps) {
  const [isActive, setIsActive] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const retry = () => {
    setVideoFailed(false);
    setAttempt((value) => value + 1);
    setIsActive(true);
  };

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black/70 ${className}`}>
      {isActive && !videoFailed ? (
        <video
          key={attempt}
          src={src}
          poster={poster ?? undefined}
          controls
          autoPlay
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full bg-black object-contain"
        />
      ) : (
        <>
          {poster && !posterFailed ? (
            <img
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setPosterFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(122,44,255,0.45),rgba(0,0,0,0.9)_55%,rgba(255,63,0,0.35))]"
            />
          )}

          {videoFailed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/75 px-4 text-center">
              <Icon icon="lucide:alert-triangle" className="h-6 w-6 text-red-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                Video unavailable
              </p>
              <button
                type="button"
                onClick={retry}
                className="cursor-pointer rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/25"
              >
                Retry
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsActive(true)}
              aria-label="Play video"
              className="group/video absolute inset-0 flex cursor-pointer items-center justify-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-transform duration-300 group-hover/video:scale-110 md:h-16 md:w-16">
                <Icon
                  icon="lucide:play"
                  className="h-6 w-6 translate-x-[2px] text-white md:h-7 md:w-7"
                />
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

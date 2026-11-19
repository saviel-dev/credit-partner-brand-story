import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import instructionalVideoUrl from "../assets/media/video instructivo.mp4?url";
import { Reveal } from "@/components/landing/shared";
import { CPP_LINKS } from "@/config/cpp-links";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [{ title: "Thank You — Credit Partner Pro" }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const [isThankYouCardMinimized, setIsThankYouCardMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "cpp-formstack-submission-success" }, "*");
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncDuration = () => setDuration(video.duration);
    syncDuration();
    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("durationchange", syncDuration);

    return () => {
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("durationchange", syncDuration);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    setPlaybackError(null);
    if (video.paused) {
      void video.play().catch(() => {
        setPlaybackError("The video could not start. Please try again.");
      });
    } else {
      video.pause();
    }
  };

  const handleSeek = (value: string) => {
    const nextTime = Number(value);
    if (!videoRef.current || !Number.isFinite(nextTime)) return;

    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleVolumeChange = (value: string) => {
    const nextVolume = Number(value);
    if (!videoRef.current || !Number.isFinite(nextVolume)) return;

    videoRef.current.volume = nextVolume;
    videoRef.current.muted = nextVolume === 0;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || video.volume === 0) {
      if (video.volume === 0) {
        video.volume = 0.5;
        setVolume(0.5);
      }
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handlePlaybackRateChange = (value: string) => {
    const nextRate = Number(value);
    if (!videoRef.current || !Number.isFinite(nextRate)) return;

    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;

    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {
        setPlaybackError("Fullscreen mode could not be closed.");
      });
    } else {
      void player.requestFullscreen().catch(() => {
        setPlaybackError("Fullscreen mode is not available in this browser.");
      });
    }
  };

  return (
    <>
      <main className="relative isolate h-svh overflow-hidden bg-white px-4 py-4 sm:px-6 sm:py-5">
        <Reveal
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05, margin: "-40px" }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-white to-white" />
          <div className="absolute -left-24 top-8 h-64 w-64 rounded-full border border-primary/10 bg-primary/[0.025]" />
          <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full border border-primary/10 bg-primary/[0.025]" />
        </Reveal>
        <Reveal
          viewport={{ once: true, amount: 0.05, margin: "-40px" }}
          className="relative z-10 mx-auto h-full w-full max-w-7xl"
        >
          <header className="absolute inset-x-0 top-0 z-10 flex h-14 items-center justify-start sm:h-16">
            <a href="/" className="inline-block" aria-label="Credit Partner Pro home">
              <img
                src="/images/credit-partner-logo.png"
                alt="Credit Partner Pro"
                className="w-[140px] object-contain sm:w-[160px]"
              />
            </a>
          </header>

          <div className="flex h-full min-h-0 flex-col items-center justify-start gap-3 overflow-y-auto pt-20 sm:justify-center sm:gap-0 sm:overflow-visible sm:pt-0">
            <section
              aria-labelledby="instructional-video-title"
              className="w-full max-w-2xl shrink-0 overflow-hidden rounded-2xl border border-border bg-white p-2.5 shadow-lift sm:rounded-3xl sm:p-4"
            >
              <div className="mb-2 text-left sm:mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
                  Your next step
                </p>
                <h2
                  id="instructional-video-title"
                  className="mt-1 font-hero text-lg font-bold tracking-tight text-foreground sm:text-xl"
                >
                  Watch the instructional video
                </h2>
                <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block sm:text-sm">
                  Use the controls to play, pause, or adjust the volume whenever you’re ready.
                </p>
              </div>
              <div
                ref={playerRef}
                className="overflow-hidden rounded-xl bg-slate-950 shadow-sm sm:rounded-2xl"
              >
                <video
                  ref={videoRef}
                  playsInline
                  preload="metadata"
                  aria-label="Credit Partner Pro instructional video"
                  onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                  onDurationChange={(event) => setDuration(event.currentTarget.duration)}
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onVolumeChange={(event) => {
                    setVolume(event.currentTarget.volume);
                    setIsMuted(event.currentTarget.muted);
                  }}
                  onError={() =>
                    setPlaybackError("The video could not be loaded. Please try again later.")
                  }
                  className="aspect-video max-h-[calc(100svh-15rem)] w-full bg-slate-950 object-contain"
                >
                  <source src={instructionalVideoUrl} type="video/mp4" />
                  Your browser does not support embedded video playback.
                </video>
                <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-2 text-white sm:gap-2.5 sm:px-3">
                  <button
                    type="button"
                    onClick={togglePlayback}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {isPlaying ? (
                      <Pause className="h-3.5 w-3.5" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <span
                    className="min-w-[4.5rem] text-[10px] tabular-nums text-white/85 sm:min-w-[5rem] sm:text-[11px]"
                    aria-live="off"
                  >
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 1}
                    step="0.1"
                    value={Math.min(currentTime, duration || 0)}
                    onChange={(event) => handleSeek(event.target.value)}
                    aria-label="Seek video"
                    className="h-1.5 min-w-4 flex-1 cursor-pointer accent-primary"
                  />
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(event) => handleVolumeChange(event.target.value)}
                    aria-label="Video volume"
                    className="hidden h-1.5 w-12 cursor-pointer accent-primary sm:block"
                  />
                  <label className="flex shrink-0 items-center text-[10px] text-white/80">
                    <span className="sr-only sm:not-sr-only sm:mr-1">Speed</span>
                    <select
                      value={playbackRate}
                      onChange={(event) => handlePlaybackRateChange(event.target.value)}
                      aria-label="Playback speed"
                      className="cursor-pointer rounded-md border border-white/15 bg-slate-900 px-1 py-1 text-[10px] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}x
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {isFullscreen ? (
                      <Minimize className="h-3.5 w-3.5" />
                    ) : (
                      <Maximize className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                {playbackError && (
                  <p role="alert" className="bg-slate-950 px-3 pb-2 text-xs text-red-300">
                    {playbackError}
                  </p>
                )}
              </div>
            </section>

            <Reveal delay={0.5} className="w-full max-w-2xl shrink-0 sm:hidden">
              <section
                aria-label="Application received"
                className="rounded-2xl border border-primary/15 bg-white/95 p-3 text-left shadow-lift backdrop-blur"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Application received
                </p>
                <h1 className="mt-0.5 font-hero text-lg font-bold tracking-tight text-foreground">
                  Thank You
                </h1>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  The next step is a welcome call. Choose a time that works for you.
                </p>
                <a
                  href={CPP_LINKS.welcomeCall}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Schedule your welcome call
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </section>
            </Reveal>
          </div>
        </Reveal>
      </main>

      <Reveal
        delay={1}
        initial={{ opacity: 0, x: 24, y: 12 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        className="fixed bottom-4 right-4 z-50 hidden w-[min(18rem,calc(100vw-2rem))] sm:bottom-5 sm:right-5 sm:block"
      >
        <aside
          aria-label="Application confirmation and next step"
          className="rounded-2xl border border-primary/15 bg-white/95 p-2.5 text-left shadow-lift backdrop-blur sm:p-4"
        >
          {isThankYouCardMinimized ? (
            <div className="flex items-center justify-between gap-3">
              <p className="font-hero text-sm font-bold text-foreground">Thank You</p>
              <button
                type="button"
                onClick={() => setIsThankYouCardMinimized(false)}
                aria-label="Expand thank-you card"
                aria-expanded="false"
                className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[9px]">
                    Application received
                  </p>
                  <h1 className="mt-0.5 font-hero text-base font-bold tracking-tight text-foreground sm:text-lg">
                    Thank You
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={() => setIsThankYouCardMinimized(true)}
                  aria-label="Minimize thank-you card"
                  aria-expanded="true"
                  className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-8 sm:w-8"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">
                The next step is a welcome call. Choose a time that works for you.
              </p>
              <a
                href={CPP_LINKS.welcomeCall}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:mt-2 sm:px-4 sm:py-2 sm:text-xs"
              >
                Schedule your welcome call
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </>
          )}
        </aside>
      </Reveal>
    </>
  );
}

import { useEffect, useRef } from "react";
import brewingVideo from "../../assets/brewing-scrub-scroll.mp4?url";

type SpellTrailProps = {
  progress: number;
  visible: boolean;
};

const BREW_START = 0.48;
const BREW_END = 0.93;

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

function SpellTrail({ progress, visible }: SpellTrailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekFrameRef = useRef<number | null>(null);
  const brewProgress = clamp((progress - BREW_START) / (BREW_END - BREW_START));

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !visible) {
      return;
    }
    const seek = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        return;
      }

      const targetTime = brewProgress * duration;

      if (Math.abs(video.currentTime - targetTime) > 1 / 60) {
        video.currentTime = targetTime;
      }
    };
    const scheduleSeek = () => {
      if (seekFrameRef.current !== null) {
        return;
      }

      seekFrameRef.current = window.requestAnimationFrame(() => {
        seekFrameRef.current = null;
        seek();
      });
    };

    if (video.readyState >= 1) {
      scheduleSeek();
      return;
    }
    video.addEventListener("loadedmetadata", scheduleSeek, { once: true });
    return () => video.removeEventListener("loadedmetadata", scheduleSeek);
  }, [brewProgress, visible]);

  useEffect(() => {
    return () => {
      if (seekFrameRef.current !== null) {
        window.cancelAnimationFrame(seekFrameRef.current);
      }
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 z-20 h-full w-full object-cover transition-opacity duration-150"
      style={{ opacity: brewProgress > 0 ? 1 : 0 }}
    >
      <source src={brewingVideo} type="video/mp4" />
    </video>
  );
}

export default SpellTrail;

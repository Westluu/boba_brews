import { useEffect, useState, type RefObject } from "react";

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const DEFAULT_SMOOTHING = 1;

type ScrollProgressOptions = {
  smoothing?: number;
};

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  options: ScrollProgressOptions = {},
) {
  const [progress, setProgress] = useState(0);
  const smoothing = clamp(options.smoothing ?? DEFAULT_SMOOTHING);

  useEffect(() => {
    let scrollFrame = 0;
    let smoothFrame = 0;
    let currentProgress = 0;
    let targetProgress = 0;

    const publishProgress = () => {
      smoothFrame = 0;

      if (smoothing >= 1) {
        currentProgress = targetProgress;
      } else {
        currentProgress += (targetProgress - currentProgress) * smoothing;
      }

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      setProgress(currentProgress);

      if (currentProgress !== targetProgress) {
        smoothFrame = window.requestAnimationFrame(publishProgress);
      }
    };

    const schedulePublish = () => {
      if (!smoothFrame) {
        smoothFrame = window.requestAnimationFrame(publishProgress);
      }
    };

    const updateProgress = () => {
      scrollFrame = 0;
      const element = ref.current;

      if (!element) {
        targetProgress = 0;
        schedulePublish();
        return;
      }

      const rect = element.getBoundingClientRect();
      const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
      targetProgress = clamp(-rect.top / scrollableDistance);
      schedulePublish();
    };

    const scheduleUpdate = () => {
      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }

      if (smoothFrame) {
        window.cancelAnimationFrame(smoothFrame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [ref, smoothing]);

  return progress;
}

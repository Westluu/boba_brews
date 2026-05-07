import { useEffect, useRef, useState, type CSSProperties } from "react";
import cauldron from "../assets/cauldron.png";
import BobaCup from "./BobaCup";
import HeroTitle from "./HeroTitle";
import SpellTrail from "./SpellTrail";
import { getBobaCupLayout } from "./bobaCupLayout";
import { useElementSize } from "../hooks/useElementSize";
import { useScrollProgress } from "../hooks/useScrollProgress";

import startVideo from "../../assets/start.mp4?url";

const INTRO_PLAYBACK_RATE = 3;
const MENU_REVEAL_PROGRESS = 0.84;
const MENU_REVEAL_DELAY_MS = 260;
const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

type LandingPageProps = {
  onMenuReveal: () => void;
};

function LandingPage({ onMenuReveal }: LandingPageProps) {
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);
  const [isMenuRevealActive, setIsMenuRevealActive] = useState(false);
  const hasTriggeredMenuRevealRef = useRef(false);
  const menuRevealTimeoutRef = useRef<number | null>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const { ref: heroRef, size: heroSize } = useElementSize<HTMLElement>();
  const spellProgress = useScrollProgress(scrollStageRef);
  const transitionProgress = hasFinishedIntro ? spellProgress : 0;
  const cauldronRise = easeOutCubic(clamp((transitionProgress - 0.02) / 0.38));
  const explosionProgress = easeOutCubic(
    clamp((transitionProgress - 0.82) / 0.16),
  );
  const flashProgress = isMenuRevealActive ? 1 : explosionProgress;
  const isExploding = isMenuRevealActive || explosionProgress > 0.08;
  const cupLayout = getBobaCupLayout(
    heroSize.height,
    heroSize.width,
    transitionProgress,
  );

  useEffect(() => {
    if (hasFinishedIntro) {
      return;
    }

    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [hasFinishedIntro]);

  useEffect(() => {
    if (
      !hasFinishedIntro ||
      hasTriggeredMenuRevealRef.current ||
      transitionProgress < MENU_REVEAL_PROGRESS
    ) {
      return;
    }

    hasTriggeredMenuRevealRef.current = true;
    setIsMenuRevealActive(true);

    menuRevealTimeoutRef.current = window.setTimeout(() => {
      onMenuReveal();
    }, MENU_REVEAL_DELAY_MS);
  }, [hasFinishedIntro, onMenuReveal, transitionProgress]);

  useEffect(() => {
    return () => {
      if (menuRevealTimeoutRef.current !== null) {
        window.clearTimeout(menuRevealTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={scrollStageRef}
      className="relative h-[210svh] bg-black text-cream"
    >
      <section
        ref={heroRef}
        id="home"
        aria-label="Boba Brews animated introduction"
        className={`sticky top-0 h-screen min-h-screen w-full overflow-hidden bg-black ${
          isExploding ? "spell-stage-shake" : ""
        }`}
      >
        <video
          ref={introVideoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => {
            const video = introVideoRef.current;

            if (video) {
              video.playbackRate = INTRO_PLAYBACK_RATE;
            }
          }}
          onEnded={() => {
            const video = introVideoRef.current;

            if (video) {
              video.pause();
              video.currentTime = Math.max(video.duration - 0.05, 0);
            }

            window.scrollTo({ top: 0, behavior: "auto" });
            setHasFinishedIntro(true);
          }}
          className="absolute inset-0 h-full w-full object-cover object-right"
        >
          <source src={startVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/42 via-transparent to-black/12" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

        {hasFinishedIntro && (
          <img
            src={cauldron}
            alt=""
            aria-hidden="true"
            className="spell-cauldron"
            style={{
              "--cauldron-glow": `${cauldronRise * 0.55}rem`,
              "--cauldron-opacity": (0.18 + cauldronRise * 0.82).toString(),
              "--cauldron-scale": (0.92 + cauldronRise * 0.08).toString(),
              "--cauldron-y": `${(1 - cauldronRise) * 56}%`,
            } as CSSProperties}
            draggable="false"
          />
        )}

        <SpellTrail
          cauldronRise={cauldronRise}
          containerHeight={heroSize.height}
          containerWidth={heroSize.width}
          cupLayout={cupLayout}
          progress={transitionProgress}
          visible={hasFinishedIntro}
        />

        <BobaCup
          containerHeight={heroSize.height}
          containerWidth={heroSize.width}
          spellProgress={transitionProgress}
          visible={hasFinishedIntro}
        />

        {hasFinishedIntro && transitionProgress < 0.58 && (
          <div
            style={
              {
                opacity: 1 - easeOutCubic(clamp(transitionProgress / 0.42)),
              } as CSSProperties
            }
          >
            <HeroTitle />
          </div>
        )}

        {hasFinishedIntro && transitionProgress < 0.34 && (
          <div
            className="scroll-brew-cue"
            style={
              {
                opacity: 1 - easeOutCubic(clamp(transitionProgress / 0.24)),
              } as CSSProperties
            }
          >
            <div className="scroll-brew-cue-icon" aria-hidden="true">
              <span />
            </div>
            <div className="scroll-brew-cue-text">
              <span aria-hidden="true">+</span>
              <p>Scroll to stir the brew</p>
              <span aria-hidden="true">+</span>
            </div>
          </div>
        )}

        <div
          aria-hidden="true"
          className={`spell-flash ${isExploding ? "spell-flash-active" : ""}`}
          style={
            {
              "--spell-flash-opacity": flashProgress.toString(),
              "--spell-flash-scale": (
                0.18 +
                flashProgress * 1.35
              ).toString(),
            } as CSSProperties
          }
        />
      </section>
    </div>
  );
}

export default LandingPage;

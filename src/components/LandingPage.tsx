import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Link } from "react-router-dom";
import cauldron from "../assets/cauldron.png";
import mobileHeroStill from "../assets/mobile-hero-still.jpg";
import BobaCup from "./BobaCup";
import HeroTitle from "./HeroTitle";
import SpellTrail from "./SpellTrail";
import { useElementSize } from "../hooks/useElementSize";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { ROUTES } from "../config/navigation";

import startVideo from "../../assets/start-optimized.mp4?url";

const INTRO_PLAYBACK_RATE = 3;
const MENU_REVEAL_PROGRESS = 0.97;
const MENU_REVEAL_DELAY_MS = 260;
const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

type LandingPageProps = {
  onMenuReveal: () => void;
};

function LandingPage({ onMenuReveal }: LandingPageProps) {
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);
  const hasTriggeredMenuRevealRef = useRef(false);
  const menuRevealTimeoutRef = useRef<number | null>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const { ref: heroRef, size: heroSize } = useElementSize<HTMLElement>();
  const { ref: mobileTitleRef, size: mobileTitleSize } =
    useElementSize<HTMLHeadingElement>();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const spellProgress = useScrollProgress(scrollStageRef);
  const transitionProgress = hasFinishedIntro ? spellProgress : 0;
  const cauldronRise = easeOutCubic(clamp((transitionProgress - 0.02) / 0.38));
  const menuTransitionProgress = easeOutCubic(
    clamp((transitionProgress - 0.84) / 0.16),
  );
  // Cup is hidden once the brewing video takes over (matches BREW_START in SpellTrail).
  const isBrewing = transitionProgress >= 0.76;
  const syncIntroPlaybackRate = useCallback(() => {
    const video = introVideoRef.current;

    if (!video) {
      return;
    }

    video.defaultPlaybackRate = INTRO_PLAYBACK_RATE;

    if (video.playbackRate !== INTRO_PLAYBACK_RATE) {
      video.playbackRate = INTRO_PLAYBACK_RATE;
    }
  }, []);

  useEffect(() => {
    if (isMobile || hasFinishedIntro) {
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
  }, [hasFinishedIntro, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      syncIntroPlaybackRate();
    }
  }, [isMobile, syncIntroPlaybackRate]);

  useEffect(() => {
    if (
      isMobile ||
      !hasFinishedIntro ||
      hasTriggeredMenuRevealRef.current ||
      transitionProgress < MENU_REVEAL_PROGRESS
    ) {
      return;
    }

    hasTriggeredMenuRevealRef.current = true;

    menuRevealTimeoutRef.current = window.setTimeout(() => {
      onMenuReveal();
    }, MENU_REVEAL_DELAY_MS);
  }, [hasFinishedIntro, isMobile, onMenuReveal, transitionProgress]);

  useEffect(() => {
    return () => {
      if (menuRevealTimeoutRef.current !== null) {
        window.clearTimeout(menuRevealTimeoutRef.current);
      }
    };
  }, []);

  if (isMobile) {
    return (
      <div className="relative min-h-svh overflow-hidden bg-black text-cream">
        <img
          src={mobileHeroStill}
          alt=""
          aria-hidden="true"
          className="hero-mobile-still absolute inset-0 h-full w-full object-cover"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/16 via-transparent to-black/12" />

        <section
          id="home"
          aria-label="Boba Brews"
          className="relative z-10 min-h-svh px-[clamp(1.25rem,6vw,2rem)] pb-8 pt-[clamp(7.6rem,15svh,9.25rem)]"
        >
          <div className="max-w-[82vw]">
            <h1
              ref={mobileTitleRef}
              className="w-fit font-display text-[clamp(4.15rem,18vw,6.1rem)] leading-[0.88] text-cream [text-shadow:0_0_18px_rgba(245,230,197,0.2),0_6px_22px_rgba(0,0,0,0.7)]"
            >
              <span className="block">Boba&apos;s</span>
              <span className="block">Brews</span>
            </h1>
            <p className="mt-[clamp(1.35rem,4.5svh,2.3rem)] max-w-[18rem] font-display text-[clamp(1.75rem,7.7vw,2.35rem)] leading-tight text-[#c69cff] [text-shadow:0_4px_20px_rgba(0,0,0,0.55)]">
              Curious drinks for curious creatures
            </p>
            <Link
              to={ROUTES.menu}
              className="mt-[clamp(1.7rem,5svh,3rem)] inline-flex min-h-[3.6rem] max-w-full items-center justify-center gap-2 rounded-full border border-[#f5e6c5cc] bg-[#3a184bdf] px-4 font-display text-[clamp(1.45rem,6.2vw,1.9rem)] leading-none text-cream shadow-[0_0_18px_rgba(198,156,255,0.55),inset_0_0_24px_rgba(255,255,255,0.07)] transition hover:-translate-y-0.5 hover:text-[#fff4d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77cdd]/70"
              style={{
                width: mobileTitleSize.width
                  ? `${mobileTitleSize.width}px`
                  : undefined,
              }}
            >
              <span aria-hidden="true">✩</span>
              Menu
              <span aria-hidden="true">✩</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      ref={scrollStageRef}
      className="relative h-[420svh] bg-black text-cream"
    >
      <section
        ref={heroRef}
        id="home"
        aria-label="Boba Brews animated introduction"
        className="sticky top-0 h-screen min-h-screen w-full overflow-hidden bg-black"
      >
        <video
          ref={introVideoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onCanPlay={syncIntroPlaybackRate}
          onEnded={() => {
            const video = introVideoRef.current;

            if (video) {
              video.pause();
              video.currentTime = Math.max(video.duration - 0.05, 0);
            }

            window.scrollTo({ top: 0, behavior: "auto" });
            setHasFinishedIntro(true);
          }}
          onLoadedMetadata={syncIntroPlaybackRate}
          onPlay={syncIntroPlaybackRate}
          onRateChange={syncIntroPlaybackRate}
          className="hero-intro-video absolute inset-0 h-full w-full object-cover"
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
          progress={transitionProgress}
          visible={hasFinishedIntro}
        />

        {hasFinishedIntro && (
          <div
            aria-hidden="true"
            className="brew-menu-transition"
            style={
              {
                "--brew-transition-opacity": menuTransitionProgress.toString(),
                "--brew-transition-scale": (
                  0.96 +
                  menuTransitionProgress * 0.04
                ).toString(),
              } as CSSProperties
            }
          />
        )}

        <BobaCup
          containerHeight={heroSize.height}
          containerWidth={heroSize.width}
          spellProgress={transitionProgress}
          visible={hasFinishedIntro && !isBrewing}
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

      </section>
    </div>
  );
}

export default LandingPage;

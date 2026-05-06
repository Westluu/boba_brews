import { useRef, useState } from "react";
import BobaCup from "./BobaCup";
import HeroTitle from "./HeroTitle";
import Navbar from "./Navbar";
import { useElementSize } from "../hooks/useElementSize";

import startVideo from "../../assets/start.mp4?url";

const INTRO_PLAYBACK_RATE = 3;

function LandingPage() {
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const { ref: heroRef, size: heroSize } = useElementSize<HTMLElement>();

  return (
    <div className="relative min-h-screen bg-black text-cream">
      <main>
        <section
          ref={heroRef}
          id="home"
          aria-label="Boba Brews animated introduction"
          className="relative h-screen min-h-screen w-full overflow-hidden bg-black"
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

              setHasFinishedIntro(true);
            }}
            className="absolute inset-0 h-full w-full object-cover object-right"
          >
            <source src={startVideo} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black/42 via-transparent to-black/12" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

          <BobaCup
            containerHeight={heroSize.height}
            containerWidth={heroSize.width}
            visible={hasFinishedIntro}
          />
          <Navbar active={null} orderHref="#order" />
          {hasFinishedIntro && (
            <>
              <HeroTitle />
              <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center px-6 sm:bottom-14">
                <a
                  href="#menu"
                  className="rounded-full border border-[#f8dfb27d] bg-[#14091bcc] px-6 py-3 font-display text-2xl text-cream shadow-[0_0_28px_rgba(110,63,176,0.25)] transition duration-300 hover:-translate-y-1 hover:border-[#f8dfb2b3] hover:bg-[#1d0f25e8] focus:outline-none focus-visible:-translate-y-1 focus-visible:border-[#f8dfb2b3] focus-visible:bg-[#1d0f25e8]"
                >
                  View the Menu
                </a>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default LandingPage;

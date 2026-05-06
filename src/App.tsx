import { useEffect, useRef, useState } from "react";
import BobaCup from "./components/BobaCup";
import HeroTitle from "./components/HeroTitle";
import Navbar from "./components/Navbar";

import startVideo from "../assets/start.mp4?url";

const INTRO_PLAYBACK_RATE = 3;

function App() {
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);
  const [heroSize, setHeroSize] = useState({ height: 0, width: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateHeroSize = () => {
      const hero = heroRef.current;

      if (!hero) {
        return;
      }

      setHeroSize({
        height: hero.clientHeight,
        width: hero.clientWidth,
      });
    };

    updateHeroSize();
    window.addEventListener("resize", updateHeroSize);

    return () => {
      window.removeEventListener("resize", updateHeroSize);
    };
  }, []);

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

          <BobaCup
            containerHeight={heroSize.height}
            containerWidth={heroSize.width}
            visible={hasFinishedIntro}
          />
          <Navbar active="Menu" />
          {hasFinishedIntro && <HeroTitle />}
        </section>
      </main>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

export function useHashScroll() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  useEffect(() => {
    const sectionId = hash.replace(/^#/, "");

    const frame = window.requestAnimationFrame(() => {
      if (!sectionId || sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [hash]);
}

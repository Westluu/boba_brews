import { useEffect, useState } from "react";
import { isMenuSectionHash } from "../config/navigation";

type AppRoute = "home" | "menu";

function getRouteFromHash(hash: string): AppRoute {
  return isMenuSectionHash(hash) ? "menu" : "home";
}

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  const route = getRouteFromHash(hash);

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

  return { hash, route };
}

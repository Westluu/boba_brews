import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type MouseEventHandler,
  useRef,
} from "react";
import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import Navbar from "./components/Navbar";
import { useHashScroll } from "./hooks/useHashScroll";

const ACTIVE_NAV_BY_HASH: Record<string, string> = {
  "#menu": "Menu",
  "#about": "About",
  "#magic": "Magic",
  "#contact": "Contact",
};

function App() {
  const [hasEnteredMenu, setHasEnteredMenu] = useState(
    () => window.location.hash in ACTIVE_NAV_BY_HASH,
  );
  const [activeNav, setActiveNav] = useState<string | null>(
    () => ACTIVE_NAV_BY_HASH[window.location.hash] ?? null,
  );
  const shouldResetToMenuRef = useRef(false);
  useHashScroll();

  const handleMenuReveal = useCallback(() => {
    shouldResetToMenuRef.current = true;
    setActiveNav("Menu");
    setHasEnteredMenu(true);
  }, []);

  const handleHomeClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      event.preventDefault();
      setActiveNav(null);
      setHasEnteredMenu(false);
    },
    [],
  );

  useLayoutEffect(() => {
    if (hasEnteredMenu) {
      if (shouldResetToMenuRef.current) {
        shouldResetToMenuRef.current = false;
        window.history.replaceState(null, "", "#menu");
        window.scrollTo({ top: 0, behavior: "auto" });
      }

      return;
    }

    window.history.replaceState(null, "", "#home");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hasEnteredMenu]);

  useEffect(() => {
    const updateActiveNav = () => {
      setActiveNav(ACTIVE_NAV_BY_HASH[window.location.hash] ?? null);
    };

    updateActiveNav();
    window.addEventListener("hashchange", updateActiveNav);

    return () => {
      window.removeEventListener("hashchange", updateActiveNav);
    };
  }, []);

  return (
    <main>
      <Navbar
        active={activeNav}
        homeHref="#home"
        onHomeClick={hasEnteredMenu ? handleHomeClick : undefined}
        showOrder={false}
        variant="persistent"
      />
      {!hasEnteredMenu && <LandingPage onMenuReveal={handleMenuReveal} />}
      <MenuPage />
    </main>
  );
}

export default App;

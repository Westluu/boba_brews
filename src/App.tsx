import { useCallback } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import Navbar from "./components/Navbar";

const ACTIVE_NAV_BY_PATH: Record<string, string> = {
  "/menu": "Menu",
  "/about": "About",
  "/magic": "Magic",
  "/contact": "Contact",
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeNav = ACTIVE_NAV_BY_PATH[location.pathname] ?? null;

  const handleMenuReveal = useCallback(() => {
    navigate("/menu", { replace: true });
  }, [navigate]);

  return (
    <main>
      <Navbar
        active={activeNav}
        homeHref="/"
        orderHref="/menu"
        variant="persistent"
      />
      <Routes>
        <Route path="/" element={<LandingPage onMenuReveal={handleMenuReveal} />} />
        <Route path="/menu" element={<MenuPage sectionId="menu" />} />
        <Route path="/about" element={<MenuPage sectionId="about" />} />
        <Route path="/magic" element={<MenuPage sectionId="magic" />} />
        <Route path="/contact" element={<MenuPage sectionId="contact" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;

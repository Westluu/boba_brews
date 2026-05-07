import { useCallback } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import Navbar from "./components/Navbar";
import { MENU_ROUTES, ROUTES } from "./config/navigation";

function App() {
  const navigate = useNavigate();

  const handleMenuReveal = useCallback(() => {
    navigate(ROUTES.menu, { replace: true });
  }, [navigate]);

  return (
    <main>
      <Navbar
        homeHref={ROUTES.home}
        orderHref={ROUTES.menu}
        variant="persistent"
      />
      <Routes>
        <Route
          path={ROUTES.home}
          element={<LandingPage onMenuReveal={handleMenuReveal} />}
        />
        {MENU_ROUTES.map(({ path, sectionId }) => (
          <Route
            key={path}
            path={path}
            element={<MenuPage sectionId={sectionId} />}
          />
        ))}
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </main>
  );
}

export default App;

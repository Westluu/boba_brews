import { lazy, Suspense, useCallback } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { MENU_ROUTES, ROUTES } from "./config/navigation";

const AboutPage = lazy(() => import("./components/AboutPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const LandingPage = lazy(() => import("./components/LandingPage"));
const MenuPage = lazy(() => import("./components/MenuPage"));
const OrderPage = lazy(() => import("./components/OrderPage"));

function App() {
  const navigate = useNavigate();

  const handleMenuReveal = useCallback(() => {
    navigate(ROUTES.menu, { replace: true });
  }, [navigate]);

  return (
    <main>
      <Navbar
        homeHref={ROUTES.home}
        orderHref={ROUTES.order}
        variant="persistent"
      />
      <Suspense
        fallback={
          <div className="min-h-screen bg-black pt-28 text-center font-display text-3xl text-cream">
            Brewing...
          </div>
        }
      >
        <Routes>
          <Route
            path={ROUTES.home}
            element={<LandingPage onMenuReveal={handleMenuReveal} />}
          />
          {MENU_ROUTES.map(({ path, sectionId }) => {
            if (path === ROUTES.about) {
              return <Route key={path} path={path} element={<AboutPage />} />;
            }

            if (path === ROUTES.contact) {
              return <Route key={path} path={path} element={<ContactPage />} />;
            }

            return (
              <Route
                key={path}
                path={path}
                element={<MenuPage sectionId={sectionId} />}
              />
            );
          })}
          <Route path={ROUTES.order} element={<OrderPage />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;

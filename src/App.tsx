import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import { useHashRoute } from "./hooks/useHashRoute";

function App() {
  const { route } = useHashRoute();

  return route === "menu" ? <MenuPage /> : <LandingPage />;
}

export default App;

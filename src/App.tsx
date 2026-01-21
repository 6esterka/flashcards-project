import { Route, Routes, useLocation } from "react-router-dom";
import NavigationRouter from "@/components/appComponents/NavigationRouter";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
import Generate from "@/pages/Generate";
import AnimatedPage from "@/components/layout/AnimatedPage";
import { AnimatePresence } from "framer-motion";
import DeckLibrary from "@/pages/DeckLibrary";

function App() {
  const location = useLocation();

  return (
    <>
      <NavigationRouter />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <DeckLibrary />
              </AnimatedPage>
            }
          />
          <Route
            path="/study/:groupName"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route
            path="/stats"
            element={
              <AnimatedPage>
                <Stats />
              </AnimatedPage>
            }
          />
          <Route
            path="/generate"
            element={
              <AnimatedPage>
                <Generate />
              </AnimatedPage>
            }
          />
          <Route
            path="*"
            element={<div className="p-4 text-red-500">Page not found</div>}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;

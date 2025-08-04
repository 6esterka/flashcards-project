import { Route, Routes } from "react-router-dom";
import NavigationRouter from "./components/NavigationRouter";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Generate from "./pages/Generate";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationRouter/>
      <Routes>
        <Route path="*" element={<div className="p-4 text-red-500">Page not found</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </div>
  )
}

export default App;

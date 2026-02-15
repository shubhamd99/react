import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/home";
import LoadersDemo from "./pages/loaders";
import CodeSplittingDemo from "./pages/code-splitting";
import HMRDemo from "./pages/hmr";
import EnvironmentDemo from "./pages/environment";
import OptimizationDemo from "./pages/optimization";
import ModuleFederationDemo from "./pages/module-federation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loaders" element={<LoadersDemo />} />
            <Route path="/code-splitting" element={<CodeSplittingDemo />} />
            <Route path="/hmr" element={<HMRDemo />} />
            <Route path="/environment" element={<EnvironmentDemo />} />
            <Route path="/optimization" element={<OptimizationDemo />} />
            <Route
              path="/module-federation"
              element={<ModuleFederationDemo />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

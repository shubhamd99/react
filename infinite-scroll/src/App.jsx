import { useState } from "react";
import CustomScroll from "./components/CustomScroll";
import IntersectionObserverScroll from "./components/IntersectionObserverScroll";
import InfiniteScrollComponent from "./components/InfiniteScrollComponent";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");

  const renderView = () => {
    switch (currentView) {
      case "custom":
        return <CustomScroll />;
      case "intersection":
        return <IntersectionObserverScroll />;
      case "react-window":
        return <InfiniteScrollComponent />;
      default:
        return (
          <div className="menu">
            <h1>Infinite Scroll Examples</h1>
            <button onClick={() => setCurrentView("custom")}>
              Custom Scroll Listener
            </button>
            <button onClick={() => setCurrentView("intersection")}>
              Intersection Observer
            </button>
            <button onClick={() => setCurrentView("react-window")}>
              Infinite Scroll Component
            </button>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {currentView !== "home" && (
        <button className="back-button" onClick={() => setCurrentView("home")}>
          Back to Menu
        </button>
      )}
      {renderView()}
    </div>
  );
}

export default App;

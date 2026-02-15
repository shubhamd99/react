import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LocalStorageDemo from "./components/LocalStorageDemo";
import SessionStorageDemo from "./components/SessionStorageDemo";
import CookieDemo from "./components/CookieDemo";
import IndexedDBDemo from "./components/IndexedDBDemo";
import SecureStorageDemo from "./components/SecureStorageDemo";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/localstorage" element={<LocalStorageDemo />} />
            <Route path="/sessionstorage" element={<SessionStorageDemo />} />
            <Route path="/cookies" element={<CookieDemo />} />
            <Route path="/indexeddb" element={<IndexedDBDemo />} />
            <Route path="/secure" element={<SecureStorageDemo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

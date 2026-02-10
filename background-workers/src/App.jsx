import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WebWorkerDemo from "./pages/WebWorkerDemo";
import ServiceWorkerDemo from "./pages/ServiceWorkerDemo";
import CachingDemo from "./pages/CachingDemo";

import ReferenceBroadcastDemo from "./pages/BroadcastDemo";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workers" element={<WebWorkerDemo />} />
          <Route path="/service-workers" element={<ServiceWorkerDemo />} />
          <Route path="/caching" element={<CachingDemo />} />
          <Route path="/broadcast" element={<ReferenceBroadcastDemo />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

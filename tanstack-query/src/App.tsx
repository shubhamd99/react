import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { BasicQuery } from "./pages/BasicQuery";
import { Pagination } from "./pages/Pagination";
import { InfiniteScroll } from "./pages/InfiniteScroll";
import { Mutations } from "./pages/Mutations";
import { OptimisticUpdates } from "./pages/OptimisticUpdates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="basic" element={<BasicQuery />} />
          <Route path="pagination" element={<Pagination />} />
          <Route path="infinite-scroll" element={<InfiniteScroll />} />
          <Route path="mutations" element={<Mutations />} />
          <Route path="optimistic" element={<OptimisticUpdates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

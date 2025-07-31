import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { SearchVideoPage } from "../pages/SearchVideo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="youtube-spa/login" element={<Home />} />
      <Route path="youtube-spa/search" element={<SearchVideoPage />} />
    </Routes>
  );
};

export { AppRoutes };

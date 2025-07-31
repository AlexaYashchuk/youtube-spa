import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { SearchVideoPage } from "../pages/SearchVideo";
import App from "../App";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<App />} />
      <Route path="/search" element={<SearchVideoPage />} />
    </Routes>
  );
};

export { AppRoutes };

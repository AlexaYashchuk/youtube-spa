import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { SearchVideo } from "../pages/SearchVideo/SearchVideo";
import { VideoPage } from "../pages/VideoPage/VideoPage";
import { Favorite } from "../pages/Favorite/Favorite";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Home />} />
      <Route path="/search" element={<SearchVideo />} />
      <Route path="/videolist" element={<VideoPage />} />
      <Route path="/favorites" element={<Favorite />} />
    </Routes>
  );
};

export { AppRoutes };

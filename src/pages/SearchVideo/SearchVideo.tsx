import { NavBar } from "../../components/NavBar/NavBar";
import { SearchVideoComp } from "../../components/SearchVideoComp";
import "./SearchVideo.css";

const SearchVideo = () => {
  return (
    <div>
      <NavBar />
      <div className="search">
        <SearchVideoComp />
      </div>
    </div>
  );
};

export { SearchVideo };

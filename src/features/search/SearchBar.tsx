import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchVideos } from "./searchSlice";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../favorite/favoriteSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    dispatch(searchVideos({ query: q, maxResults: 12 }));
    dispatch(addFavorite(q));
    setQuery("");
    navigate("/videolist"); // если нужна другая страница — поменяй
  };

  return (
    <div>
      <TextField
        placeholder="Введите свой запрос для поиска"
        className="search-el-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button
        className="search-el-button"
        onClick={handleSearch}
        variant="outlined"
        endIcon={<SendIcon />}
      >
        Найти
      </Button>
    </div>
  );
};

export { SearchBar };

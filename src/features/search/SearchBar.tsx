import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchVideos } from "./searchSlice";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../favorite/favoriteSlice";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // одно состояние для ввода
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      // 1. Выполняем поиск
      dispatch(searchVideos(trimmedQuery));
      // 2. Сохраняем в избранное
      dispatch(addFavorite(trimmedQuery));
      // 3. Очищаем поле
      setQuery("");
      // 4. Переходим на страницу со списком видео
      navigate("/videolist");
    }
  };

  return (
    <div>
      <TextField
        placeholder="Введите свой запрос для поиска"
        className="search-el-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
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

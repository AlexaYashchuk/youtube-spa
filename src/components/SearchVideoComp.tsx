import { useAppSelector, useAppDispatch } from "../app/hooks";
import { searchVideos } from "../features/search/searchSlice";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../features/favorite/favoriteSlice";
import type { RootState } from "../app/store";

const SearchVideoComp = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => state.login.user);
  const userId = user?.email;

  const handleSearch = () => {
    const currentQuery = query.trim();

    dispatch(searchVideos({ query: currentQuery, maxResults: 12 }));

    if (userId) {
      dispatch(addFavorite({ userId, query: currentQuery }));
      console.log("добавлено в избранное:", {
        userId,
        currentQuery,
      });
    } else {
      console.log("нет userId, избранное не сохранено");
    }

    setQuery("");
    navigate("/videolist");
  };

  return (
    <div>
      <h1>🔍 Поиск видео</h1>
      <div>
        <TextField
          placeholder="Введите запрос для поиска"
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
    </div>
  );
};

export { SearchVideoComp };

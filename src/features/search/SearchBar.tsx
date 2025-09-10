import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchVideos } from "./searchSlice";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../favorite/favoriteSlice";
import type { RootState } from "../../app/store";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // текущий пользователь
  const user = useAppSelector((state: RootState) => state.login.user);
  const userId = user?.email;

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;

    // поиск
    dispatch(searchVideos({ query: q, maxResults: 12 }));

    // добавление в избранное
    if (userId) {
      dispatch(addFavorite({ userId, query: q }));
      console.log("[SearchBar] добавлен запрос в избранное:", { userId, q });
    } else {
      console.log("[SearchBar] ❌ нет userId, избранное не сохранено");
    }

    setQuery("");
    navigate("/videolist");
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

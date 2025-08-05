import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchVideos } from "./searchSlice";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input) {
      dispatch(searchVideos(input));
      setInput("");
      navigate("/videolist");
    }
  };

  return (
    <div>
      <TextField
        placeholder="Введите свой запрос для поиска"
        className="search-el-input"
        // id="outlined-basic"
        // label="Outlined"
        // variant="outlined"
        value={input}
        onChange={(event) => setInput(event.target.value)}
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

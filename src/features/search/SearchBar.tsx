import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchVideos } from "./searchSlice";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (input) {
      dispatch(searchVideos(input));
      setInput("");
    }
  };

  return (
    <div>
      {/* <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Поиск видео"
      /> */}
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Button onClick={handleSearch} variant="outlined" endIcon={<SendIcon />}>
        Send
      </Button>
      {/* <button onClick={handleSearch}>Найти</button> */}
    </div>
  );
};

import { SearchBar } from "./features/search/SearchBar";
import { VideoList } from "./components/VideoList";
import { Login } from "./components/login";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { searchVideos, clearHistory } from "./features/search/searchSlice";

function App() {
  const history = useAppSelector((state) => state.search.history);
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Login />
      {/* <h1>🔍 YouTube Поиск Видео</h1>
      <SearchBar />
      <div>
        <h3>История запросов:</h3>
        {history.length === 0 && <p>Нет запросов</p>}
        <ul>
          {history.map((q, idx) => (
            <li
              key={idx}
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => dispatch(searchVideos(q))}
            >
              {q}
            </li>
          ))}
        </ul>
        {history.length > 0 && (
          <button onClick={() => dispatch(clearHistory())}>
            Очистить историю
          </button>
        )}
      </div>
      <hr />
      <VideoList /> */}
    </div>
  );
}

export default App;

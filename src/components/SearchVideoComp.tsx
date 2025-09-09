import { SearchBar } from "../features/search/SearchBar";
// import { VideoList } from "../components/VideoList";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { searchVideos, clearHistory } from "../features/search/searchSlice";

const SearchVideoComp = () => {
  const userId = useAppSelector((state) => state.login.user?.email);
  const history = useAppSelector((state) =>
    userId ? state.search.historyByUser[userId] || [] : []
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>🔍 Поиск видео</h1>
      <SearchBar />
      {/* <div>
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
      </div> */}
      {/* <hr />
      <VideoList /> */}
    </div>
  );
};

export { SearchVideoComp };

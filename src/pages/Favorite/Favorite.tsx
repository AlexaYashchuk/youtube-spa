import { NavBar } from "../../components/NavBar/NavBar";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { removeFavorite } from "../../features/favorite/favoriteSlice";

const Favorite = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorite.queries);

  return (
    <>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <h2>Избранные запросы</h2>
        {favorites.length === 0 ? (
          <p>Нет избранных запросов</p>
        ) : (
          <ul>
            {favorites.map((query) => (
              <li key={query} style={{ marginBottom: "8px" }}>
                {query}{" "}
                <button onClick={() => dispatch(removeFavorite(query))}>
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export { Favorite };

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeFavorite,
  editFavorite,
  loadFavoritesForUser,
} from "../../features/favorite/favoriteSlice";
import { searchVideos } from "../../features/search/searchSlice";
import { List, Button, Modal, Input, Slider, Empty, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { NavBar } from "../../components/NavBar/NavBar";
import type { RootState } from "../../app/store";

const { Title } = Typography;

export const Favorite = () => {
  const dispatch = useAppDispatch();

  // текущий пользователь
  const user = useAppSelector((state: RootState) => state.login.user);
  const userId = user?.email ?? null;

  // при заходе на страницу и при изменении userId — подгружаем избранное
  useEffect(() => {
    if (userId) {
      dispatch(loadFavoritesForUser({ userId }));
    }
  }, [dispatch, userId]);

  // избранное пользователя
  const favorites = useAppSelector((state: RootState) =>
    userId ? state.favorite.favoritesByUser[userId] ?? [] : []
  );

  // модальное окно
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState("");
  const [editedQuery, setEditedQuery] = useState("");
  const [count, setCount] = useState(12);

  const openModal = (q: string) => {
    setSelectedQuery(q);
    setEditedQuery(q);
    setCount(12);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const onDelete = () => {
    if (userId) {
      dispatch(removeFavorite({ userId, query: selectedQuery }));
    }
    closeModal();
  };

  const onEdit = () => {
    if (userId) {
      dispatch(
        editFavorite({
          userId,
          oldQuery: selectedQuery,
          newQuery: editedQuery,
        })
      );
    }
    closeModal();
  };

  const onExecute = () => {
    dispatch(searchVideos({ query: editedQuery, maxResults: count }));
    closeModal();
  };

  // если пользователь не авторизован
  if (!userId) {
    return (
      <>
        <NavBar />
        <div style={{ padding: 24 }}>
          <Title level={2} style={{ marginBottom: 16 }}>
            Избранные запросы
          </Title>
          <Empty description="⚠ Войдите в аккаунт, чтобы видеть избранное" />
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ padding: 24 }}>
        <Title level={2} style={{ marginBottom: 16 }}>
          Избранные запросы
        </Title>

        {favorites.length === 0 ? (
          <Empty description="Нет избранных запросов" />
        ) : (
          <List
            bordered
            dataSource={favorites}
            style={{ background: "#fff", borderRadius: 12, overflow: "hidden" }}
            renderItem={(item) => (
              <List.Item style={{ padding: "12px 16px" }}>
                <Button
                  type="text"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: 0,
                    height: "auto",
                    fontSize: 16,
                  }}
                  onClick={() => openModal(item)}
                >
                  {item}
                </Button>
              </List.Item>
            )}
          />
        )}

        <Modal
          title="Запрос"
          open={isOpen}
          onCancel={closeModal}
          footer={null}
          destroyOnClose
        >
          {/* 1) редактируемый запрос */}
          <div style={{ marginBottom: 16 }}>
            <Input
              value={editedQuery}
              onChange={(e) => setEditedQuery(e.target.value)}
              placeholder="Название запроса"
            />
          </div>

          {/* 2) ползунок 0..50 */}
          <div style={{ marginBottom: 16 }}>
            <Slider
              min={0}
              max={50}
              value={count}
              onChange={(v) => setCount(v as number)}
            />
            <div style={{ textAlign: "right", fontSize: 12 }}>
              Количество видео: {count}
            </div>
          </div>

          {/* 3) кнопки */}
          <div
            style={{ display: "flex", gap: 8, justifyContent: "space-between" }}
          >
            <Button danger icon={<DeleteOutlined />} onClick={onDelete}>
              УДАЛИТЬ
            </Button>
            <Button icon={<EditOutlined />} onClick={onEdit}>
              РЕДАКТИРОВАТЬ
            </Button>
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={onExecute}
            >
              ВЫПОЛНИТЬ
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

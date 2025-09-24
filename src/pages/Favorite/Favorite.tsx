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
import { useNavigate } from "react-router-dom";
import "./Favorite.css";

const { Title } = Typography;

export const Favorite = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => state.login.user);
  const userId = user?.email ?? null;

  useEffect(() => {
    if (userId) {
      dispatch(loadFavoritesForUser({ userId }));
    }
  }, [dispatch, userId]);

  const favorites = useAppSelector((state: RootState) =>
    userId ? state.favorite.favoritesByUser[userId] ?? [] : []
  );

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
    navigate("/videolist");
  };

  if (!userId) {
    return (
      <>
        <NavBar />
        <div className="favorite-container">
          <Title level={2} className="favorite-title">
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
      <div className="favorite-container">
        <Title level={2} className="favorite-title">
          Избранные запросы
        </Title>

        {favorites.length === 0 ? (
          <Empty description="Нет избранных запросов" />
        ) : (
          <List
            bordered
            dataSource={favorites}
            className="favorite-list"
            renderItem={(item) => (
              <List.Item className="favorite-list-item">
                <Button
                  type="text"
                  className="favorite-button"
                  onClick={() => openModal(item)}
                >
                  {item}
                </Button>
              </List.Item>
            )}
          />
        )}

        <Modal title="Запрос" open={isOpen} onCancel={closeModal} footer={null}>
          <div className="modal-section">
            <Input
              value={editedQuery}
              onChange={(e) => setEditedQuery(e.target.value)}
              placeholder="Название запроса"
            />
          </div>

          <div className="modal-section">
            <Slider
              min={0}
              max={50}
              value={count}
              onChange={(v) => setCount(v as number)}
            />
            <div className="modal-slider-info">Количество видео: {count}</div>
          </div>

          <div className="modal-actions">
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

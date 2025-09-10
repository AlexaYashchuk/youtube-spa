import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.login.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="nav-panel">
      <div className="nav-panel-el">
        <img src="/video_player.svg" alt="logo" width="30" />
        <div className="menuBtn">
          {" "}
          {user?.email && <span>{user.email}</span>}
        </div>
      </div>
      <div className="menu">
        <Link to="/search" className="menuBtn">
          Поиск
        </Link>
        <Link to="/favorites" className="menuBtn">
          Избранное
        </Link>
      </div>
      <Button
        type="primary"
        // danger
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Выйти
      </Button>
    </div>
  );
};

export { NavBar };

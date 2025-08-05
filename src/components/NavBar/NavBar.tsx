import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="nav-panel">
      <div className="nav-panel-el ">
        <img src="/video_player.svg" alt="logo" width="30" />
        {/* Video Search */}
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

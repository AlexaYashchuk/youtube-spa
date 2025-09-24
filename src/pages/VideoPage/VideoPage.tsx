import { useAppSelector } from "../../app/hooks";
import { SearchVideo } from "../SearchVideo/SearchVideo";
import { ListView } from "../../components/VideoList/ListView";
import { CardView } from "../../components/VideoList/CardView";
import { Segmented } from "antd";
import { useState } from "react";
import "./VideoPage.css";

const VideoPage = () => {
  const videos = useAppSelector((state) => state.search.videos);
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  return (
    <div>
      <div>
        <SearchVideo />
        <Segmented
          className="video-segment"
          options={[
            { label: "Список", value: "list" },
            { label: "Карточки", value: "card" },
          ]}
          value={viewMode}
          onChange={(val) => setViewMode(val as "list" | "card")}
        />
      </div>

      <div className="video-content">
        {viewMode === "list" ? (
          <ListView videos={videos} />
        ) : (
          <CardView videos={videos} />
        )}
      </div>
    </div>
  );
};

export { VideoPage };

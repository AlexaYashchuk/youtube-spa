import { useAppSelector } from "../../app/hooks";
import { SearchVideo } from "../SearchVideo/SearchVideo";
import { ListView } from "../../components/VideoList/ListView";
import { CardView } from "../../components/VideoList/CardView";
import { Button, Segmented } from "antd";
import { useState } from "react";

const VideoPage = () => {
  const videos = useAppSelector((state) => state.search.videos);
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  const videosToShow = videos.slice(0, 12); // по умолчанию 12 видео

  return (
    <>
      <SearchVideo />
      <hr />
      <div style={{ padding: "20px" }}>
        <Segmented
          options={[
            { label: "Список", value: "list" },
            { label: "Карточки", value: "card" },
          ]}
          value={viewMode}
          onChange={(val) => setViewMode(val as "list" | "card")}
          style={{ marginBottom: 20 }}
        />

        <hr />

        {viewMode === "list" ? (
          <ListView videos={videosToShow} />
        ) : (
          <CardView videos={videosToShow} />
        )}
      </div>
    </>
  );
};

export { VideoPage };

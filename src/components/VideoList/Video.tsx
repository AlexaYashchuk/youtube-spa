import { Card } from "antd";
import type { VideoItem } from "../../types/video";

const Video = ({
  video,
  layout,
}: {
  video: VideoItem;
  layout: "list" | "card";
}) => {
  const { title, description, thumbnails } = video.snippet;
  const thumbnailUrl = thumbnails?.medium?.url || "";

  return layout === "list" ? (
    <div style={{ display: "flex", marginBottom: 16 }}>
      <img
        src={thumbnailUrl}
        alt="thumb"
        style={{ width: 160, marginRight: 16 }}
      />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <a
          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Смотреть на YouTube
        </a>
      </div>
    </div>
  ) : (
    <Card hoverable cover={<img alt="thumbnail" src={thumbnailUrl} />}>
      <Card.Meta
        title={title}
        description={
          <>
            <p>{description}</p>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Смотреть на YouTube
            </a>
          </>
        }
      />
    </Card>
  );
};

export { Video };

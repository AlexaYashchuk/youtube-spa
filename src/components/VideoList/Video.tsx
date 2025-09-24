import { Card } from "antd";
import type { VideoItem } from "../../types/video";
import "./Video.css";

const { Meta } = Card;

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
    <Card hoverable className="video-card list">
      <div className="video-list-content">
        <img className="video-thumbnail" src={thumbnailUrl} alt="thumb" />
        <Meta
          title={title}
          description={
            <div>
              <p>{description}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
              >
                Смотреть на YouTube
              </a>
            </div>
          }
        />
      </div>
    </Card>
  ) : (
    <Card
      hoverable
      className="video-card"
      cover={<img alt="thumbnail" src={thumbnailUrl} />}
    >
      <Meta
        title={title}
        description={
          <>
            <p>{description}</p>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
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

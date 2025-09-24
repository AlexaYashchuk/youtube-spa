import { Video } from "./Video";
import "./CardView.css";

const CardView = ({ videos }: { videos: any[] }) => {
  return (
    <div className="card-grid">
      {videos.map((video) => (
        <Video key={video.id.videoId} video={video} layout="card" />
      ))}
    </div>
  );
};

export { CardView };

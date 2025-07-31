import { useAppSelector } from "../app/hooks";
import { VideoCard } from "./VideoCard";

const VideoList = () => {
  const videos = useAppSelector((state) => state.search.videos);

  return (
    <div>
      {videos.map((video) => (
        <VideoCard key={video.id.videoId} video={video} />
      ))}
    </div>
  );
};

export { VideoList };

//import type { VideoItem } from '../types/video';
import type { VideoItem } from "../types/video";

const VideoCard = ({ video }: { video: VideoItem }) => {
  const { title, description, thumbnails } = video.snippet;

  const value: number = 5;

  return (
    <div>
      <img src={thumbnails.medium.url} alt={title} />
      <h3>TITLE:{title}</h3>
      <p>DESCRIPTION:{description}</p>
      <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
        Смотреть на YouTube
      </a>
    </div>
  );
};

export { VideoCard };

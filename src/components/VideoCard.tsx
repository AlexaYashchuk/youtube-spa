//import type { VideoItem } from '../types/video';
import type { VideoItem } from "../types/video";

export const VideoCard = ({ video }: { video: VideoItem }) => {
  const { title, description, thumbnails } = video.snippet;

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

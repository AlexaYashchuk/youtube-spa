import { Video } from "./Video";

export const ListView = ({ videos }: { videos: any[] }) => {
  return (
    <div>
      {videos.map((video) => (
        <Video key={video.id} video={video} layout="list" />
      ))}
    </div>
  );
};

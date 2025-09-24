import { Video } from "./Video";

const ListView = ({ videos }: { videos: any[] }) => {
  return (
    <div>
      {videos.map((video) => (
        <Video key={video.id.videoId} video={video} layout="list" />
      ))}
    </div>
  );
};

export { ListView };

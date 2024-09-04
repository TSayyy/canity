import { useSearchParams } from "react-router-dom";

import videoPoster from "@/assets/videoPoster.jpg";
import { Player } from "@/components/ui/player/player";
import { getYoutubeId } from "@/utils/helpers";

type CoursePlayerProps = {
  courseChapters: {
    id?: string;
    chapterName: string;
    chapterLink: string;
  }[];
};
export function CoursePlayer({ courseChapters }: CoursePlayerProps) {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("chapter") || courseChapters[0]?.id;
  const currentVideo = courseChapters.find((chapter) => chapter.id?.toString() === videoId);
  const res = getYoutubeId(currentVideo?.chapterLink || "");
  let videoLink = currentVideo?.chapterLink;
  if (res) {
    videoLink = `https://www.youtube.com/${res}?autoplay=0&showinfo=0&controls=0`;
  }
  return (
    <Player
      src={videoLink || currentVideo?.chapterLink || ""}
      title={currentVideo?.chapterName}
      poster={{ src: videoPoster, alt: "poster" }}
      className="sm:rounded-xl"
    />
  );
}

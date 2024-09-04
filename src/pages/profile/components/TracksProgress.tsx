import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type track = {
  id: string;
  title: string;
  progress: number;
};

export function TracksProgress({ tracks }: { tracks: track[] }) {
  return (
    <section className=" shadow-custom rounded-md min-w-48 p-3 ">
      <div className="flex justify-center items-center h-full">
        {!tracks || tracks.length === 0 ? (
          <p className="text-xl text-center text-zinc-400">you are not assigned to any track</p>
        ) : (
          <Carousel className=" flex flex-col justify-between h-full items-center pb-5">
            <CarouselContent>
              {tracks.map((track) => (
                <CarouselItem key={track.id}>
                  <CircularProgressbarWithChildren value={track.progress} key={track.id}>
                    <h1 className="text-5xl text-royal-blue font-semibold mb-2">{track.progress}%</h1>
                    <p className="text-zinc-500 text-sm sm:text-md max-w-xs text-center">{track.title}</p>
                    <p className="text-zinc-500 text-xs sm:text-sm max-w-xs text-center">track progress</p>
                  </CircularProgressbarWithChildren>
                </CarouselItem>
              ))}
            </CarouselContent>
            {tracks.length > 1 && (
              <div className="relative w-full flex justify-between">
                <CarouselPrevious className="border-0  left-0 bg-transparent text-royal-blue focus:text-royal-blue" />
                <CarouselNext className="border-0 right-0 bg-transparent text-royal-blue focus:text-royal-blue" />
              </div>
            )}
          </Carousel>
        )}
      </div>
    </section>
  );
}

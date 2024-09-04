import React from "react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type CalendarCarouselProps = {
  selectedTime: number | undefined;
  setSelectedTime: React.Dispatch<React.SetStateAction<number | undefined>>;
  availability: { startTime: number; isBooked: boolean }[];
};
export const CalendarCarousel = ({ selectedTime, setSelectedTime, availability }: CalendarCarouselProps) => {
  const handleSelection = (idx: number) => setSelectedTime((prev) => (prev === idx ? undefined : idx));
  return (
    <Carousel className="flex flex-col gap-2">
      <CarouselContent className=" min-w-56">
        {availability?.map((time, index) => (
          <CarouselItem key={index} className="basis-1/2 ">
            <Button
              variant={selectedTime === time.startTime ? "default" : "outline"}
              className="border w-full "
              disabled={time.isBooked}
              onClick={() => handleSelection(time.startTime)}
            >
              {time.startTime > 12
                ? `${time.startTime - 12}:00 PM`
                : `${time.startTime === 0 ? "12" : time.startTime}:00 AM`}
            </Button>
          </CarouselItem>
        ))}
        {availability.length < 1 && (
          <CarouselItem className="text-center min-w-56 min-h-10">No available times at this date</CarouselItem>
        )}
      </CarouselContent>
      <div className="w-full flex justify-between *:translate-y-0">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
};

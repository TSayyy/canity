import { eachDayOfInterval, format, isSameDay } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { usePostData } from "@/hooks/useApi";
import { MentorAvailabilitySchema } from "@/schemas/mentorSchema";

import { AddedAvailableTime } from "./AddedAvailableTime";
import { AvailableTimeForm } from "./AvailableTimeForm";

type AvailableTimeType = {
  day: string;
  date: Date;
  times: {
    startTime: number;
    endTime: number;
    isBooked: boolean;
  };
};
export function AvailabilityEditor({ availabilities }: { availabilities: z.infer<typeof MentorAvailabilitySchema>[] }) {
  const addAvailableTime = usePostData("/sessions/add-session");
  const [days, setDays] = useState(() =>
    eachDayOfInterval({
      start: new Date(),
      end: new Date(new Date().setDate(new Date().getDate() + 7)),
    }).map((day) => {
      const isOpen = availabilities?.find((time) => isSameDay(day, new Date(time.date))) ? true : false;
      return { day: format(day, "EEEE"), date: format(day, "yyyy-MM-dd"), isOpen };
    })
  );

  const [availableTimes, setAvailableTimes] = useState<AvailableTimeType[]>(() => {
    return (
      availabilities?.map((time) => {
        return {
          day: format(new Date(time.date), "EEEE"),
          date: new Date(time.date),
          times: {
            startTime: time.startTime,
            endTime: time.endTime,
            isBooked: time.isBooked,
          },
        };
      }) || []
    );
  });
  async function handleAddTime({
    startTime,
    endTime,
    day,
    date,
  }: {
    startTime: number;
    endTime: number;
    day: string;
    date: Date;
  }) {
    if (days.find((d) => isSameDay(d.date, date) && !d.isOpen)) return toast.error("This day is locked by you!");
    console.log({ startTime, endTime, day, date });
    const res = await addAvailableTime.mutateAsync({ startTime, endTime, date });
    const toastId = toast.loading("Adding session...");
    if (res.status === "success") {
      toast.success("session added successfully!", { id: toastId });
      setAvailableTimes((prev) => [
        ...prev,
        {
          day: day,
          date: date,
          times: {
            startTime: startTime,
            endTime: endTime,
            isBooked: false,
          },
        },
      ]);
    }
  }
  function handleDeleteTime({
    day,
    date,
    startTime,
    endTime,
  }: {
    startTime: number;
    endTime: number;
    day: string;
    date: Date;
  }) {
    setAvailableTimes((prev) => {
      return prev.filter((time) => {
        return (
          time.day === day &&
          isSameDay(date, time.date) &&
          time.times.startTime !== startTime &&
          time.times.endTime !== endTime
        );
      });
    });
  }
  return (
    <div className=" shadow-custom rounded-lg basis-full ">
      <ScrollArea className=" h-96 py-4  container md:max-lg:px-2 ">
        <Accordion type="single" collapsible className="px-1">
          {days.map((day) => (
            <AccordionItem key={day.date} value={day.date} className="hover:no-underline">
              <div className="flex items-center gap-4 *:grow">
                <Switch
                  checked={day.isOpen}
                  className=" focus-visible:ring-1 max-w-11 focus-visible:ring-royal-blue"
                  onCheckedChange={(checked) => {
                    if (availableTimes.find((time) => isSameDay(day.date, time.date))) {
                      return toast.error("You can't lock a day with available times!");
                    }
                    setDays((prev) => prev.map((d) => (isSameDay(day.date, d.date) ? { ...d, isOpen: checked } : d)));
                  }}
                />
                <AccordionTrigger
                  disabled={!day.isOpen}
                  className={`text-base md:text-xl md:max-lg:text-base text-left gap-4 font-semibold flex hover:no-underline ${!day.isOpen ? "text-zinc-400" : "text-dark-navy"}`}
                >
                  <span className="flex gap-4">
                    <span>{day.day}</span>
                    <span className=" text-xs text-zinc-400 font-normal place-self-end">{day.date}</span>
                  </span>
                </AccordionTrigger>
              </div>
              <AccordionContent className="text-neutral-gray text-balance text-base px-1 space-y-2">
                <AvailableTimeForm
                  onAddTime={(startTime, endTime) =>
                    handleAddTime({ startTime, endTime, day: day.day, date: new Date(day.date) })
                  }
                />
                {availableTimes.map(
                  (time) =>
                    isSameDay(day.date, time.date) && (
                      <AddedAvailableTime
                        key={`${time.times.startTime}-${time.times.endTime}`}
                        times={time.times}
                        onDeleteTime={(startTime, endTime) =>
                          handleDeleteTime({ startTime, endTime, date: time.date, day: day.day })
                        }
                      />
                    )
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}

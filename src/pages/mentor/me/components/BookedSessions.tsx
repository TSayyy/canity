import { addDays, differenceInCalendarDays, format, isSameDay, isToday, subDays } from "date-fns";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import BookedSession from "@/components/ui/bookedSession";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sessionSchema } from "@/schemas/sessionSchema";

type BookedSessionsProps = {
  sessions: z.infer<typeof sessionSchema>[];
  userRole: "student" | "mentor";
  className?: string;
};
export function BookedSessions({ sessions, userRole = "student", className = "" }: BookedSessionsProps) {
  const [currentDay, setCurrentDay] = useState(new Date());
  const todaySessions = sessions?.filter((session) => isSameDay(session.date, currentDay));

  return (
    <section className=" shadow-custom container md:max-lg:px-2 py-5 rounded-lg">
      <header className="flex justify-between items-center">
        {!isToday(currentDay) && (
          <Button variant="link" className=" md:text-lg" onClick={() => setCurrentDay((prev) => subDays(prev, 1))}>
            <IoIosArrowForward className=" rotate-180" />
            Back
          </Button>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className=" text-lg md:text-2xl font-semibold">
            {isToday(currentDay) ? "Today" : format(currentDay, "eeee")}
          </h2>
          <span className="text-zinc-400 text-xs sm:text-sm">{format(currentDay, "dd-MM-yyyy")}</span>
        </div>
        <Button
          variant="link"
          className="md:text-lg"
          onClick={() =>
            setCurrentDay((prev) => (differenceInCalendarDays(prev, new Date()) > 5 ? prev : addDays(prev, 1)))
          }
        >
          Tomorrow
          <IoIosArrowForward />
        </Button>
      </header>
      <ScrollArea className={twMerge("h-72 pr-3", className)}>
        <div className="grid h-full grid-cols-1 gap-4 mt-4">
          {todaySessions?.length > 0 ? (
            todaySessions.map((session) => {
              return (
                <BookedSession
                  key={session.id}
                  startTime={session.startTime}
                  endTime={session.endTime}
                  roomId={session.id}
                  meetingWith={userRole === "mentor" ? session?.student.name : session?.mentor.name}
                />
              );
            })
          ) : (
            <p className="text-zinc-500 mt-14 text-xl text-center my-auto">No schedule today</p>
          )}
        </div>
      </ScrollArea>
    </section>
  );
}

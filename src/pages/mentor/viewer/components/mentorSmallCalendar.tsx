import { format } from "date-fns";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { usePostData } from "@/hooks/useApi";
import { MentorAvailabilitySchema } from "@/schemas/mentorSchema";

import { CalendarCarousel } from "./calendarCarousel";

export const MentorSmallCalendar = ({ availability }: { availability: z.infer<typeof MentorAvailabilitySchema>[] }) => {
  const { id: mentorId } = useParams();
  const bookSession = usePostData(`/students/book-session/${mentorId}`);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<number>();
  const availabilityTimes: { startTime: number; isBooked: boolean }[] = useMemo(() => {
    setSelectedTime(undefined);
    return availability
      ?.filter((time) => {
        const date = new Date(time.date);
        return date.toDateString() === selectedDate?.toDateString();
      })
      .map((time) => {
        return { startTime: time.startTime, isBooked: time.isBooked };
      });
  }, [availability, selectedDate]);

  async function handleBookSession() {
    if (!selectedDate || !selectedTime) return toast.error("Please select a time");
    const toastId = toast.loading("booking session...");
    const sessionData = {
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: selectedTime,
      endTime: selectedTime + 1,
    };
    const { data } = await bookSession.mutateAsync(sessionData);
    console.log(data);
    if (data.status === "Fail") toast.error(data.errors[0].msg);
    else if (data.status === "Success") toast.success("Session reserved successfully");

    toast.dismiss(toastId);
  }

  return (
    <div className=" h-fit p-4 rounded-lg w-full  flex-col lg:max-w-fit gap-x-4 flex shadow-custom space-y-4">
      <div className="w-full flex flex-col items-center sm:items-start">
        <h5 className="text-xl font-medium pb-2.5">Availability:</h5>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          fromDate={new Date()}
          toDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          className="p-0 px-5 w-full flex  justify-center"
          classNames={{
            row: "flex w-full",
            cell: "h-9 w-9 text-center text-xs sm:me-3 p-0 relative",
            head_cell: "text-muted-foreground/80 rounded-md w-9 font-semibold text-[0.8rem] sm:me-3",
          }}
          showOutsideDays
          fixedWeeks
        />
      </div>
      <div className="w-full flex flex-col items-center sm:items-start">
        <div className="space-y-4 w-full">
          <div className="space-y-2">
            <h5 className="text-xl font-medium pb-1 text-center sm:text-start">Schedule:</h5>
            <CalendarCarousel
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              availability={availabilityTimes}
            />
          </div>
          <Button onClick={handleBookSession} className="w-full">
            Book a session
          </Button>
        </div>
      </div>
    </div>
  );
};

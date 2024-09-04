import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AvailableTimeForm({ onAddTime }: { onAddTime: (startTime: number, endTime: number) => void }) {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const Times = Array.from({ length: 24 }, (_, i) => {
    return { value: i, label: format(new Date().setHours(i), "hh:00 a") };
  });
  function handleAddTime() {
    if (selectedTime === null) return toast.error("Please select a time");
    onAddTime(selectedTime, selectedTime + 1);
    setSelectedTime(null);
  }
  console.log(selectedTime);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center md:h-14 gap-2 md:gap-4">
      <Select
        onValueChange={(val) => setSelectedTime(Number(val))}
        value={selectedTime || selectedTime === 0 ? format(new Date().setHours(selectedTime), "hh:00 a") : undefined}
      >
        <SelectTrigger className=" focus:ring-1 focus:ring-royal-blue *:stroke-royal-blue *:opacity-100  ">
          <SelectValue placeholder="start time">
            {selectedTime || selectedTime === 0 ? format(new Date().setHours(selectedTime), "hh:00 a") : "start time"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-48">
          {Times.map((time) => (
            <SelectItem key={time.value} value={String(time.value)}>
              {time.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className=" hidden sm:inline-block md:max-lg:hidden"> to </span>
      <Select
        disabled
        value={
          selectedTime || selectedTime === 0 ? format(new Date().setHours(selectedTime + 1), "hh:00 a") : undefined
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="end time">
            {selectedTime || selectedTime === 0 ? format(new Date().setHours(selectedTime + 1), "hh:00 a") : "end time"}
          </SelectValue>
        </SelectTrigger>
      </Select>

      <Button
        aria-label="Add Time"
        variant="ghost"
        onClick={handleAddTime}
        className="text-royal-blue hover:bg-transparent space-x-1 hover:text-royal-blue/80 place-self-end sm:place-self-center rounded-lg px-4 py-2"
      >
        <span className=" sm:hidden">Add time</span>

        <IoAddCircleOutline className="text-2xl" />
      </Button>
    </div>
  );
}

import { format } from "date-fns";
import toast from "react-hot-toast";
import { IoTrash } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDeleteData } from "@/hooks/useApi";

export function AddedAvailableTime({
  times,
  onDeleteTime,
}: {
  times: { startTime: number; endTime: number; isBooked: boolean };
  onDeleteTime: (startTime: number, endTime: number) => void;
}) {
  const deleteSession = useDeleteData("/sessions/delete-session/1b3f67eb-f38d-42d2-91f1-273b393c119e");
  async function handleDeleteTime() {
    if (times.startTime === undefined || times.endTime === undefined) return;
    if (times.isBooked) return toast.error("This time is already booked!");
    const res = await deleteSession.mutateAsync();
    const toastId = toast.loading("Deleting session...");
    console.log(res);
    if (res.status === "success") {
      onDeleteTime(times.startTime, times.endTime);
    } else {
      toast.error("Failed to delete the session", { id: toastId });
    }
  }
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:h-14 gap-2 md:gap-4">
      <Select
        disabled
        value={
          times.startTime || times.startTime === 0
            ? format(new Date().setHours(times.startTime + 1), "hh:00 a")
            : undefined
        }
      >
        <SelectTrigger className=" disabled:opacity-80 text-dark-navy">
          <SelectValue className=" ">{format(new Date().setHours(times.startTime), "hh:00 a")}</SelectValue>
        </SelectTrigger>
      </Select>
      <span className=" hidden sm:inline-block md:max-lg:hidden"> to </span>
      <Select
        disabled
        value={
          times.endTime || times.endTime === 0 ? format(new Date().setHours(times.endTime + 1), "hh:00 a") : undefined
        }
      >
        <SelectTrigger className=" disabled:opacity-80 text-dark-navy">
          <SelectValue>{format(new Date().setHours(times.endTime), "hh:00 a")}</SelectValue>
        </SelectTrigger>
      </Select>
      <Button
        variant="ghost"
        className="text-red-500 hover:bg-transparent space-x-1 hover:text-red-600 place-self-end  sm:place-self-center  rounded-lg px-4 py-2"
        onClick={handleDeleteTime}
      >
        <span className=" sm:hidden">delete time</span>

        <IoTrash className="text-2xl" />
      </Button>
    </div>
  );
}

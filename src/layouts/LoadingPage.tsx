import { Spinner } from "@/components/ui/Spinner";

export function LoadingPage() {
  return (
    <div className="w-full flex justify-center items-center h-[calc(100dvh-80px)]">
      <Spinner className=" w-32 h-32 stroke-zinc-500" />
    </div>
  );
}

import { cn } from "@/lib/utils";

type TLoadingDots = {
  className: string;
};

export const LoadingDots = ({ className }: TLoadingDots) => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <span className="sr-only">Loading...</span>
      <div className={cn("rounded-full animate-bounce [animation-delay:-0.3s]", className)}></div>
      <div className={cn("rounded-full animate-bounce [animation-delay:-0.15s]", className)}></div>
      <div className={cn("rounded-full animate-bounce", className)}></div>
    </div>
  );
};

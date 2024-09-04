import { IoCamera } from "react-icons/io5";

import { cn } from "@/lib/utils";

type OrderImageFieldProps = {
  image: string;
  className?: string;
};
export function OrderImageField({ image, className = "" }: OrderImageFieldProps) {
  return (
    <div
      className={cn(
        "bg-[#E8E8EC] rounded-full inline-flex w-24 h-24 overflow-hidden justify-center items-center",
        className
      )}
    >
      {image ? (
        <img className="w-full h-full object-cover" loading="lazy" src={image} alt="mentor Image" />
      ) : (
        <IoCamera className=" w-1/3 h-full" />
      )}
    </div>
  );
}

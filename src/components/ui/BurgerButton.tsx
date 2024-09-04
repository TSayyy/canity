import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleNav } from "@/redux/slices/navSlice";
import { RootState } from "@/redux/store";

export const BurgerBtn: FC = () => {
  const isOpen = useSelector((state: RootState) => state.nav.isOpen);
  const dispatcher = useDispatch();
  return (
    <div
      className="z-40 flex cursor-pointer flex-col items-end gap-1.5 lg:hidden"
      onClick={() => dispatcher(toggleNav())}
    >
      <span
        className={`h-1 rounded-full transition-all duration-200 ease-cubic ${
          isOpen ? "w-8 translate-y-2.5 rotate-45 bg-white" : "w-8 bg-white"
        }`}
      ></span>
      <span
        className={`h-1 rounded-full transition-all duration-200 ease-cubic ${isOpen ? "w-0" : "w-6 bg-white"}`}
      ></span>
      <span
        className={`h-1 rounded-full transition-all duration-200 ease-cubic ${
          isOpen ? "w-8 -translate-y-2.5 -rotate-45 bg-white" : "w-4 bg-white"
        }`}
      ></span>
    </div>
  );
};

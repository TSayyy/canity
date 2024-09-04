import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

import { useOutsideClick } from "@/hooks/useOutsideClick";

export function SmallSearchBar() {
  const [isOpened, setIsOpened] = useState(false);
  const searchBarRef = useOutsideClick(() => setIsOpened(false));
  return (
    <div ref={searchBarRef} className={`flex gap-1 p-1 rounded-lg`}>
      <button className="lg:hidden" onClick={() => setIsOpened((prev) => !prev)}>
        <label htmlFor="Search" className=" cursor-pointer">
          <IoMdSearch
            size={30}
            className={` transition-all duration-300 ${isOpened ? "text-royal-blue rotate-90" : "text-white"}`}
          />
        </label>
      </button>
      <div
        className={`absolute top-full  transition-color duration-300  w-full z-10 rounded-b-md overflow-hidden left-0  ${isOpened ? " max-h-screen " : " max-h-0"} ${isOpened ? "has-[:focus]:bg-white/5 has-[:focus]:ring-royal-blue has-[:focus]:ring-2" : ""}`}
      >
        <input
          type="text"
          id="Search"
          placeholder="Search"
          className={`bg-white text-dark-navy px-2 w-full py-1 focus:outline-none`}
        />
      </div>
    </div>
  );
}

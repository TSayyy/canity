import React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineChat, MdOutlinePolicy } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { BurgerBtn } from "@/components/ui/BurgerButton";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { closeNav } from "@/redux/slices/navSlice";
import { RootState } from "@/redux/store";
import { trackSchema } from "@/schemas/trackSchema";
import { userSchema } from "@/schemas/userSchema";

import Logo from "../assets/white logo.svg";

type SmallNavbarProps = {
  isAuth: boolean;
  tracks: z.infer<typeof trackSchema>[];
  user: z.infer<typeof userSchema>;
  logout: () => void;
};

export function SmallNavbar({ isAuth, tracks, user, logout }: SmallNavbarProps) {
  const isOpen = useSelector((state: RootState) => state.nav.isOpen);
  const dispatcher = useDispatch();
  const navRef = useOutsideClick(() => dispatcher(closeNav()));
  const navigate = useNavigate();
  return (
    <nav
      ref={navRef}
      className={`xl:hidden min-h-dvh h-full fixed w-60 bg-royal-blue z-[100] top-0 transition-all duration-300 p-6 flex flex-col justify-between gap-2 ${isOpen ? " right-0" : " -right-60"}`}
    >
      <header>
        <div className="flex justify-between">
          <div className="w-12 ">
            <Link to={"/"} onClick={() => dispatcher(closeNav())}>
              <img src={Logo} />
            </Link>
          </div>
          <BurgerBtn />
        </div>
      </header>

      <ul className="flex flex-col justify-evenly items-end grow text-xl font-semibold text-white">
        <li className="relative">
          {tracks && <TracksDropDownMenu tracks={tracks} handleCloseNav={() => dispatcher(closeNav())} />}
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/mentors"} onClick={() => dispatcher(closeNav())}>
            Mentors
          </Link>
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/courses"} onClick={() => dispatcher(closeNav())}>
            Courses
          </Link>
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/pricing"} onClick={() => dispatcher(closeNav())}>
            Pricing
          </Link>
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/contact"} onClick={() => dispatcher(closeNav())}>
            Contact
          </Link>
        </li>
        <li>
          <Link
            className="hover:opacity-80 transition-opacity"
            to={"/dashboard"}
            onClick={() => dispatcher(closeNav())}
          >
            Dashboard
          </Link>
        </li>
      </ul>
      {isAuth ? (
        <div className="flex  justify-between items-center">
          <Link title="profile" to="/profile" onClick={() => dispatcher(closeNav())}>
            <UserAvatar imageUrl={user?.image} name={user?.name} />
          </Link>
          <Link title="Ai Assistant" to="/chat/coursanity-assistant" onClick={() => dispatcher(closeNav())}>
            <MdOutlineChat size={30} />
          </Link>
          <Link title="Privacy Policy" to="/privacy-policy" onClick={() => dispatcher(closeNav())}>
            <MdOutlinePolicy size={30} />
          </Link>
          <button
            title="log out"
            onClick={() => {
              dispatcher(closeNav());
              logout;
            }}
          >
            <TbLogout className="text-dark-navy" size={30} />
          </button>
        </div>
      ) : (
        <div className="gap-2 min-w-fit flex flex-col justify-center font-semibold items-center w-full">
          <button
            className="text-dark-navy border-2 w-full border-dark-navy px-3 py-1.5 rounded-md whitespace-nowrap hover:bg-dark-navy/20 transition-colors"
            onClick={() => {
              dispatcher(closeNav());
              navigate("/auth/register");
            }}
          >
            Sign up
          </button>
          <button
            className="text-white bg-dark-navy/90 w-full px-4 py-2 rounded-md whitespace-nowrap hover:bg-dark-navy/90 transition-colors"
            onClick={() => {
              dispatcher(closeNav());
              navigate("/auth/login");
            }}
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
}

type DropDownMenuProps = {
  handleCloseNav: () => void;
  tracks: z.infer<typeof trackSchema>[];
};

function TracksDropDownMenu({ tracks, handleCloseNav }: DropDownMenuProps) {
  const [isOpened, setIsOpened] = useState(false);
  const dropDownRef = useOutsideClick(() => {
    setIsOpened(false);
  }, false);

  const handleDropDownMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpened((prev) => !prev);
  };
  return (
    <>
      <button className="flex gap-1 items-center hover:opacity-80 transition-opacity" onClick={handleDropDownMenuClick}>
        <IoIosArrowDown className={` transition-all ${isOpened ? "-rotate-90 text-dark-navy" : "rotate-90"}`} />
        <span>Tracks</span>
      </button>
      <div
        ref={dropDownRef}
        className={` absolute whitespace-nowrap top-0 right-full overflow-hidden transition-all duration-500 flex flex-col z-10 border-white border-[1px] rounded-md bg-royal-blue text-white  ${isOpened ? " max-w-screen-3xl  " : "hidden max-w-0"}`}
      >
        <div className="flex flex-col gap-2 items-end font-[500] p-4 ">
          {tracks.map((track) => (
            <Link
              to={`/track/${track?.id}`}
              className={`flex items-center gap-1 hover:text-dark-navy/70 `}
              key={track.id}
              onClick={() => {
                setIsOpened(false);
                handleCloseNav();
              }}
            >
              <span>{track.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

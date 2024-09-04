import React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { BurgerBtn } from "@/components/ui/BurgerButton";
import { Button } from "@/components/ui/Button_";
import { NotificationPopover } from "@/components/ui/NotificationPopover";
import { SearchBar } from "@/components/ui/SearchBar";
import { SmallSearchBar } from "@/components/ui/SmallSearchBar";
import UserPopover from "@/components/ui/UserPopover";
import { useLogout } from "@/hooks/useLogout";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useTracks } from "@/hooks/useTracks";
import { RootState } from "@/redux/store";
import { trackSchema } from "@/schemas/trackSchema";

import Logo from "../assets/logo-inline.webp";
import { SmallNavbar } from "./SmallNavbar";

export function Navbar() {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth);
  const tracks = useTracks();

  const logout = useLogout();

  return (
    <nav className="bg-dark-navy min-w-full container relative py-5 max-h-20 border-b-[1px] border-dark-navy flex justify-between items-center gap-1 ">
      <SmallNavbar tracks={tracks} isAuth={userData.authStatus} user={userData} logout={logout} />
      <div className="min-w-36 max-w-48 ">
        <Link to={"/"}>
          <img src={Logo} alt="Coursanity-Logo" />
        </Link>
      </div>
      <div className="grow hidden mx-5 lg:block">
        <ul className="flex space-x-5 text-white">
          <li className="relative">{tracks && <TracksDropDownMenu tracks={tracks} />}</li>
          <li>
            <Link className="hover:opacity-80 transition-opacity" to={"/mentors"}>
              Mentors
            </Link>
          </li>
          <li>
            <Link className="hover:opacity-80 transition-opacity" to={"/courses"}>
              Courses
            </Link>
          </li>
          <li>
            <Link className="hover:opacity-80 transition-opacity" to={"/pricing"}>
              Pricing
            </Link>
          </li>
          <li>
            <Link className="hover:opacity-80 transition-opacity" to={"/contact"}>
              Contact
            </Link>
          </li>
          {userData.authStatus && userData.role === "admin" && (
            <li>
              <Link className="hover:opacity-80 transition-opacity" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
      {!userData.authStatus ? (
        <div className="space-x-5 min-w-fit hidden lg:flex">
          <button
            className="text-white py-2 px-5 border-[1px] rounded-xl whitespace-nowrap hover:opacity-80 transition-opacity"
            onClick={() => navigate("/auth/login")}
          >
            Log in
          </button>
          <Button className=" py-2 px-5" text="Sign up" type="button" onClick={() => navigate("/auth/register")} />
        </div>
      ) : (
        <div className="text-white justify-end grow items-center gap-5 hidden lg:flex">
          <SearchBar
            className=" text-white min-w-56 max-w-80 bg-white/10 *:placeholder:text-white/80 has-[:focus]:bg-white/20"
            onChange={() => null}
            value=""
          />
          <NotificationPopover />
          <UserPopover userData={userData} logout={logout} />
        </div>
      )}
      <div className="flex justify-center text-white items-center gap-3 lg:hidden">
        <SmallSearchBar />
        <NotificationPopover />
        <BurgerBtn />
      </div>
    </nav>
  );
}

function TracksDropDownMenu({ tracks }: { tracks: z.infer<typeof trackSchema>[] }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<z.infer<typeof trackSchema> | null>(null);
  const dropDownRef = useOutsideClick(() => setIsOpened(false), false);

  const handleDropDownMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isOpened) setSelectedTrack(null);
    setIsOpened((prev) => !prev);
  };
  const handleTrackClick = (track: z.infer<typeof trackSchema>) => {
    if (selectedTrack === track) setSelectedTrack(null);
    else setSelectedTrack(track);
  };
  return (
    <>
      <button className="flex gap-1 items-center hover:opacity-80 transition-opacity" onClick={handleDropDownMenuClick}>
        <span>Tracks</span>
        <span>
          {" "}
          <IoIosArrowDown className={` transition-all ${isOpened && "rotate-180 text-royal-blue"}`} />{" "}
        </span>
      </button>
      <div
        ref={dropDownRef}
        className={` absolute top-[150%]  overflow-hidden transition-all duration-700 flex z-[100] bg-white text-dark-navy rounded-lg shadow-lg  ${isOpened ? " max-h-screen" : " max-h-0"}`}
      >
        <div className="flex flex-col gap-2 items-start font-[500] p-4 ">
          {tracks.map((track) => (
            <button
              className={`flex items-center gap-1  ${selectedTrack === track ? "text-royal-blue hover:text-royal-blue/70" : "hover:text-dark-navy/70"}`}
              onClick={() => handleTrackClick(track)}
              key={track.id}
            >
              <span className=" whitespace-nowrap">{track.name}</span>
              <span>
                <IoIosArrowDown
                  size={14}
                  className={` transition-all  ${selectedTrack === track ? "rotate-90" : "-rotate-90"}`}
                />
              </span>
            </button>
          ))}
        </div>
        <div
          className={`text-sm flex flex-col transition-all duration-300 space-y-2 items-start whitespace-nowrap overflow-hidden ${selectedTrack ? " border-l-2 max-w-screen-3xl" : " max-w-0"}`}
        >
          <header className="bg-dark-navy/90 text-white w-full text-lg font-semibold p-4">
            <h1>{selectedTrack?.name}</h1>
          </header>
          <main className="px-4 pb-2 grow flex justify-between flex-col">
            <p className=" font-semibold text-base mb-4">Related Topics</p>
            <div className="flex flex-col grow">
              {selectedTrack?.relatedTopics?.map((topic, index) => (
                <Link
                  to={`/track/${selectedTrack?.id}`}
                  className="hover:text-dark-navy/70"
                  key={index}
                  onClick={handleDropDownMenuClick}
                >
                  {topic}
                </Link>
              ))}
            </div>
            <Link
              to={`/track/${selectedTrack?.id}`}
              className="text-royal-blue text-base mt-4 block"
              onClick={handleDropDownMenuClick}
            >
              Explore the track
            </Link>
          </main>
        </div>
      </div>
    </>
  );
}

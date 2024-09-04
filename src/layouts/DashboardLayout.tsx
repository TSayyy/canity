import { useEffect } from "react";
import { BsGrid1X2, BsPeople } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { PiBooksBold } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { BurgerBtn } from "@/components/ui/BurgerButton";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { useLogout } from "@/hooks/useLogout";
import { RootState } from "@/redux/store";

import Logo from "../assets/logo-inline.webp";
import { SmallDashboardNavbar } from "./SmallDashboardNavbar";

export function DashboardLayout() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  if (user.role !== "admin") navigate("/auth/login", { replace: true });
  const logout = useLogout();
  const outlet = Outlet({});
  useEffect(() => {
    if (outlet === null) navigate("/dashboard/main", { replace: true });
  }, [navigate, outlet]);
  return (
    <main className="grid md:grid-cols-[300px_1fr] min-h-dvh relative w-dvw overflow-hidden">
      <SmallDashboardNavbar logout={logout} />
      <nav className="bg-dark-navy text-white px-3 md:py-10 py-5 flex md:flex-col justify-between">
        <Link to={"/"}>
          <img src={Logo} alt="Coursanity-Logo" className="w-48 px-2" loading="lazy" />
        </Link>
        <ul className="mt-10 hidden md:grid gap-1 *:w-full *:dashboard">
          <li>
            <NavLink
              to={"main"}
              className="flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
            >
              <BsGrid1X2 className="inline-block" size={22} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"courses"}
              className={
                "flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
              }
            >
              <PiBooksBold className="inline-block " size={22} />
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"mentors"}
              className={
                "flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
              }
            >
              <BsPeople className="inline-block " size={22} />
              Mentors
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"orders-list"}
              className={
                "flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
              }
            >
              <FaListUl className="inline-block " size={22} />
              Order list
            </NavLink>
          </li>
        </ul>
        <div className="flex-1 hidden md:block " />
        <footer className="hidden md:block ">
          <Link
            to={"/profile"}
            className="flex justify-start items-center gap-3 w-full rounded-xl py-4 px-3 hover:bg-[#293560]/50 "
          >
            <UserAvatar imageUrl={user.image} name={user.name} className=" h-6 w-6" />
            <span className=" select-none">{user.name}</span>
          </Link>
          <button
            className="text-left transition-colors flex w-full rounded-xl py-4 px-3 items-center gap-3 hover:bg-[#293560]/50 "
            onClick={logout}
          >
            <TbLogout size={22} />
            Logout
          </button>
        </footer>
        <div className="md:hidden">
          <BurgerBtn />
        </div>
      </nav>
      <main className="container py-10 min-h-[calc(100dvh-68px)] md:h-dvh md:overflow-auto ">
        <Outlet />
      </main>
    </main>
  );
}

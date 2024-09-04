import { BsGrid1X2, BsPeople } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { PiBooksBold } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { BurgerBtn } from "@/components/ui/BurgerButton";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { closeNav } from "@/redux/slices/navSlice";
import { RootState } from "@/redux/store";

import Logo from "../assets/logo-inline.webp";

type SmallDashboardNavbarProps = {
  logout: () => void;
};
export function SmallDashboardNavbar({ logout }: SmallDashboardNavbarProps) {
  const isOpen = useSelector((state: RootState) => state.nav.isOpen);
  const dispatcher = useDispatch();
  const navRef = useOutsideClick(() => dispatcher(closeNav()));
  return (
    <nav
      ref={navRef}
      className={`bg-dark-navy text-white px-3 py-10 flex flex-col absolute z-[100]  w-60 h-dvh transition-all duration-300 ${isOpen ? " right-0" : " -right-60"}`}
    >
      <header className="flex gap-2 justify-between items-center">
        <Link to={"/"}>
          <img src={Logo} alt="Coursanity-Logo" className="w-48 px-2" loading="lazy" />
        </Link>
        <BurgerBtn />
      </header>
      <ul className="mt-10 grid gap-1 *:w-full *:dashboard">
        <li>
          <NavLink
            onClick={() => dispatcher(closeNav())}
            to={"main"}
            className="flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
          >
            <BsGrid1X2 className="inline-block" size={22} />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={() => dispatcher(closeNav())}
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
            onClick={() => dispatcher(closeNav())}
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
            onClick={() => dispatcher(closeNav())}
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
      <div className="flex-1" />
      <footer>
        <Link
          onClick={() => dispatcher(closeNav())}
          to={"/profile"}
          className="flex justify-start items-center gap-3 w-full rounded-xl py-4 px-3 hover:bg-[#293560]/50 "
        >
          <UserAvatar imageUrl="" name=" Micheal Johnson" className=" h-6 w-6" />
          <span className=" select-none">Micheal Johnson</span>
        </Link>
        <button
          className="text-left transition-colors flex w-full rounded-xl py-4 px-3 items-center gap-3 hover:bg-[#293560]/50 "
          onClick={logout}
        >
          <TbLogout size={22} />
          Logout
        </button>
      </footer>
    </nav>
  );
}

import { Link } from "react-router-dom";

import { SubscribeEmailInput } from "@/components/ui/SubscribeEmailInput";

import Logo from "../assets/logo-full-white-text.svg";

export function Footer() {
  return (
    <footer className=" bg-dark-navy py-16 w-full text-white place-self-end">
      <main className="container gap-5 justify-left items-left grid lg:grid-cols-6 mt-5">
        <aside className="">
          <img src={Logo} alt="Coursanity Logo" className="w-32 min-w-32 max-w-32" />
        </aside>
        <aside className="">
          <h1>Welcome</h1>
          <ul className=" md:my-5 gap-x-3 opacity-75 grid">
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Employee
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Payroll
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Absences
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Time tracking
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Shift planner
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Recruiting
            </Link>
          </ul>
        </aside>
        <aside className="">
          <h1>Information</h1>
          <ul className=" md:my-5 gap-2 opacity-75 grid">
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              FAQ
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Blog
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Support
            </Link>
          </ul>
        </aside>
        <aside className="">
          <h1>Company</h1>
          <ul className=" md:my-5 gap-2 opacity-75 grid">
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              About us
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Terms of use
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Privacy policy
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Contact us
            </Link>
          </ul>
        </aside>
        <aside className=" lg:-translate-y-8 col-span-2 grid gap-3  bg-white/10 p-8 ">
          <h1>Subscribe</h1>
          <SubscribeEmailInput />
          <p className="opacity-60 text-sm leading-6">
            Hello, we are Lift Media. Our goal is to translate the positive effects from revolutionizing how companies
            engage with their clients & their team.
          </p>
        </aside>
      </main>
      <footer className="container text-center">
        <hr className="border-neutral-gray/20 border-2 my-5 " />
        <span className="text-sm text-center text-neutral-gray">© 2024 Coursanity | All Rights Reserved</span>
      </footer>
    </footer>
  );
}

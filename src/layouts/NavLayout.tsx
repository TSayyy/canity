import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar";

export function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";

export function FooterLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
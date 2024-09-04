import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import ScrollToTop from "@/components/ui/ScrollToTop";
import { useGetData } from "@/hooks/useApi";
import { setUser } from "@/redux/slices/authSlice";

export function AppLayout() {
  const dispatch = useDispatch();
  const { data: response } = useGetData("/nav");
  const { user: data } = response?.data || {};
  const { loggedIn: authStatus, data: user } = data || {};

  useEffect(() => {
    if (authStatus && user) {
      dispatch(setUser({ ...user, authStatus }));
    }
  }, [authStatus, user, dispatch]);

  return (
    <main className="grid relative min-h-dvh">
      <ScrollToTop />
      <Outlet />
    </main>
  );
}

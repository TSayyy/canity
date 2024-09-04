import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "@/redux/store";

export function ProtectedRoute() {
  const isAuth = useSelector((state: RootState) => state.auth.authStatus);

  if (!isAuth) return <Navigate to="/auth/login" replace />;
  return <Outlet />;
}

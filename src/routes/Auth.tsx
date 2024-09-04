import { Navigate, Outlet } from "react-router-dom";

import { useAuthStatus } from "@/hooks/useAuthStatus";

export function AuthRoutes() {
  const authStatus = useAuthStatus();
  if (authStatus) return <Navigate to="/" replace />;
  return <Outlet />;
}

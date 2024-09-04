import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetUser } from "@/redux/slices/authSlice";

import { usePostData } from "./useApi";

export function useLogout() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutRequest = usePostData("/auth/logout");

  const logout = async () => {
    const toastId = toast.loading("Logging out...");

    const response = await logoutRequest.mutateAsync({});
    if (response?.status === "success") {
      queryClient.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatcher(resetUser());
      queryClient.invalidateQueries({
        queryKey: ["/nav"],
      });
      toast.success("Logged out successfully", { id: toastId });
      navigate("/");
    } else {
      toast.error("Something went wrong, please try again later", { id: toastId });
    }
  };

  return logout;
}

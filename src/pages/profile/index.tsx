import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import { MentorMePage } from "../mentor/me";
import { StudentProfilePage } from "./StudentProfilePage";

const UserType = {
  mentor: <MentorMePage />,
  student: <StudentProfilePage />,
  admin: <StudentProfilePage />,
};

export default function Profile() {
  const userRole = useSelector((state: RootState) => state.auth.role);
  return <>{userRole && UserType[userRole]}</>;
}

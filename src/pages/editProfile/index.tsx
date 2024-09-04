import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import { MentorEditProfile } from "./MentorEditProfile";
import { StudentEditProfile } from "./StudentEditProfile";

const UserType = {
  mentor: <MentorEditProfile />,
  student: <StudentEditProfile />,
  admin: <StudentEditProfile />,
};

export function EditProfile() {
  const userRole = useSelector((state: RootState) => state.auth.role);

  return <>{userRole && UserType[userRole]}</>;
}

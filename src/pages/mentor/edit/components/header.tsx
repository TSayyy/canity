import { Link } from "react-router-dom";

import { CoursanityLogo } from "@/components/icons/Logo";

export const Header = () => {
  return (
    <div className="container flex items-center gap-4">
      <Link to="/">
        <CoursanityLogo className="h-12" />
      </Link>
      <h1 className="text-3xl font-bold text-dark-navy">Edit Profile</h1>
    </div>
  );
};

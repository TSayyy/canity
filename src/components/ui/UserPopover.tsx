import { MdOutlineChat, MdOutlinePolicy } from "react-icons/md";
import { TbEdit, TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { z } from "zod";

import { UserAvatar } from "@/components/ui/UserAvatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { userSchema } from "@/schemas/userSchema";

import { Badge } from "./badge";

type UserPopoverProps = {
  userData: z.infer<typeof userSchema> | null;
  logout: () => void;
};

export default function UserPopover({ userData, logout }: UserPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar imageUrl={userData?.image || ""} name={userData?.name || "User"} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 w-fit mt-2 mr-10 text-dark-navy divide-y-[1px]">
        <div className="flex gap-2">
          <Link to="profile">
            <UserAvatar className="w-20 h-full " imageUrl={userData?.image || ""} name={userData?.name || "User"} />
          </Link>
          <div>
            <Badge className="text-xs bg-royal-blue/15 hover:bg-royal-blue/15 text-royal-blue">{userData?.role}</Badge>
            <Link to="/profile" className="text-lg font-semibold block">
              {userData?.name}
            </Link>
            <p className="text-sm text-zinc-500">{userData?.email || "example@gmail.com"}</p>
          </div>
        </div>
        <div className=" space-y-2 pt-3">
          <Link
            to="/chat/learnovate-assistant"
            className="transition-colors flex items-center gap-2 font-semibold hover:text-zinc-600 "
          >
            <MdOutlineChat size={22} />
            Ai Assistant
          </Link>
          <Link
            to="/profile/edit"
            className="transition-colors flex items-center gap-2 font-semibold hover:text-zinc-600 "
          >
            <TbEdit size={22} />
            Edit Profile
          </Link>
          <Link
            to="/privacy-policy"
            className="transition-colors flex items-center gap-2 font-semibold hover:text-zinc-600 "
          >
            <MdOutlinePolicy size={22} />
            Privacy Policy
          </Link>
        </div>
        <button
          className="text-left transition-colors flex pt-3 items-center gap-2 font-semibold hover:text-zinc-600 "
          onClick={logout}
        >
          <TbLogout size={22} />
          Logout
        </button>
      </PopoverContent>
    </Popover>
  );
}

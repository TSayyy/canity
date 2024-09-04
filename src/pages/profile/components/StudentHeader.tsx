import { useNavigate } from "react-router-dom";

import bgImage from "@/assets/studentHeader.png";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";

export function StudentHeader({ name, id, studentImage }: { name: string; id: string; studentImage: string }) {
  const navigate = useNavigate();
  return (
    <header className="relative py-3 flex items-end min-h-[calc(24rem-85px)] md:mb-20 bg-dark-navy/50">
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className=" absolute inset-0 -z-10 bg-no-repeat  bg-dark-navy bg-cover bg-center after:content-[''] after:top-0 after:left-0 after:absolute after:-z-1 after:w-full  after:h-[20%]  after:bg-gradient-to-b after:from-dark-navy after:via-dark-navy/20"
      />

      <main className="container text-white flex flex-col md:flex-row justify-center md:justify-start md:items-center gap-3 md:translate-y-20">
        <UserAvatar
          imageUrl={studentImage}
          name={name}
          className="w-36 h-36 md:w-52 md:h-52 border-white border-8 bg-zinc-400"
        />
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end sm:justify-between md:grow">
          <div>
            <span className="text-sm text-zinc-200">#{id}</span>
            <h1 className="text-2xl font-semibold">{name}</h1>
          </div>
          <Button onClick={() => navigate("/profile/edit")}>Edit Profile</Button>
        </div>
      </main>
    </header>
  );
}

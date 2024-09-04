import { Link } from "react-router-dom";

import { UserAvatar } from "@/components/ui/UserAvatar";
import { Badge } from "@/components/ui/badge";

// import { useGetData } from "@/hooks/useApi";

type TViewerHeader = {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
};

export const MeHeader = ({ name, jobTitle, description, image }: TViewerHeader) => {
  return (
    <header className="w-full">
      <div className="w-full relative">
        <div className="z-0 text-dark-navy py-12">
          <div className="container h-full flex gap-x-10 gap-y-4 flex-col sm:flex-row sm:items-center">
            <div className="w-fit shadow-xl rounded-full overflow-hidden border-[0.3rem] border-white pt-2 bg-gray-400/80">
              <UserAvatar imageUrl={image} name={name} className="h-52 w-52 sm:w-auto max-h-72 object-cover" />
            </div>
            <div className="h-full flex flex-col justify-center sm:gap-2.5">
              <Badge variant="outline" className="w-fit border-royal-blue text-royal-blue px-4">
                Mentor
              </Badge>
              <h1 className="font-semibold text-3xl xs:text-4xl md:text-5xl text-pretty">{name}</h1>
              <h2 className="font-medium text-xl text-pretty">
                {jobTitle ? jobTitle : <span className=" text-zinc-400 text-lg"> Jop title is not provided</span>}
              </h2>
              <p className="max-w-lg text-balance text-dark-navy/90">
                {description ? (
                  description
                ) : (
                  <span className=" text-zinc-400 text-lg"> description is not provided</span>
                )}
              </p>
              <Link to="edit" className="w-fit text-royal-blue font-medium hover:underline underline-offset-2">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

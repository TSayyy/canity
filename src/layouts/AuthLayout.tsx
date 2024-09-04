import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import person00 from "@/assets/auth/person00.webp";
import person01 from "@/assets/auth/person01.webp";
import person02 from "@/assets/auth/person02.webp";
import person03 from "@/assets/auth/person03.webp";
import person04 from "@/assets/auth/person04.webp";
import logoInlineDark from "@/assets/logo-inline-dark.webp";
import logoInline from "@/assets/logo-inline.webp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AVATAR_GROUP = [
  { id: uuid(), src: person00, alt: "John Doe" },
  { id: uuid(), src: person01, alt: "Jane Doe" },
  { id: uuid(), src: person02, alt: "John Doe" },
  { id: uuid(), src: person03, alt: "Jane Doe" },
  { id: uuid(), src: person04, alt: "John Doe" },
];

type TAuthLayoutProps = {
  children: ReactNode;
  title: string;
  subTitle: string;
};

export function AuthLayout({ children, title, subTitle }: TAuthLayoutProps) {
  return (
    <main className="w-full flex">
      <div className="flex-1 flex items-center justify-center h-screen bg-white">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-dark-navy sm:px-0">
          <div>
            <Link to="/" className="lg:hidden">
              <img src={logoInlineDark} alt="Coursanity" title="Coursanity" className="w-52" />
            </Link>
            <div className="mt-5 space-y-2">
              <h3 className="text-2xl font-bold sm:text-3xl">{title}</h3>
              <p>{subTitle}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
      <div className="relative overflow-hidden flex-1 hidden items-center justify-center h-screen bg-dark-navy lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <Link to="/">
            <img src={logoInline} alt="Coursanity" title="Coursanity" className="w-52" loading="lazy" />
          </Link>
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">Start growing your skills quickly</h3>
            <p className="text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus assumenda aliquam deserunt dolores velit
              sapiente praesentium aperiam sint.
            </p>
            <div className="flex">
              <ul className="flex -space-x-2">
                {AVATAR_GROUP.map((avatar) => (
                  <Avatar key={avatar.id} className="border-2 border-royal-blue">
                    <AvatarImage src={avatar.src} alt={avatar.alt} title={avatar.alt} />
                    <AvatarFallback>{avatar.alt.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                ))}
                <Avatar className="border-2 border-royal-blue font-bold">
                  <AvatarFallback>{"+14"}</AvatarFallback>
                </Avatar>
              </ul>
              <div className="ms-2 hidden flex-col justify-center whitespace-nowrap text-white -space-y-2 md:flex">
                <span>are in</span>
                <span>one place</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(52, 152, 219, 0.2) 4.54%, rgba(9, 136, 222, 0.4) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
    </main>
  );
}

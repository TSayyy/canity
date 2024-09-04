import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Hero from "@/assets/home/landing-page.png";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";

export default function HeroSection() {
  const isAuth = useSelector((state: RootState) => state.auth.authStatus);
  const navigate = useNavigate();
  return (
    <section className="relative flex justify-start items-center py-24 md:min-h-[calc(100dvh-82px)] min-h-[calc(100dvh-77px)] bg-gradient-to-b from-dark-navy via-dark-navy/90 to-dark-navy/80 md:from-transparent md:to-transparent md:via-transparent md:bg-dark-navy ">
      <div
        style={{
          backgroundImage: `url(${Hero})`,
        }}
        className="hidden md:block bg-dark-navy inset-0 absolute bg-cover bg-right bg-no-repeat after:content-[''] after:top-0 after:left-0 after:absolute after:-z-1 after:w-full xl:after:h-[30%] after:h-[60%]  after:bg-gradient-to-b after:from-dark-navy after:via-dark-navy/50 "
      />
      <main className="container text-white text-center md:text-left grid gap-5 xs:gap-8 z-20">
        <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold ">
          <span className="block">Choose your </span>
          <span className="block">
            <span className=" text-royal-blue">tech</span> road with
          </span>
          <span className="block"> industry experts </span>
        </h1>
        <p className="md:w-2/3 text-balance leading-6 max-w-[750px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis elit a arcu laoreet cursus eu sit amet
          ipsum.{" "}
        </p>
        <div className="md:w-1/4 md:max-w-48 min-w-36">
          <Button
            size={"lg"}
            onClick={() => {
              if (isAuth) {
                navigate("/mentors");
                return;
              }
              navigate("/auth/login");
            }}
            className="w-full text-lg rounded-xl"
          >
            Get Start
          </Button>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 justify-center md:justify-start sm:gap-4">
          <AppStoreButton />
          <PlayStoreButton />
        </div>
      </main>
    </section>
  );
}

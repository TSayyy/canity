import { BiErrorAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { Button } from "./button";

export function SomethingWentWrong() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center h-[calc(100dvh-100px)]">
      <BiErrorAlt className="w-32 h-32 text-royal-blue" />
      <h1 className="text-4xl font-semibold text-zinc-700 ">Something went wrong</h1>
      <p className="text-2xl font-semibold  text-zinc-600">Please try again later...</p>
      <div className=" grid">
        <Button size={"lg"} onClick={() => navigate("/")} className="text-lg">
          Head to home
        </Button>
        <Button variant="link">Refresh</Button>
      </div>
    </div>
  );
}

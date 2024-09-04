import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function RoadmapError() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-10 justify-center text-white items-center min-h-[50vh] bg-dark-navy py-20 p-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl  font-semibold tracking-tight leading-normal text-balance text-center">
        Something went wrong while generating <br />
        your roadmap
      </h2>
      <p className=" text-lg text-mint-green font-medium">Please try again or contact support</p>
      <div className=" flex justify-center items-center gap-5">
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => window.location.reload()}
          className=" text-royal-blue bg-transparent border-royal-blue hover:text-white hover:bg-royal-blue"
        >
          reload
        </Button>
        <Button
          size={"lg"}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
}

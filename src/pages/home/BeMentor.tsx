import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button_";
import { RootState } from "@/redux/store";

import mentor from "../../assets/home/Mentor.png";

export function BeMentor() {
  const navigate = useNavigate();
  const userRole = useSelector((state: RootState) => state.auth.role);

  if (userRole === "mentor") return null;
  return (
    <section className="container mb-20 flex flex-col md:flex-row gap-5 justify-evenly items-center">
      <aside className="md:max-w-96 max-w-72">
        <img src={mentor} alt="" className="" />
      </aside>
      <aside className=" max-w-96 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-dark-navy">
          Be a <span className="text-royal-blue">Mentor</span>
        </h1>
        <p className="leading-6  text-neutral-gray ">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus!{" "}
        </p>
        <div className="inline">
          <Button text="Be a mentor" type="button" onClick={() => navigate("/be-a-mentor")} />
        </div>
      </aside>
    </section>
  );
}

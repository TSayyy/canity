import toast from "react-hot-toast";
import { IoCheckmark } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";

type PricingCardProps = {
  name: string;
  description: string;
  price: number;
  features: string[];
  className?: string;
};

export function PricingCard({ name, description, price, features, className }: PricingCardProps) {
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.authStatus);

  const handleUpgrade = () => {
    if (!authStatus) {
      toast.error("Please login to add to wishlist");
      navigate("/auth/login");
      return;
    }
  };
  return (
    <div
      className={twMerge(
        "  py-10 grid lg:grid-cols-2 gap-5  rounded-xl  font-poppins grow bg-dark-navy text-white",
        className
      )}
    >
      <section className="container grid gap-2">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold capitalize" title={name}>
            {name}
          </h1>
        </header>
        <p className=" text-zinc-300">{description}</p>
        <p>
          <span className="text-2xl font-semibold"> ${price}</span> /per month
        </p>
        <Button className="w-full" onClick={handleUpgrade}>
          Upgrade now
        </Button>
      </section>
      <section className=" border-t-2 py-5 lg:py-0 lg:border-t-0 lg:border-l-2 border-zinc-400  container ">
        <h2 className="text-2xl font-[500] place mb-3 ">Features</h2>
        <ul className="grid gap-3">
          {features.map((feature, index) => (
            <li className="flex gap-2 items-center" key={index} title={feature}>
              <span
                className={`w-5 h-5 transition-colors duration-30 border-2 grid place-content-center text-white rounded-full bg-royal-blue border-royal-blue`}
              >
                <IoCheckmark size={15} className=" stroke-2" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

import { FaArrowRight } from "react-icons/fa";

export function SubscribeEmailInput() {
  return (
    <div className="flex overflow-hidden rounded-md max-w-64 w-full">
      <input type="text" placeholder="Email" className="text-dark-navy grow p-2 w-0 outline-none" />
      <button className="bg-royal-blue py-2 px-3 ">
        <FaArrowRight size={18} />
      </button>
    </div>
  );
}

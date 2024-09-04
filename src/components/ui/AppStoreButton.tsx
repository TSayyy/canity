import { FaApple } from "react-icons/fa";

export function AppStoreButton() {
  return (
    <button className="md:bg-dark-navy/30 p-2  border-[1px] min-w-40 border-white rounded-lg flex justify-center items-center gap-4">
      <FaApple size={35} />
      <div className="text-left">
        <p className="text-[10px]">Download on the</p>
        <h1 className="font-semibold">App Store</h1>
      </div>
    </button>
  );
}

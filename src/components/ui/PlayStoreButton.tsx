import { GooglePlayLogo } from "../icons/GooglePlayLogo";

export function PlayStoreButton() {
  return (
    <button className="md:bg-dark-navy/30 p-2 border-[1px] min-w-40 border-white rounded-lg flex justify-center items-center gap-4">
      <span className="w-10 aspect-square">
        <GooglePlayLogo />
      </span>
      <div className="text-left">
        <p className="text-xs">GET IT ON</p>
        <h1 className="font-semibold">Google Play</h1>
      </div>
    </button>
  );
}

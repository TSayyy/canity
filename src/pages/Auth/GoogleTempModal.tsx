import { useEffect, useRef } from "react";

import google from "@/assets/auth/google.jpg";

type TGoogleTempModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export function GoogleTempModal({ isModalOpen, setIsModalOpen }: TGoogleTempModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setIsModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full overflow-hidden justify-center items-center z-30">
      <div className="container backdrop-blur-sm filter w-full h-full flex justify-center items-center">
        <div
          ref={ref}
          className="container bg-white w-fit text-dark-navy py-8 rounded-md flex flex-col items-center text-center"
        >
          <h2 className="text-5xl font-bold whitespace-nowrap mb-4">Oops ...</h2>
          <p className="text-balance">Our Backend is not ready yet, so we can't provide Google Auth for now.</p>
          <p className="text-balance">But you can still use our app by registering with your email and password.</p>
          <img src={google} alt="google" className="h-96 mt-4" title="funny meme about our backend" />
        </div>
      </div>
    </div>
  );
}

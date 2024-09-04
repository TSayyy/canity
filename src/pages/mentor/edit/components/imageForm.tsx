import { clsx } from "clsx";
import { ChangeEvent, useState } from "react";

import tempImage from "@/assets/mentors/Muhammad-Emara.webp";

export const ImageForm = () => {
  const [image, setImage] = useState(tempImage);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  };

  return (
    <form className="flex justify-center xl:justify-start">
      <div className="w-fit h-fit">
        <label htmlFor="image" className="">
          <div
            className={clsx("bg-white w-fit rounded-full cursor-pointer border-2 border-white/40 p-1 shadow-lg", {
              "opacity-60 cursor-not-allowed": loading,
            })}
            title="Change Profile Picture"
          >
            <img src={image} alt="robot" className="w-40 h-40 rounded-full" />
          </div>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
        </label>
      </div>
    </form>
  );
};

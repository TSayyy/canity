import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { IoCamera } from "react-icons/io5";

import { cn } from "@/lib/utils";

export const ImageUploader = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, ...props }: ControllerRenderProps<FieldValues> & { className?: string }, _ref) => {
    const hiddenInputRef = useRef<HTMLInputElement>();
    const urlImage = props.value
      ? typeof props.value === "string"
        ? props.value
        : URL.createObjectURL(props.value)
      : null;
    const [preview, setPreview] = useState<string | null>(urlImage);
    const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files === null) return;
      const file = event.target.files[0];
      props.onChange(file);
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
    };

    const onUpload = () => {
      if (hiddenInputRef.current) hiddenInputRef?.current?.click();
    };

    useEffect(() => {
      const urlImage = props.value
        ? typeof props.value === "string"
          ? props.value
          : URL.createObjectURL(props.value)
        : null;
      setPreview(urlImage);
    }, [props.value]);

    return (
      <div
        title="Upload Image"
        onClick={onUpload}
        className={cn(
          "rounded-full flex justify-center items-center overflow-hidden cursor-pointer relative w-20 h-20 shrink-0 aspect-square border-[0.1rem] bg-zinc-200 outline-none",
          className
        )}
      >
        {preview ? <img src={preview} alt="uploaded Image" /> : <IoCamera className=" w-1/3 h-full" />}
        <input
          {...props}
          type="file"
          onChange={handleUploadedFile}
          ref={(e) => {
            hiddenInputRef.current = e as HTMLInputElement;
          }}
          accept="image/*"
          value={""} // Set value to props.value?.name
          className=" absolute hidden cursor-pointer w-24 h-24"
        />
      </div>
    );
  }
);

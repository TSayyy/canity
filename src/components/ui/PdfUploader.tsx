import { forwardRef, useRef } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FiDownload } from "react-icons/fi";

import { Input } from "./input";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PdfUploader = forwardRef((props: ControllerRenderProps<FieldValues>, _ref) => {
  const hiddenInputRef = useRef<HTMLInputElement>();

  const onUpload = () => {
    if (hiddenInputRef.current) hiddenInputRef?.current?.click();
  };

  return (
    <div
      onClick={onUpload}
      className="rounded-lg flex gap-4  border-[0.1rem] border-zinc-400 bg-transparent py-1.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
    >
      <FiDownload size={22} />
      <label>{props.value?.name ? props.value?.name : "Add File"}</label>
      <Input
        {...props}
        type="file"
        onChange={(e) => {
          if (e?.target?.files) props.onChange(e?.target?.files[0]);
        }}
        ref={(e) => {
          hiddenInputRef.current = e as HTMLInputElement;
        }}
        accept="application/pdf,application/vnd.ms-excel"
        value={""} // Set value to props.value?.name
        className=" absolute hidden cursor-pointer w-24 h-24"
      />
    </div>
  );
});

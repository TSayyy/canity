import { IoCheckmark } from "react-icons/io5";

type OptionsProps = {
  option: string;
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
  disabled?: boolean;
};
export function Option({ option, value, onChange, checked, disabled }: OptionsProps) {
  return (
    <div
      className="flex justify-start items-center gap-3 cursor-pointer"
      onClick={() => {
        if (disabled) return;
        onChange(value);
      }}
    >
      <span
        className={`w-7 h-7 transition-colors duration-30 border-2 grid place-content-center border-royal-blue text-white rounded-full ${checked && "bg-royal-blue "}`}
      >
        <IoCheckmark size={20} className=" stroke-2 text-zinc-200" />
      </span>
      <span className=" font-semibold text-black text-md">{option}</span>
    </div>
  );
}

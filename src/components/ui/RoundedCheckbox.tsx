import { IoCheckmark } from "react-icons/io5";

type RoundedCheckboxProps = {
  className?: string;
  onChange: (value: string) => void;
  checked: boolean;
  label: string;
  value?: string;
};

export default function RoundedCheckbox({ className, onChange, checked, label, value }: RoundedCheckboxProps) {
  return (
    <div
      className={
        " flex justify-center select-none items-center gap-2 pl-1 pr-3 py-1 border-2 border-gray-300 rounded-full cursor-pointer " +
        className?.toString()
      }
      onClick={() => onChange(value || label.toLowerCase())}
    >
      <span
        className={`w-5 h-5 transition-colors duration-30 border-2 grid place-content-center text-white rounded-full ${checked && "bg-royal-blue border-royal-blue"}`}
      >
        <IoCheckmark size={15} className=" stroke-2" />
      </span>
      <span className=" text-gray-500 text-sm">{label}</span>
    </div>
  );
}

import { HiXMark } from "react-icons/hi2";

type MultiSelectionProps = {
  options: string[];
  selectedOptions: string[];
  onChange: (value: string) => void;
  onDeletion: (value: string) => void;
  className?: string;
};

export function MultiSelection({
  options,
  selectedOptions,
  onChange,
  onDeletion,
  className = "",
}: MultiSelectionProps) {
  const isSelected = (option: string) => selectedOptions.includes(option);
  const handleSelection = (option: string) => {
    if (selectedOptions.includes(option)) {
      onDeletion(option);
    } else {
      onChange(option);
    }
  };
  return (
    <div className={"flex gap-1 flex-wrap" + className}>
      {options.map((option) => (
        <div
          key={option}
          className={`cursor-pointer px-2 py-1.5 text-sm flex justify-center items-center gap-1 transition-all duration-300 border-2 rounded-lg ${isSelected(option) ? "bg-royal-blue border-royal-blue text-white" : "hover:bg-gray-100 border-gray-300 text-gray-500"}`}
          onClick={() => handleSelection(option)}
        >
          <span className=" select-none">{option}</span>
          {selectedOptions.includes(option) && (
            <span className="h-full w-fit">
              <HiXMark size={20} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

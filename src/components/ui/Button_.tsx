import { Spinner } from "./Spinner";

type TButtonProps = {
  type: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

export function Button({ type, text, onClick, disabled, isLoading, className }: TButtonProps) {
  return (
    <button
      type={type}
      className={
        "flex w-full items-center justify-center space-x-2 rounded-xl bg-royal-blue p-2.5 font-medium text-white transition-colors duration-300 ease-cubic hover:bg-royal-blue/90 " +
        (className ? ` ${className}` : "")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && <Spinner className="h-6 w-6 stroke-white" />}
      <span>{text}</span>
    </button>
  );
}

import { RxCheckCircled } from "react-icons/rx";

type TFormSuccessProps = {
  message?: string;
};

export function FromSuccess({ message }: TFormSuccessProps) {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <RxCheckCircled />
      <p>{message}</p>
    </div>
  );
}

type TFieldErrorProps = {
  message: string | undefined;
};

export function FieldError({ message }: TFieldErrorProps) {
  return <p className="text-sm font-medium text-red-500">{message}</p>;
}

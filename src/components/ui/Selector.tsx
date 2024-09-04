import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectorProps = {
  className?: string;
  options: string[];
  onChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
};

export default function Selector({ className, options, onChange, defaultValue, placeholder }: SelectorProps) {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

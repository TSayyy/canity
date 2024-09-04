import { IoMdSearch } from "react-icons/io";

type TSearchBarProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ className, value, onChange }: TSearchBarProps) {
  return (
    <div
      className={
        "flex items-center px-2 sm:px-4 py-1 w-full rounded-lg transition-color duration-300 has-[:focus]:ring-royal-blue has-[:focus]:ring-2 " +
        className
      }
    >
      <IoMdSearch size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="bg-transparent grow px-2 w-0 py-1 rounded-lg focus:outline-none"
      />
    </div>
  );
}

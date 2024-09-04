import { Checkbox } from "@radix-ui/react-checkbox";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { COUNTRIES } from "@/db/Countries";

import { SearchBar } from "./SearchBar";
import { ScrollArea } from "./scroll-area";

type CountryBickerProps = {
  onChange: (value: string) => void;
  className?: string;
  countriesAreaClassName?: string;
};

export function CountryBicker({ onChange, className = "", countriesAreaClassName = "" }: CountryBickerProps) {
  const [searchValue, setSearchValue] = useState("");

  const usedCountries = COUNTRIES.filter((country) => country.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className={twMerge("p-2 rounded-xl min-w-56 border-2", className)}>
      <SearchBar
        className="border-2 mb-2 text-gray-400"
        onChange={(value) => setSearchValue(value)}
        value={searchValue}
      />
      <ScrollArea className={twMerge("h-48 px-1", countriesAreaClassName)}>
        {usedCountries.map((country, index) => (
          <div
            key={index}
            className="flex gap-2 my-1 items-center transition-colors duration-150 rounded-xl hover:bg-gray-100"
          >
            <Checkbox
              id={country.name}
              onCheckedChange={() => onChange(country.name)}
              title={country.name}
              className=" w-5 h-5 border-gray-400 border-2 bg-white rounded-md data-[state=checked]:bg-royal-blue data-[state=checked]:border-transparent"
            />
            <label htmlFor={country.name} className="flex items-center gap-1">
              <span>
                <img src={country.image} alt={country.name} title={country.name} className="h-5" loading="lazy" />{" "}
              </span>
              {country.name}
            </label>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

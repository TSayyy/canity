import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button_";
import { FilterTemplate } from "@/components/ui/FilterTemplate";
import { KeyWordsForm } from "@/components/ui/KeywordsForm";
import { MultiSelection } from "@/components/ui/MultiSelection";
import { RatingInput } from "@/components/ui/RatingInput";
import RoundedCheckbox from "@/components/ui/RoundedCheckbox";
import RangeSlider from "@/components/ui/rangeSlider/RangeSlider";
import { formatCurrency } from "@/utils/helpers";

const levels = ["Beginner", "Intermediate", "Advanced"];
const TimesRanges = ["1-2 hours", "3-6 hours", "6-12 hours", "1-2 days", "3-6 days", "1-2 week"];

type FilterCoursesFormProps = {
  onCloseModal?: () => void;
  defaultChaptersRange: number[];
  defaultPricesRange: number[];
};

export function FilterCoursesForm({ onCloseModal, defaultChaptersRange, defaultPricesRange }: FilterCoursesFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedLevels, setSelectedLevels] = useState<string[]>(searchParams.get("levels")?.split(",") || []);
  const [keywords, setKeywords] = useState<string[]>(searchParams.get("keywords")?.split(",") || []);
  const [priceRange, setPriceRange] = useState<number[]>(
    searchParams
      .get("time")
      ?.split(",")
      .map((item) => Number(item)) || defaultPricesRange
  );
  const [timeRange, setTimeRange] = useState<string[]>(searchParams.get("time")?.split(",") || []);
  const [rating, setRating] = useState(searchParams.get("rating") ? Number(searchParams.get("rating")) : 0);
  const [chaptersRange, setChaptersRange] = useState<number[]>(
    searchParams
      .get("chapters")
      ?.split(",")
      .map((item) => Number(item)) || defaultChaptersRange
  );

  const handleLevelChange = (value: string) => {
    if (selectedLevels.includes(value)) {
      setSelectedLevels(selectedLevels.filter((level) => level !== value));
    } else {
      setSelectedLevels([...selectedLevels, value]);
    }
  };

  const handleKeywordDeletion = (keyword: string) => {
    setKeywords(keywords.filter((word) => word !== keyword));
  };
  const handleKeywordAddition = (keyword: string) => {
    setKeywords([...keywords, keyword]);
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
    }
  };
  const handleChaptersRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setChaptersRange(value);
    }
  };

  const handleReset = () => {
    setSelectedLevels([]);
    setKeywords([]);
    setPriceRange(defaultPricesRange);
    setTimeRange([]);
    setRating(0);
    setChaptersRange(defaultChaptersRange);
  };

  const handleApplyFilters = () => {
    if (selectedLevels.length > 0) searchParams.set("levels", selectedLevels.join(","));
    else searchParams.delete("levels");

    if (keywords.length > 0) searchParams.set("keywords", keywords.join(","));
    else searchParams.delete("keywords");

    if (priceRange[0] !== defaultPricesRange[0] || priceRange[1] !== defaultPricesRange[1])
      searchParams.set("price", priceRange.join(","));
    else searchParams.delete("price");

    if (timeRange.length > 0) searchParams.set("time", timeRange.join(","));
    else searchParams.delete("time");

    if (rating > 0) searchParams.set("rating", rating.toString());
    else searchParams.delete("rating");

    if (chaptersRange[0] !== defaultChaptersRange[0] || chaptersRange[1] !== defaultChaptersRange[1])
      searchParams.set("chapters", chaptersRange.join(","));
    else searchParams.delete("chapters");

    searchParams.set("page", "1");
    setSearchParams(searchParams, { replace: true });
    onCloseModal && onCloseModal();
  };
  useEffect(() => {
    setPriceRange(defaultPricesRange);
    setChaptersRange(defaultChaptersRange);
  }, [defaultPricesRange, defaultChaptersRange]);
  return (
    <div className="flex flex-col  gap-2 xl:min-w-[40rem] 3xl:min-w-[50rem] ">
      <FilterTemplate header="Level">
        <div className="flex gap-2 flex-wrap">
          {levels.map((level, index) => (
            <RoundedCheckbox
              key={index}
              label={level}
              checked={selectedLevels.includes(level)}
              onChange={handleLevelChange}
              value={level}
            />
          ))}
        </div>
      </FilterTemplate>

      <FilterTemplate header="Keywords">
        <KeyWordsForm keywords={keywords} onAddition={handleKeywordAddition} onDeletion={handleKeywordDeletion} />
      </FilterTemplate>

      <FilterTemplate header="Price">
        <div className="max-w-[28rem]">
          <RangeSlider
            min={defaultPricesRange[0]}
            max={defaultPricesRange[1]}
            values={priceRange}
            onChange={handlePriceRangeChange}
            leftLabel={formatCurrency(priceRange[0])}
            rightLabel={formatCurrency(priceRange[1])}
          />
        </div>
      </FilterTemplate>

      <FilterTemplate header="Time to finish">
        <MultiSelection
          options={TimesRanges}
          selectedOptions={timeRange}
          onChange={(value) => setTimeRange([...timeRange, value])}
          onDeletion={(value) => setTimeRange(timeRange.filter((time) => time !== value))}
        />
      </FilterTemplate>

      <FilterTemplate header="Rating">
        <RatingInput onSetRating={(rate) => setRating(rate)} size={30} rating={rating} />
      </FilterTemplate>

      <FilterTemplate header="number of chapters">
        <div className="max-w-[28rem]">
          <RangeSlider
            min={defaultChaptersRange[0]}
            max={defaultChaptersRange[1]}
            values={chaptersRange}
            onChange={handleChaptersRangeChange}
            leftLabel={`${chaptersRange[0]}`}
            rightLabel={`${chaptersRange[1]}`}
          />
        </div>
      </FilterTemplate>

      <footer className="w-full flex justify-between md:justify-end gap-2 mt-3 ">
        <button className="text-royal-blue text-lg rounded-lg px-4 py-2 whitespace-nowrap " onClick={handleReset}>
          clear all
        </button>
        <Button
          className=" max-w-fit px-4 whitespace-nowrap"
          type="button"
          text="Show Results"
          onClick={handleApplyFilters}
        />
      </footer>
    </div>
  );
}

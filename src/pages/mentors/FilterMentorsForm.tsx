import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button_";
import { CountryBicker } from "@/components/ui/CountryBicker";
import { FilterTemplate } from "@/components/ui/FilterTemplate";
import { KeyWordsForm } from "@/components/ui/KeywordsForm";
import { MultiSelection } from "@/components/ui/MultiSelection";
import { RatingInput } from "@/components/ui/RatingInput";
import RangeSlider from "@/components/ui/rangeSlider/RangeSlider";
import { Skeleton } from "@/components/ui/skeleton";
import { useTracks } from "@/hooks/useTracks";
import { formatCurrency } from "@/utils/helpers";

type FilterCoursesFormProps = {
  onCloseModal?: () => void;
  defaultExperienceRange: number[];
  defaultPricesRange: number[];
};

export function FilterMentorsFrom({
  onCloseModal,
  defaultExperienceRange,
  defaultPricesRange,
}: FilterCoursesFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // const [selectedLevels, setSelectedLevels] = useState<string[]>(searchParams.get("levels")?.split(",") || []);
  const tracks = useTracks()?.map((track) => track.name);
  const [selectedTracks, setSelectedTrack] = useState<string[]>(searchParams.get("tracks")?.split(",") || []);
  const [skills, setSkills] = useState<string[]>(searchParams.get("skills")?.split(",") || []);
  const [hourlyRate, setHourlyRate] = useState<number[]>(
    searchParams
      .get("hourlyRate")
      ?.split(",")
      .map((item) => Number(item)) || defaultPricesRange
  );
  const [rating, setRating] = useState(searchParams.get("rating") ? Number(searchParams.get("rating")) : 0);
  const [experienceRange, setExperienceRange] = useState<number[]>(
    searchParams
      .get("experience")
      ?.split(",")
      .map((item) => Number(item)) || defaultExperienceRange
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>(searchParams.get("countries")?.split(",") || []);

  const handleSkillDeletion = (skill: string) => {
    setSkills(skills.filter((word) => word !== skill));
  };

  const handleSkillAddition = (skill: string) => {
    setSkills([...skills, skill]);
  };

  const handleHourlyRateChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setHourlyRate(value);
    }
  };

  const handleExperienceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setExperienceRange(value);
    }
  };

  const handleCountryChange = (value: string) => {
    if (selectedCountries.includes(value)) {
      setSelectedCountries(selectedCountries.filter((country) => country !== value));
    } else {
      setSelectedCountries([...selectedCountries, value]);
    }
  };

  const handleReset = () => {
    setSelectedTrack(() => []);
    setSkills(() => []);
    setHourlyRate(() => defaultPricesRange);
    setSelectedCountries(() => []);
    setRating(() => 0);
    setExperienceRange(() => defaultExperienceRange);
  };

  const handleApplyFilters = () => {
    if (selectedTracks.length > 0) searchParams.set("tracks", selectedTracks.join(","));
    else searchParams.delete("tracks");

    if (skills.length > 0) searchParams.set("skills", skills.join(","));
    else searchParams.delete("skills");

    if (hourlyRate[0] !== defaultPricesRange[0] || hourlyRate[1] !== defaultPricesRange[1])
      searchParams.set("hourlyRate", hourlyRate.join(","));
    else searchParams.delete("hourlyRate");

    if (selectedCountries.length > 0) searchParams.set("countries", selectedCountries.join(","));
    else searchParams.delete("countries");

    if (rating > 0) searchParams.set("rating", rating.toString());
    else searchParams.delete("rating");

    if (experienceRange[0] !== defaultExperienceRange[0] || experienceRange[1] !== defaultExperienceRange[1])
      searchParams.set("experience", experienceRange.join(","));
    else searchParams.delete("experience");

    searchParams.set("page", "1");
    setSearchParams(searchParams, { replace: true });
    onCloseModal && onCloseModal();
  };

  useEffect(() => {
    setHourlyRate(
      searchParams
        .get("hourlyRate")
        ?.split(",")
        .map((item) => Number(item)) || defaultPricesRange
    );
    setExperienceRange(
      searchParams
        .get("experience")
        ?.split(",")
        .map((item) => Number(item)) || defaultExperienceRange
    );
  }, [defaultPricesRange, defaultExperienceRange, searchParams]);
  return (
    <div className="flex flex-col justify-between  min-w-min gap-2  ">
      <main className="lg:p-4 rounded-xl flex flex-col gap-3 lg:shadow-xl lg:border-[1px] grow">
        <FilterTemplate header="Tracks">
          {tracks?.length ? (
            <MultiSelection
              options={tracks}
              selectedOptions={selectedTracks}
              onChange={(option) => setSelectedTrack((prev) => [...prev, option])}
              onDeletion={(option) => setSelectedTrack((prev) => prev.filter((track) => track !== option))}
            />
          ) : (
            <div className="flex gap-3 flex-wrap">
              {Array.from({ length: 8 }, (_, index) => (
                <Skeleton key={index} className="w-28 h-8 rounded-lg" />
              ))}
            </div>
          )}
        </FilterTemplate>

        <FilterTemplate header="Skills">
          <KeyWordsForm keywords={skills} onAddition={handleSkillAddition} onDeletion={handleSkillDeletion} />
        </FilterTemplate>

        <FilterTemplate header="Hourly Rate">
          <div className="max-w-[28rem]">
            <RangeSlider
              min={defaultPricesRange[0]}
              max={defaultPricesRange[1]}
              values={hourlyRate}
              onChange={handleHourlyRateChange}
              leftLabel={formatCurrency(hourlyRate[0])}
              rightLabel={formatCurrency(hourlyRate[1])}
            />
          </div>
        </FilterTemplate>

        <FilterTemplate header="Rating">
          <RatingInput onSetRating={(rate) => setRating(rate)} size={30} rating={rating} />
        </FilterTemplate>

        <FilterTemplate header="Experience in years">
          <div className="max-w-[28rem]">
            <RangeSlider
              min={defaultExperienceRange[0]}
              max={defaultExperienceRange[1]}
              values={experienceRange}
              onChange={handleExperienceRangeChange}
              leftLabel={`${experienceRange[0]}`}
              rightLabel={`${experienceRange[1]}`}
            />
          </div>
        </FilterTemplate>
        <FilterTemplate header="Country">
          <div className="max-w-[28rem]">
            <CountryBicker onChange={handleCountryChange} />
          </div>
        </FilterTemplate>
      </main>

      <footer className="w-full grid grid-cols-2  gap-2 mt-3 ">
        <button className="text-royal-blue text-lg rounded-lg px-4 py-2 whitespace-nowrap " onClick={handleReset}>
          clear all
        </button>
        <Button className="px-4 whitespace-nowrap" type="button" text="Show Results" onClick={handleApplyFilters} />
      </footer>
    </div>
  );
}

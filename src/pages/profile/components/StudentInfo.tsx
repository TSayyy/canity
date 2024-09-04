import { differenceInCalendarYears, format } from "date-fns";

import { Skeleton } from "@/components/ui/skeleton";
import { COUNTRIES } from "@/db/Countries";

type StudentInfoProps = {
  bio: string | null | undefined;
  dob: Date | null | undefined;
  country: string | undefined | null;
  city: string | undefined | null;
};

export function StudentInfo({ bio, dob, country, city }: StudentInfoProps) {
  const countryImage =
    (country && COUNTRIES.find((COUNTRY) => COUNTRY.name.toLocaleLowerCase() === country.toLocaleLowerCase())?.image) ||
    "";
  return (
    <section className="space-y-2.5 rounded-md container shadow-custom py-4">
      <div className="space-y-1">
        <h4 className="font-medium text-xl text-pretty">Bio:</h4>
        {bio ? (
          <p className="text-balance text-zinc-700 max-w-2xl">{bio}</p>
        ) : (
          <span className="text-zinc-400">you do not have a bio yet...</span>
        )}
      </div>
      <div className="space-y-1">
        <h4 className="font-medium text-xl text-pretty">Date of birth:</h4>
        {dob ? (
          <p className="text-balance text-zinc-700 max-w-2xl">
            {format(dob, "dd/MM/yyyy")} - {differenceInCalendarYears(new Date(), dob)} years old
          </p>
        ) : (
          <span className="text-zinc-400">Date of birth is not provided</span>
        )}
      </div>
      <div className="space-y-1">
        <h4 className="font-medium text-xl text-pretty">Location:</h4>
        {location ? (
          <p className="text-balance flex items-center gap-2 text-zinc-700 max-w-2xl">
            {country ? (
              <>
                <span>
                  <img
                    src={countryImage}
                    alt={country}
                    title={country}
                    className="h-5"
                    loading="lazy"
                    onError={(e) => e.currentTarget.remove()}
                  />
                </span>
                <span>{city ? `${city}, ${country}` : country}</span>
              </>
            ) : (
              <span className="text-zinc-400">Location is not provided</span>
            )}
          </p>
        ) : (
          <Skeleton className="w-full max-w-2xl h-6 " />
        )}
      </div>
    </section>
  );
}

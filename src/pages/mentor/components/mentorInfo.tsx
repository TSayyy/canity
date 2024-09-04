import { COUNTRIES } from "@/db/Countries";

import { RatingStars } from "./stars";

const NotProvided = () => {
  return <span className="text-zinc-400">Not provided yet</span>;
};
type TMentorInfo = {
  workExperience: string;
  education: string;
  experience: string | number;
  rating: number;
  resume: string;
  languages: string[];
  country: string | undefined | null;
  city: string | undefined | null;
  timeZones: string;
};

export const MentorInfo = ({
  workExperience,
  education,
  experience,
  rating,
  resume,
  languages,
  country,
  city,
  timeZones,
}: TMentorInfo) => {
  const countryImage =
    (country && COUNTRIES.find((COUNTRY) => COUNTRY.name.toLocaleLowerCase() === country.toLocaleLowerCase())?.image) ||
    "";
  return (
    <div className="space-y-2.5 basis-full rounded-md px-4 pt-4 pb-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Work experience:</h4>
          <p className="text-balance max-w-2xl">{workExperience ? workExperience : <NotProvided />}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Education:</h4>
          <p className="text-balance max-w-xl">{education ? education : <NotProvided />}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Experience:</h4>
          <p className="text-balance max-w-xl">{experience ? `${experience} years` : <NotProvided />}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Rating:</h4>
          <div className="flex items-center gap-x-2">
            <RatingStars rating={rating} />
            <span>{rating}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-y-4">
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Resume/cv:</h4>
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className="w-fit max-w-xl text-royal-blue hover:underline underline-offset-2"
          >
            View
          </a>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Languages:</h4>
          <p className="text-balance max-w-xl">{languages?.length ? languages.join(", ") : <NotProvided />}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Location:</h4>
          <p className="text-balance max-w-xl flex items-center gap-2 ">
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
                <span>{city ? `${city.toLocaleLowerCase()}, ${country}` : country}</span>
              </>
            ) : (
              <span className="text-zinc-400">Location is not provided</span>
            )}
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Timezone:</h4>
          <p className="text-balance max-w-xl">{timeZones ? timeZones : <NotProvided />}</p>
        </div>
      </div>
    </div>
  );
};

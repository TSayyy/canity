import mentorViewer from "@/assets/mentors/mentorViewer.webp";

import { MessageBox } from "./messageBox";

type TViewerHeader = {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  price: number;
};

export const ViewerHeader = ({ name, jobTitle, description, image, price }: TViewerHeader) => {
  return (
    <header className="w-full">
      <div className="w-full relative">
        <div className="absolute inset-0 -z-20">
          <img src={mentorViewer} alt={name} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="z-0 text-white py-20">
          <div className="container h-full flex gap-x-10 gap-y-4 flex-col sm:flex-row sm:items-center">
            <div className="w-fit rounded-full overflow-hidden border-b-[0.1rem] border-b-royal-blue bg-gradient-to-t from-royal-blue/80 via-transparent to-transparent">
              <img
                src={image}
                alt={`${name} - ${description}`}
                title={name}
                className="h-52 sm:w-auto max-h-72 sm:h-full object-cover"
              />
            </div>
            <div className="h-full flex flex-col justify-center sm:gap-2">
              <h1 className="font-semibold text-royal-blue text-3xl xs:text-4xl md:text-5xl text-pretty">{name}</h1>
              <h2 className="font-medium text-xl text-pretty">{jobTitle}</h2>
              <p className="max-w-lg text-balance mt-2">{description}</p>
              <div className="flex flex-col xs:flex-row sm:flex-col mt-4 gap-y-2 gap-x-4">
                <MessageBox />
                <div className="flex items-center gap-2 text-gray-300 whitespace-nowrap">
                  <span>{`Price: ${price}$ / hour`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

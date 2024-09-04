import { Learners } from "@/components/icons/Learners";

export const LearnersCard = ({ learnersNumber }: { learnersNumber: number }) => {
  return (
    <div className="shadow-custom flex grow flex-col items-center gap-y-2 p-6 px-10 rounded-md">
      <Learners className="w-24" fill="#3498DB" />
      <h5 className="text-royal-blue text-xl">Learners</h5>
      <p className="text-3xl">{learnersNumber}</p>
    </div>
  );
};

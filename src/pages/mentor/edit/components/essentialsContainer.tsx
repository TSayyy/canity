import { BasicInfoForm } from "./basicInfoForm";
import { ImageForm } from "./imageForm";

export const EssentialsContainer = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg space-y-4">
      <h2 className="font-semibold text-lg">Basic Profile info</h2>
      <div className="flex flex-col xl:flex-row gap-4">
        <ImageForm />
        <BasicInfoForm />
      </div>
    </div>
  );
};

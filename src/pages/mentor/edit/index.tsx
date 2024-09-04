import { CVFrom } from "./components/cvForm";
import { EssentialsContainer } from "./components/essentialsContainer";
import { Header } from "./components/header";
import { ProForm } from "./components/proForm";
import { SkillsForm } from "./components/skillsForm";
import { SocialMediaForm } from "./components/socialMedia";

export const MentorEditPage = () => {
  return (
    <main className="w-full py-6 space-y-4">
      <Header />
      <div className="container flex flex-col sm:flex-row gap-4">
        <div className="basis-1/2 space-y-6">
          <EssentialsContainer />
          <CVFrom />
          <SkillsForm />
        </div>
        <div className="basis-1/2 space-y-6">
          <ProForm />
          <SocialMediaForm />
        </div>
      </div>
    </main>
  );
};

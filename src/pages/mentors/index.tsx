import { PageHeader } from "@/components/ui/PageHeader";

import MentorHeaderImage from "../../assets/metorHeaderImage.jpg";
import AllMentorsSection from "./AllMentorsSection";

export default function MentorPage() {
  return (
    <>
      <PageHeader
        title="Mentors"
        description="Connect with mentors who can guide you on your educational journey."
        image={MentorHeaderImage}
      />
      <AllMentorsSection />
    </>
  );
}

import { PageHeader } from "@/components/ui/PageHeader";

import headerImage from "../../assets/books-coursesPage.jpg";
import { AllCoursesSection } from "./AllCoursesSection";

export function CoursesPage() {
  return (
    <>
      <PageHeader
        title="Courses"
        description="Learn about the technological courses provided to you by Coursanity."
        image={headerImage}
      />
      <AllCoursesSection />
    </>
  );
}

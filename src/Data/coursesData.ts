export type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  trackID: number;
  progress: number;
  estimatedTime: number;
  noStudentsEnrolled: number;
  rating: number;
  keywords: string[];
  noChapters: number;
  cLevel: "Beginner" | "Intermediate" | "Advanced";
  cLink: string;
  mentorID: number;
};

// Mock data for courses
export const courses: Course[] = [
  {
    id: 1,
    title: "Git Fundamentals",
    description:
      "Learn the fundamentals of Git version control system and how to efficiently collaborate on software projects",
    image: "https://www.creativeitinstitute.com/images/course/course_1663052056.jpg",
    trackID: 1,
    progress: 0,
    estimatedTime: 12,
    noStudentsEnrolled: 0,
    rating: 4.7,
    keywords: ["Git", "Version Control", "Collaboration", "Code Management"],
    noChapters: 6,
    cLevel: "Beginner",
    cLink: "https://www.youtube.com/watch?v=UB1O30fR-EE&list=PL4cUxeGkcC9ibZ2TSBaGGNrgh4ZgYE6Cc",
    mentorID: 1,
  },
  // Add more course objects as needed
];

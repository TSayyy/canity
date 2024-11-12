import { courses } from "@/Data/coursesData";
import { Course } from "@/Data/coursesData";
import { mentors } from "@/Data/mentorsData";
import { Mentor } from "@/Data/mentorsData";

export const getCourses = (): Course[] => courses;

export const addCourse = (course: Course): void => {
  courses.push(course);
};

export const updateCourse = (id: number, updatedCourse: Partial<Course>): void => {
  const index = courses.findIndex((course) => course.id === id);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updatedCourse };
  }
};

export const deleteCourse = (id: number): void => {
  const index = courses.findIndex((course) => course.id === id);
  if (index !== -1) {
    courses.splice(index, 1);
  }
};

export const getMentors = (): Mentor[] => mentors;

export const addMentor = (mentor: Mentor): void => {
  mentors.push(mentor);
};

export const updateMentor = (id: number, updatedMentor: Partial<Mentor>): void => {
  const index = mentors.findIndex((mentor) => mentor.id === id);
  if (index !== -1) {
    mentors[index] = { ...mentors[index], ...updatedMentor };
  }
};

export const deleteMentor = (id: number): void => {
  const index = mentors.findIndex((mentor) => mentor.id === id);
  if (index !== -1) {
    mentors.splice(index, 1);
  }
};

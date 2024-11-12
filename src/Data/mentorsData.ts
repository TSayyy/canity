export type Mentor = {
  id: number;
  name: string;
  email: string;
  pricePerHour: number;
  rating: number;
  experience: number;
  skills: string[];
  image: string;
  country: string;
};

// Mock data for mentors
export const mentors: Mentor[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    pricePerHour: 100,
    rating: 5,
    experience: 1,
    skills: ["problem solving", "debugging", "critical thinking"],
    image: "https://res.cloudinary.com/dv64duxs1/image/upload/v1706996235/g86vnwqxuh0bssn2e4re.jpg",
    country: "Egypt",
  },
  // Add more mentor objects as needed
];

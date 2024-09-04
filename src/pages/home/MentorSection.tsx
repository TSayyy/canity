import ContentLoader from "react-content-loader";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import mentorImage from "@/assets/home/mentors/metor01.webp";
import { Button } from "@/components/ui/Button_";
import MentorCard from "@/components/ui/MentorCard";
import { mentorSchema } from "@/schemas/mentorSchema";

export default function MentorSection({ mentors }: { mentors: z.infer<typeof mentorSchema>[] }) {
  const navigate = useNavigate();

  if (!mentors)
    return (
      <div className="bg-dark-navy py-10 flex justify-center">
        <ContentLoader
          title="Mentors"
          speed={2}
          width={900}
          height={360}
          viewBox="-50 0 500 300"
          backgroundColor="#ffffff76"
          foregroundColor="#808080"
        >
          <rect x="0" y="160" rx="10" ry="10" width="60" height="75" />
          <rect x="90" y="160" rx="10" ry="10" width="60" height="75" />
          <rect x="180" y="160" rx="10" ry="10" width="60" height="75" />
          <rect x="270" y="160" rx="10" ry="10" width="60" height="75" />
          <rect x="360" y="160" rx="10" ry="10" width="60" height="75" />
          <rect x="100" y="80" rx="5" ry="5" width="215" height="10" />
          <rect x="80" y="110" rx="5" ry="5" width="261" height="11" />
          <rect x="150" y="20" rx="5" ry="5" width="115" height="13" />
        </ContentLoader>
      </div>
    );

  return (
    <section className="flex flex-col gap-16 py-20 justify-evenly items-center bg-dark-navy text-white">
      <aside className="container flex flex-col justify-center gap-6 text-center items-center max-w-screen-xl ">
        <h1 className="text-4xl font-semibold">Our top mentors</h1>
        <p className=" text-gray-300 text-balance leading-6">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus! Id sint galisum et corrupti obcaecati qui quisquam quam hic sint aliquam nam Quis porro qui velit
          soluta et eius natus.
        </p>
        <div className="min-w-11 w-48 hidden sm:block">
          <Button text="Discover More" type="button" onClick={() => navigate("/mentors")} />
        </div>
      </aside>
      <aside className="container flex flex-col gap-10 justify-center ">
        <main className=" flex flex-wrap gap-2 sm:gap-4 lg:gap-10 justify-center">
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              className="xxs:w-[150px] xxs:h-[200px] sm:w-[250px] sm:h-[300px]"
              title={mentor.title}
              image={mentor.user.image || mentorImage}
              name={mentor.user.name}
              id={mentor.id}
              rating={mentor.rating}
            />
          ))}
        </main>
        <div className=" min-w-11 sm:hidden">
          <Button text="Discover More" type="button" onClick={() => navigate("/mentors")} />
        </div>
      </aside>
    </section>
  );
}

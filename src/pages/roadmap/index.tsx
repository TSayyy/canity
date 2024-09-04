import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { usePostData } from "@/hooks/useApi";

import { AnswersType } from "../quiz/components/Questions";
import { LoadingRoadmap } from "./LoadingRoadmap";
import RoadmapError from "./RoadmapError";

type ResponseType = {
  prediction: string[];
};
const RandomDescriptions = [
  "Learn the basics of programming using Python, covering variables, control structures, functions, and data structures for writing simple programs.",
  "Study essential data structures and algorithms, including arrays, trees, and graphs, while analyzing their time and space complexities.",
  "Explore operating system principles such as process and memory management, file systems, and concurrency through practical programming assignments.",
  "Understand relational databases, SQL, and NoSQL databases, with hands-on experience in database design, querying, and optimization.",
  "Learn the fundamentals of network architecture, protocols, and security, including the OSI model, TCP/IP, and wireless networks through labs and projects.",
  "Introduction to AI concepts such as search algorithms, machine learning, and natural language processing, with projects using tools like TensorFlow.",
  "Cover software development life cycles, design methodologies, and testing, emphasizing teamwork and project management with a group project.",
  "Explore cybersecurity techniques, including cryptography, network security, and ethical hacking, with hands-on labs to secure systems and identify vulnerabilities.",
];

const RandomDuration = ["4 weeks", "3 weeks", "2 months", "1 month", "2 weeks", "1 week"];

export function Roadmap() {
  const [predictions, setPredictions] = useState<string[]>([]);
  const [status, setStatus] = useState<"success" | "failed" | "idle" | "loading">("failed");
  const { state } = useLocation();
  const { answers, trackName }: { answers: AnswersType; trackName: string } = state || {
    answers: undefined,
    trackName: "",
  };
  const roadMap = useMemo(() => {
    return predictions?.map((prediction) => {
      const randomDescriptionIndex = Math.floor(Math.random() * RandomDescriptions.length);
      const randomDurationIndex = Math.floor(Math.random() * RandomDuration.length);
      return {
        title: prediction,
        description: RandomDescriptions[randomDescriptionIndex],
        duration: RandomDuration[randomDurationIndex],
      };
    });
  }, [predictions]);

  const data = useMemo(() => {
    const question: string[] = [];
    const correct_answer: (string | undefined)[] = [];
    const student_answer: (string | null)[] = [];
    Object.entries(answers)?.forEach(([key, value]) => {
      question.push(key);
      correct_answer.push(value.correctAnswer);
      student_answer.push(value.answer);
    });

    return { question, correct_answer, student_answer };
  }, [answers]);

  const generateRoadMap = usePostData("/students/submit-quiz");
  useEffect(() => {
    async function handleGenerateRoadMap() {
      setStatus(() => "loading");
      if (!answers) return;
      const { data: res, status } = await generateRoadMap.mutateAsync({ data });
      const { response }: { response: ResponseType } = res?.data || { response: { predictions: [] } };
      console.log(response);
      setPredictions(response.prediction);
      setStatus(() => status);
    }
    handleGenerateRoadMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(roadMap, predictions);
  if (status === "loading") return <LoadingRoadmap />;
  if (status === "failed") return <RoadmapError />;
  return (
    <section className="bg-dark-navy min-h-96">
      <main className="container text-white h-full py-7">
        <header className="mb-5">
          <p>{trackName}</p>
          <h1 className="text-5xl font-semibold">Roadmap</h1>
        </header>
        <main className="grid gap-2">
          <h1 className="text-2xl md:text-center font-semibold">Start</h1>
          <section
            style={{
              gridAutoRows: "min-content",
            }}
            className="grid md:grid-cols-2 gap-y-16 pt-36 md:pt-48 py-20 relative overflow-hidden min-h-0"
          >
            <div className="flex flex-col justify-between items-center absolute md:left-1/2 md:-translate-x-1/2 z-10 overflow-hidden h-full py-1">
              <Dot className="-translate-y-1" />
              <Dot className="translate-y-1" />
              <div className=" absolute -z-10  h-full w-0 border-dashed border-2 border-royal-blue" />
            </div>
            <div aria-hidden className=" hidden md:block"></div>

            {roadMap?.map((step, index) => (
              <>
                <Step
                  className={`z-10 min-h-0 ${index % 2 === 0 ? "md:-translate-x-3" : "md:text-right md:place-self-end md:translate-x-3"}`}
                  dotPlace={index % 2 === 0 ? "left" : "right"}
                  {...step}
                />
                {index % 2 === 1 && !(index + 1 === roadMap.length) && (
                  <>
                    <div aria-hidden className=" hidden md:block"></div>
                    <div aria-hidden className=" hidden md:block"></div>
                  </>
                )}
              </>
            ))}
          </section>
          <h1 className="text-2xl md:text-center">End of the journey</h1>
        </main>
      </main>
    </section>
  );
}

export function Dot({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-6 h-6 border-[1px] min-w-6 border-mint-green rounded-full flex justify-center items-center ${className}`}
    >
      <div className="w-4 h-4 bg-mint-green rounded-full" />
    </div>
  );
}

type StepProps = {
  title: string;
  description: string;
  duration: string;
  className?: string;
  dotPlace?: "left" | "right";
};

export function Step({ title, description, duration, className = "", dotPlace = "left" }: StepProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const stepRef = useRef(null);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  useEffect(() => {
    if (stepRef.current) {
      observer.observe(stepRef.current);
    }
  });
  return (
    <div className={`flex gap-4  ${className}`}>
      {dotPlace === "left" && <Dot className="hidden md:flex " />}
      <Dot className="md:hidden" />
      <div
        ref={stepRef}
        className={`max-w-[500px]  -translate-y-7 transition-all duration-700 ${isIntersecting ? "opacity-1 translate-x-0" : `opacity-0 ${dotPlace === "left" ? "translate-x-24" : "md:-translate-x-24 translate-x-24"} `} `}
      >
        <span className="text-xs sm:text-sm text-royal-blue">{duration}</span>
        <h1 className="text-xl sm:text-2xl">{title}</h1>
        <p className="text-neutral-gray text-sm sm:text-base">{description}</p>
      </div>
      {dotPlace === "right" && <Dot className="hidden md:flex" />}
    </div>
  );
}

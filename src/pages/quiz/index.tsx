import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";

import Questions from "./components/Questions";
import Timer from "./components/Timer";

export type QuizQuestionType = {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  id: string;
  trackName: string;
  correctAnswer: string;
};

const SECONDS_IN_MINUTE = 60;
const QUIZ_TIME_IN_MINUTES = 5 * SECONDS_IN_MINUTE;
export function Quiz() {
  // Get the track name from the URL
  const { trackName } = useParams();
  // Fetch the quiz questions
  const { data: response, isLoading } = useGetData(`/students/quiz/${trackName}`);
  const { status, data } = response || {};
  const { questions }: { questions: QuizQuestionType[] } = data?.data || {};
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  function handleTimesUp() {
    toast.error("Times up! 🕒");
    setIsQuizFinished(true);
  }
  function finishQuiz() {
    setIsQuizFinished(true);
  }
  if (isLoading) return <LoadingPage />;
  if (status === "failed") return <SomethingWentWrong />;
  return (
    <main>
      <header className="bg-dark-navy text-white">
        <main className="container flex flex-col md:flex-row justify-between items-center gap-10 py-16">
          <section className="grid gap-3">
            <h1 className="text-3xl font-semibold">{trackName} quiz</h1>
            <p>Non quia ipsum rem animi dolor eum voluptatum necessitatibus</p>
          </section>
          <section className=" w-1/2 place-self-start md:w-fit md:place-self-end max-w-48">
            <Timer time={QUIZ_TIME_IN_MINUTES} isQuizFinished={isQuizFinished} onTimesUp={handleTimesUp} />
          </section>
        </main>
      </header>
      <main className="container py-16">
        <Questions questions={questions} isQuizFinished={isQuizFinished} finishQuiz={finishQuiz} />
      </main>
    </main>
  );
}

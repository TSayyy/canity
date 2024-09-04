import { Badge } from "@/components/ui/badge";

import { Option } from "./Option";

const PossibleAnswers = ["a", "b", "c", "d"];
type QuestionProps = {
  questionsCount: number;
  question: string;
  options: string[];
  currentQuestionNumber: number;
  pointsPerQuestion: number;
  currentAnswer: string | null;
  disabled?: boolean;
  onAnswerChange: (question: string, value: string) => void;
};

export default function Question({
  questionsCount,
  question,
  options,
  currentQuestionNumber,
  currentAnswer,
  pointsPerQuestion,
  onAnswerChange,
  disabled,
}: QuestionProps) {
  return (
    <div className="container bg-zinc-200 rounded-md shadow-custom py-10">
      <header className="flex justify-between flex-wrap">
        <h1 className=" font-semibold text-2xl">
          Question {currentQuestionNumber} of {questionsCount}
        </h1>
        <Badge className="bg-dark-navy text-white whitespace-nowrap">{pointsPerQuestion} points</Badge>
      </header>
      <main>
        <h2 className="text-xl font-semibold mt-5">{question}</h2>
        <section className="grid gap-3 mt-5">
          {options.map((option, index) => (
            <Option
              disabled={disabled}
              key={index}
              option={option}
              value={PossibleAnswers[index]}
              onChange={(value) => onAnswerChange(question, value)}
              checked={currentAnswer === PossibleAnswers[index]}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

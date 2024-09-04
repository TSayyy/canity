import { useCallback, useEffect, useRef, useState } from "react";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { QuizQuestionType } from "..";
import { EndOfQuizCard } from "../EndOfQuizCard";
import Question from "./Question";

type QuestionsProps = {
  questions: QuizQuestionType[];
  isQuizFinished: boolean;
  finishQuiz: (answers: AnswersType) => void;
};
export type AnswersType = {
  [question: string]: { answer: string | null; isCorrect: boolean; correctAnswer?: string };
};

export default function Questions({ questions, isQuizFinished, finishQuiz }: QuestionsProps) {
  const finishCardRef = useRef<HTMLButtonElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>(() => {
    return questions.reduce((acc, question) => {
      acc[question.question] = { answer: null, isCorrect: false, correctAnswer: question.correctAnswer.trim() };
      return acc;
    }, {} as AnswersType);
  });
  const handleFinish = useCallback(() => {
    finishQuiz(answers);
    finishCardRef?.current?.click();
  }, [answers, finishQuiz]);

  // Calculate the number of answered questions
  const answeredQuestions = Object.values(answers).filter((answer) => answer.answer !== null).length;
  // Handle the next question
  function handleNextQuestion() {
    if (currentQuestion === questions.length - 1) {
      handleFinish();
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  }
  // Handle the previous question
  function handlePreviousQuestion() {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
  }
  // Handle the answer change
  function handleAnswerChange(question: string, value: string) {
    setAnswers((prev) => {
      return {
        ...prev,
        [question]: {
          answer: value,
          isCorrect: value === questions[currentQuestion]?.correctAnswer.trim(),
          correctAnswer: questions[currentQuestion]?.correctAnswer.trim(),
        },
      };
    });
  }
  // Handle the times up
  useEffect(() => {
    if (isQuizFinished) {
      handleFinish();
    }
  }, [isQuizFinished, handleFinish]);
  return (
    <>
      <Progress
        className=" h-3 bg-zinc-200 text-white shadow-2xl"
        value={(answeredQuestions / questions.length) * 100}
      />

      <section className="grid gap-5 py-10">
        <Question
          disabled={isQuizFinished}
          question={questions[currentQuestion].question}
          options={[
            questions[currentQuestion].answerA,
            questions[currentQuestion].answerB,
            questions[currentQuestion].answerC,
            questions[currentQuestion].answerD,
          ]}
          currentQuestionNumber={currentQuestion + 1}
          questionsCount={questions.length}
          pointsPerQuestion={1}
          onAnswerChange={handleAnswerChange}
          currentAnswer={answers[questions[currentQuestion].question]?.answer}
        />
      </section>
      <div className=" flex justify-end gap-2">
        <Button
          size="lg"
          variant="ghost"
          className=" text-royal-blue hover:text-royal-blue"
          onClick={handlePreviousQuestion}
        >
          Previous
        </Button>
        <Button
          variant={`${currentQuestion === questions.length - 1 ? "destructive" : "default"}`}
          size="lg"
          onClick={handleNextQuestion}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
      <Modal>
        <Modal.Open opens="result">
          <Button ref={finishCardRef} className="hidden" size="lg" variant="ghost" aria-hidden>
            Finish
          </Button>
        </Modal.Open>
        <Modal.Window name="result">
          <EndOfQuizCard answers={answers} />
        </Modal.Window>
      </Modal>
    </>
  );
}

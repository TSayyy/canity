import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { AnswersType } from "./components/Questions";

function scoreMessage(score: number) {
  if (score < 50) {
    return "No worries! Keep studying and you'll get there!";
  } else if (score < 70) {
    return "You're halfway there! Keep up the good work";
  } else if (score < 90) {
    return "Keep studying to solidify your knowledge!";
  } else {
    return "Fantastic job! You're really mastering this material";
  }
}
export function EndOfQuizCard({ answers }: { answers: AnswersType }) {
  const { trackName } = useParams();
  const correctAnswers = Object.values(answers).filter((answer) => answer.isCorrect).length;
  const totalQuestions = Object.keys(answers).length;
  const score = (correctAnswers / totalQuestions) * 100;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-3 p-5">
      <CircularProgressbarWithChildren
        styles={{
          path: {
            stroke: "#3498DB",
            strokeWidth: 5,
          },
          trail: {
            stroke: "#D9D9D9",
            strokeWidth: 5,
          },
        }}
        className=" -rotate-[125deg] max-w-56"
        value={score}
        circleRatio={0.7}
      >
        <div className="flex flex-col items-center gap-1">
          <div>
            <span className="text-6xl font-bold">{Math.ceil(score)}</span>
            <span className="text-4xl font-bold">%</span>
          </div>
          <span className="text-lg text-neutral-gray">Your score</span>
        </div>
      </CircularProgressbarWithChildren>
      <p className="text-center text-2xl font-medium">{scoreMessage(score)}</p>
      <div>
        <h3 className=" text-neutral-gray">We recommend courses based on your level</h3>
      </div>
      <div className=" grid grid-cols-2 gap-2">
        <Button
          onClick={() => navigate("/")}
          className=" text-royal-blue border-royal-blue hover:text-royal-blue"
          variant={"outline"}
        >
          home
        </Button>
        <Button
          onClick={() =>
            navigate("/roadmap", {
              state: { answers, trackName },
            })
          }
        >
          Generate RoodMap
        </Button>
      </div>
    </div>
  );
}

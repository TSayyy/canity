import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

type TimerProps = {
  time: number;
  onTimesUp: () => void;
  isQuizFinished: boolean;
};
export default function Timer({ time, onTimesUp, isQuizFinished }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(time);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  useEffect(() => {
    if (isQuizFinished) return;
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    if (remainingTime === 0) {
      clearInterval(interval);
      onTimesUp();
    }
    return () => clearInterval(interval);
  }, [onTimesUp, remainingTime, isQuizFinished]);
  return (
    <CircularProgressbar
      styles={{
        path: {
          stroke: "#3498DB",
        },
        trail: {
          stroke: "#293560",
        },
        text: {
          fill: "#fff",
          fontSize: "24px",
          fontWeight: 500,
        },
      }}
      value={(remainingTime / time) * 100}
      text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
    />
  );
}

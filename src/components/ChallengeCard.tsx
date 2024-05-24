"use client";

import { createChallengeProgress } from "@/lib/server/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ChallengeOption {
  id: number;
  challengeId: number;
  text: string;
  correct: boolean;
}

interface ChallengeProgress {
  completed: boolean;
}

interface Challenge {
  order: number;
  question: string;
  lessonId: number;
  id: number;
  challengeOptions: ChallengeOption[];
  challengeProgresses: ChallengeProgress[];
}

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const [isLoading, startTransition] = useTransition();

  const { challengeOptions, challengeProgresses } = challenge;
  const isCompleted = challengeProgresses.some(
    (progress) => progress.completed
  );

  const attemptChallenge = async (optionCorrect: boolean) => {
    startTransition(async () => {
      if (optionCorrect) {
        const response = await createChallengeProgress(challenge.id);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Incorrect answer");
      }
    });
  };
  return (
    <div
      className={`p-4 rounded shadow ${
        isCompleted ? "bg-gray-400" : "bg-white"
      } text-black`}
    >
      <h3 className="text-lg font-bold mb-2">{challenge.question}</h3>
      <ul>
        {challengeOptions.map((option) => (
          <Button
            key={option.id}
            className={`p-2 border rounded mb-1 text-black ${
              isCompleted || isLoading
                ? "bg-gray-300"
                : "bg-blue-100 cursor-pointer hover:bg-blue-200"
            }`}
            onClick={() => attemptChallenge(option.correct)}
            disabled={isCompleted || isLoading}
          >
            {option.text}
          </Button>
        ))}
      </ul>
    </div>
  );
};
export default ChallengeCard;

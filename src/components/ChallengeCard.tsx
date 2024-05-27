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
      className={`p-6 rounded-lg shadow-2xl w-full ${
        isCompleted ? "bg-indigo-800/70 text-slate-300" : "bg-indigo-800/90 text-slate-50"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">{challenge.question}</h3>
      <ul className="space-y-2">
        {challengeOptions.map((option) => (
          <Button
            key={option.id}
            className={`w-full py-2 px-4 border rounded text-left ${
              isCompleted || isLoading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-slate-50 border-indigo-600"
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

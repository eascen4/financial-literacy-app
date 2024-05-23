"use client";

import { createChallengeProgress } from "@/lib/server/actions";
import { Button } from "./ui/button";

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
  const isCompleted = challenge.challengeProgresses.some(
    (progress) => progress.completed
  );

  const attemptChallenge = async (optionId: number) => {
    if (challenge.challengeOptions.find((option) => option.id === optionId)?.correct) {
      console.log("Correct!");
      const success = await createChallengeProgress(challenge.id)
      if (success) console.log("Challenge completed successfully");
      if (!success) console.log("Failed to complete challenge or already completed!");
    } else {
        console.log("Incorrect!");
    }
  }
  return (
    <div
      className={`p-4 rounded shadow ${
        isCompleted ? "bg-gray-400" : "bg-white"
      } text-black`}
    >
      <h3 className="text-lg font-bold mb-2">{challenge.question}</h3>
      <ul>
        {challenge.challengeOptions.map((option) => (
          <Button
            key={option.id}
            className={`p-2 border rounded mb-1 text-black ${
              isCompleted
                ? "bg-gray-300"
                : "bg-blue-100 cursor-pointer hover:bg-blue-200"
            }`}
            onClick={() => attemptChallenge(option.id)}
          >
            {option.text}
          </Button>
        ))}
      </ul>
    </div>
  );
};
export default ChallengeCard;

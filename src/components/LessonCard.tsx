import Link from "next/link";
import ProgressBar from "./ProgressBar";

interface Lesson {
  id: number;
  title: string;
  description: string;
  order: number;
  challenges: {
    id: number;
    order: number;
    lessonId: number;
    question: string;
    challengeProgresses: {
      completed: boolean;
    }[];
  }[];
}
[];
const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  const { id, title, challenges } = lesson;
  const totalChallenges = challenges.length;
  const completedChallenges = challenges.filter((challenge) =>
    challenge.challengeProgresses.some((progress) => progress.completed)
  ).length;
  return (
    <Link
      href={`/lessons/${id}`}
      className="flex flex-col gap-2 p-6 bg-indigo-800/80 rounded-lg shadow-2xl hover:scale-105 "
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <ProgressBar value={completedChallenges / totalChallenges} />
      <p className="text-sm text-gray-400">
        {completedChallenges} / {totalChallenges} challenges completed
      </p>
    </Link>
  );
};
export default LessonCard;

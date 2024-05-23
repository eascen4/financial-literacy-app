import Link from "next/link";

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
      className="block p-4 bg-white rounded shadow hover:bg-gray-50 transition text-stone-950"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">
        Progress: {completedChallenges} / {totalChallenges} challenges completed
      </p>
      <p>{JSON.stringify(lesson)}</p>
    </Link>
  );
};
export default LessonCard;

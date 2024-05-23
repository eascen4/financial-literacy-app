import ChallengeCard from "@/components/ChallengeCard";
import { cachedLessonById } from "@/lib/server/caches";

const LessonPage = async ({ params }: { params: { lessonId: string } }) => {
  const data = await cachedLessonById(params.lessonId);

  if (!data) return <div>Not Found</div>;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
      <p className="mb-4">{data.description}</p>
      <div className="space-y-4">
        {data.challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </section>
  );
};
export default LessonPage;

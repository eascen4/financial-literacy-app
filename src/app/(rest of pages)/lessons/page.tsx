import LessonCard from "@/components/LessonCard";
import { cachedLessons } from "@/lib/server/caches";

const LessonsPage = async () => {
  const data = await cachedLessons();
  return (
    <section className="py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-slate-50 mb-10">Lessons</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};
export default LessonsPage;

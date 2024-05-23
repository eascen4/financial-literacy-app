import LessonCard from "@/components/LessonCard";
import { cachedLessons } from "@/lib/server/caches";

const LessonsPage = async () => {
  const data = await cachedLessons();
  return (
    <section>
      {data.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </section>
  );
};
export default LessonsPage;

import ChallengeForm from "@/components/ChallengeForm";
import ChallengeOptionForm from "@/components/ChallengeOptionForm";
import LessonForm from "@/components/LessonForm";
import { cachedAuth } from "@/lib/server/caches";

const AdminPage = async () => {
  const session = await cachedAuth();

  if (!session?.user.isAdmin) return <div>Unauthorized</div>;

  return (
    <section>
      <LessonForm />
      <ChallengeForm />
      <ChallengeOptionForm />
    </section>
  );
};
export default AdminPage;

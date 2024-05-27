import ChallengeForm from "@/components/ChallengeForm";
import ChallengeOptionForm from "@/components/ChallengeOptionForm";
import LessonForm from "@/components/LessonForm";
import { cachedAuth } from "@/lib/server/caches";

const AdminPage = async () => {
  const session = await cachedAuth();

  if (!session?.user.isAdmin) return <div>Unauthorized</div>;

  return (
    <section className="flex-1 w-full">
      <div className="flex flex-col items-center text-slate-50 bg-gradient-to-b from-indigo-800/20 to-indigo-900 space-y-6 py-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Admin Dashboard
        </h1>
        <div className="flex flex-col lg:flex-row justify-around w-full px-4 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <LessonForm />
          </div>
          <div className="w-full lg:w-1/3">
            <ChallengeForm />
          </div>
          <div className="w-full lg:w-1/3">
            <ChallengeOptionForm />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminPage;

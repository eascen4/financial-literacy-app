import { cachedAuth } from "@/lib/server/caches";
import ProfileCard from "@/components/ProfileCard";

const ProfilePage = async () => {
  const session = await cachedAuth();

  return (
    <section>
      <ProfileCard
        user={
          session?.user || {
            id: "0000000000000000",
            name: "Default User",
            email: "example@email.com",
            image: "/default_pfp.svg",
            isAdmin: false,
            points: 0,
            activeLessonId: 1,
          }
        }
      />
      {JSON.stringify(session?.user)}
    </section>
  );
};
export default ProfilePage;

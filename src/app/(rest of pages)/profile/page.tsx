import useSessionServer from "@/lib/server/cachedAuth";
import SignOutButton from "@/components/SignOutButton";
import ProfileCard from "@/components/ProfileCard";

const ProfilePage = async () => {
  const session = await useSessionServer();

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
          }
        }
      />
      
    </section>
  );
};
export default ProfilePage;

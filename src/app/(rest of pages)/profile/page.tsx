
import useSessionServer from "@/lib/server/cachedAuth"
import SignOutButton from "@/components/SignOutButton";

const ProfilePage = async () => {
  const session = await useSessionServer();
 
  return (
    <section>
      
      <p>{JSON.stringify(session?.user)}</p>
      <SignOutButton />

    </section>
  );
};
export default ProfilePage;

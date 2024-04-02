
import { currentUser } from "@/lib/currentUser";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <h1>You arent Signed In :\</h1>;
  }
  return (
    <>
      <h1>Welcome to RocketFinance</h1>
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
      <p className="w-full overflow-scroll">{JSON.stringify(user)}</p>
      <Image
        src={user.image}
        alt="Profile Picture"
        width={100}
        height={100}
      />
    </>
  );
}

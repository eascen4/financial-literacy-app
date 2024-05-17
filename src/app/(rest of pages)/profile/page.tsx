"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/client/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";

const ProfilePage = () => {
  const user = useCurrentUser();
 
  return (
    <section>
      <Image
        src={user?.image || "/default_pfp.svg"}
        alt="user image"
        width={100}
        height={100}
      />
      <h1>Welcome, {user?.name}</h1>
      <h2>Email: {user?.email}</h2>
      <h3>ID: {user?.id}</h3>
      <Button onClick={async() => await signOut()}>Sign out</Button>
      <p>{JSON.stringify(user)}</p>

    </section>
  );
};
export default ProfilePage;

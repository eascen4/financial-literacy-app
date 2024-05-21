"use client";
import { AUTH_LINKS, REST_OF_PAGES } from "@/lib/constants";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const WebNav = () => {
  const session = useSession();
  return (
    <nav className="hidden md:flex gap-4">
      {session.status === "authenticated" ? (
        <>
          {REST_OF_PAGES.map(({ name, path }) => (
            <Link
              className="flex items-center hover:underline"
              href={path}
              key={name}
            >
              {name}
            </Link>
          ))}
          <div className="flex justify-center items-center">
            <Image
              className=" rounded-full"
              src={session.data.user?.image || "/default_pfp.svg"}
              width={30}
              height={30}
              alt="user icon"
            />
          </div>
        </>
      ) : (
        AUTH_LINKS.map(({ name, path }) => (
          <Link
            className="flex items-center hover:underline"
            href={path}
            key={name}
          >
            {name}
          </Link>
        ))
      )}
    </nav>
  );
};
export default WebNav;

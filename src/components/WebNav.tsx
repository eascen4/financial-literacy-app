"use client";

import { AUTH_LINKS, REST_OF_PAGES } from "@/lib/constants";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import SignOutButton from "./SignOutButton";

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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Image
                  className=" rounded-full"
                  src={session.data.user?.image || "/default_pfp.svg"}
                  width={30}
                  height={30}
                  alt="user icon"
                />
              </HoverCardTrigger>
              <HoverCardContent className="bg-indigo-900 border-indigo-700 space-y-2">
                <h2 className="text-slate-50 mt-2 text-xl font-bold">
                  {session.data.user?.name || "Default User"}
                </h2>
                <p className="text-gray-400 text-sm">@{session.data.user?.email}</p>
                <SignOutButton />
              </HoverCardContent>
            </HoverCard>
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

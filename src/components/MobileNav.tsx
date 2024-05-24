"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AUTH_LINKS, REST_OF_PAGES } from "@/lib/constants";
import { MenuIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const MobileNav = () => {
  const session = useSession();
  return (
    <nav className="md:hidden flex">
      <Sheet>
        <SheetTrigger>
          <MenuIcon width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="text-slate-50 bg-indigo-950 border-indigo-900 py-10">
          <SheetHeader>
            <SheetClose asChild>
              <Link
                href="/"
                className="text-2xl flex items-center font-semibold gap-3"
              >
                <Image
                  src="/rocket.svg"
                  width={40}
                  height={40}
                  alt="rocket icon"
                />
                Rocket Finance
              </Link>
            </SheetClose>
          </SheetHeader>
          {session.status === "authenticated" ? (
            <div className="flex flex-col justify-between h-full py-4">
              <div className="flex flex-col gap-1">
                {REST_OF_PAGES.map(({ name, path }) => (
                  <SheetClose
                    key={name}
                    asChild
                    className="hover:bg-black/15 px-2 py-3 rounded-md font-medium text-lg"
                  >
                    <Link
                      className="flex items-center hover:underline"
                      href={path}
                    >
                      {name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-2 w-fit">
                    <Image
                      className=" rounded-full"
                      src={session.data.user?.image || "/default_pfp.svg"}
                      width={40}
                      height={40}
                      alt="user icon"
                    />
                    <h2 className="font-semibold">
                      {session.data.user?.name || "Default User"}
                    </h2>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="bg-indigo-900 border-indigo-700 space-y-2">
                  <h2 className="text-slate-50 mt-2 text-xl font-bold">
                    {session.data.user?.name || "Default User"}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    @{session.data.user?.email}
                  </p>
                  <SignOutButton />
                </HoverCardContent>
              </HoverCard>
            </div>
          ) : (
            <div className="flex flex-col gap-1 py-4">
              {AUTH_LINKS.map(({ name, path }) => (
                <SheetClose
                  key={name}
                  asChild
                  className="hover:bg-black/15 px-2 py-3 rounded-md font-medium text-lg"
                >
                  <Link
                    className="flex items-center hover:underline"
                    href={path}
                  >
                    {name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
};
export default MobileNav;

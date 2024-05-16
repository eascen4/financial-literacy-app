"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentUser } from "@/lib/client/useCurrentUser";
import { AUTH_LINKS, REST_OF_PAGES } from "@/lib/constants";
import { currentUser } from "@/lib/server/currentUser";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MobileNav = () => {
  const user = useCurrentUser();
  return (
    <nav className="md:hidden flex">
      <Sheet>
        <SheetTrigger>
          <MenuIcon width={30} height={30} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetClose asChild>
              <Link href="/" className="flex items-center font-semibold gap-3">
                <Image
                  src="/rocket.svg"
                  width={30}
                  height={30}
                  alt="rocket icon"
                />
                Rocket Finance
              </Link>
            </SheetClose>
          </SheetHeader>
          {user
            ? REST_OF_PAGES.map(({ name, path }) => (
                <SheetClose key={name} asChild>
                  <Link
                    className="flex items-center hover:underline"
                    href={path}
                  >
                    {name}
                  </Link>
                </SheetClose>
              ))
            : AUTH_LINKS.map(({ name, path }) => (
                <SheetClose key={name} asChild>
                  <Link
                    className="flex items-center hover:underline"
                    href={path}
                  >
                    {name}
                  </Link>
                </SheetClose>
              ))}
        </SheetContent>
      </Sheet>
    </nav>
  );
};
export default MobileNav;

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AUTH_LINKS, REST_OF_PAGES } from "@/lib/constants";
import { currentUser } from "@/lib/server/currentUser";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MobileNav = async () => {
  const user = await currentUser();
  return (
    <nav className="md:hidden flex">
      <Sheet>
        <SheetTrigger>
          <MenuIcon width={30} height={30} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <Link href="/" className="flex items-center font-semibold gap-3">
              <Image
                src="/rocket.svg"
                width={30}
                height={30}
                alt="rocket icon"
              />
              Rocket Finance
            </Link>
          </SheetHeader>
          {user
            ? REST_OF_PAGES.map(({ name, path }) => (
                <Link
                  className="flex items-center hover:underline"
                  href={path}
                  key={name}
                >
                  {name}
                </Link>
              ))
            : AUTH_LINKS.map(({ name, path }) => (
                <Link
                  className="flex items-center hover:underline"
                  href={path}
                  key={name}
                >
                  {name}
                </Link>
              ))}
        </SheetContent>
      </Sheet>
    </nav>
  );
};
export default MobileNav;

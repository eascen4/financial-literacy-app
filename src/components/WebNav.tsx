import { AUTH_LINKS, REST_OF_PAGES } from "@/lib/constants";
import { currentUser } from "@/lib/server/currentUser";
import Link from "next/link";

const WebNav = async () => {
  const user = await currentUser();
  return (
    <nav className="hidden md:flex gap-2">
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
    </nav>
  );
};
export default WebNav;

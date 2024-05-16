import MobileNav from "@/components/MobileNav";
import WebNav from "@/components/WebNav";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="bg-blue-200 h-16 w-full flex justify-between p-2 fixed">
        <Link href="/" className="flex items-center font-semibold gap-3 text-xl">
          <Image src="/rocket.svg" width={30} height={30} alt="rocket icon" />
          Rocket Finance
        </Link>
        <MobileNav />
        <WebNav />
      </header>
      <main className="pt-16 flex-grow">{children}</main>
    </>
  );
};
export default Layout;

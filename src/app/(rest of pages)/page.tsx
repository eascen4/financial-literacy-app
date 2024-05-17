import Image from "next/image";

const Home = async () => {
  return (
    <>

    <section className="flex h-[90vh] w-full justify-around items-center relative">
        <Image
          src="/rocket.svg"
          width={500}
          height={500}
          alt="rocket icon"
          className="absolute md:static"
        />
      <h1 className="text-4xl md:text-3xl lg:text-5xl font-semibold px-4 z-10 text-center">
        Welcome to <span className="italic">Rocket Finance</span>
      </h1>
    </section>
    <section className="flex h-[90vh] w-full justify-around items-center relative">
    </section>
    </>
    
  );
};
export default Home;

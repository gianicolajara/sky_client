import LoginCard from "@/components/login/LoginCard";
import BigLogo from "@/components/shared/Logo/BigLogo";

function page() {
  return (
    <section className="w-full h-screen justify-center items-center grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1">
      <div className="w-full h-full lg:flex flex-col justify-center items-center bg-cyan-400 hidden">
        <BigLogo className="lg:flex hidden" />
      </div>
      <div className="w-full h-full flex justify-center items-center bg-cyan-400 lg:bg-transparent flex-col gap-y-4">
        <BigLogo />
        <LoginCard />
      </div>
    </section>
  );
}

export default page;

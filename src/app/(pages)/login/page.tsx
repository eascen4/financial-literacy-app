import GithubButton from "@/Components/GithubButton";
import GoogleButton from "@/Components/GoogleButton";
import LoginForm from "@/Components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-full">
        <div className="w-3/4 flex flex-col p-2 py-6 bg-blue-200 rounded">
          <h1>Login</h1>
          <LoginForm />
          <div className="my-2 border" />
          <GoogleButton text="Login"/>
          <GithubButton text="Login"/>
        </div>
        <div className="text-sm mt-2">
          New to RocketFinance?{" "}
          <Link className="text-blue-500 hover:underline" href="/signup">
            SIGNUP
          </Link>
        </div>
      </section>
    </>
  );
}

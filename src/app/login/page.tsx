import LoginForm from "@/Components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <section className="h-3/4">
        <div className="flex flex-col flex-grow">
          <h1>Login</h1>
          <LoginForm />
          <div />
          <button>Login w/ Google</button>
        </div>
        <div>
          New to RocketFinance? <Link href="/signup">SIGNUP</Link>
        </div>
      </section>
    </>
  );
}

import SignupForm from "@/Components/SignupForm";
import Link from "next/link";


export default function SignupPage() {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-full">
        <div className="w-3/4 flex flex-col p-2 py-6 bg-blue-200 rounded">
          <h1>Signup</h1>
          <SignupForm />
          <div className="my-2 border" />
          <button className="rounded-lg border py-2 bg-slate-400">
            Signup w/ Google
          </button>
        </div>
        <div className="text-sm mt-2">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/login">
            LOGIN
          </Link>
        </div>
      </section>
    </>
  )
}

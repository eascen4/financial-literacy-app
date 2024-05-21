"use client";
import AuthForm from "@/components/AuthForm";

const LoginPage = () => {
  return (
    <main className="bg-indigo-950 h-full text-slate-50 grid lg:grid-cols-2">
      <AuthForm type="login" />
      <div className="hidden lg:flex h-full bg-indigo-800 rounded-l-3xl" />
    </main>
  );
};
export default LoginPage;

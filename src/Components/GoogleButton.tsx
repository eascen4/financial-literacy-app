"use client";

import { signIn } from "next-auth/react";

export default function GoogleButton({text}) {
  return (
    <button
      onClick={() => signIn("google")}
      className="rounded-lg border py-2 bg-slate-400"
    >
      {text} w/ Google
    </button>
  );
}

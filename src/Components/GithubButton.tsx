"use client"

import { signIn } from "next-auth/react"

export default function GithubButton({text}) {
  return (
    <button
      onClick={() => signIn("github")}
      className="rounded-lg border py-2 bg-slate-400"
    >
      {text} w/ Github
    </button>
  )
}

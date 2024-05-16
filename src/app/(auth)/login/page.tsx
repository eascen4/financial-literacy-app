"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

const LoginPage = () => {
  return (
    <main>
        <Button onClick={() => signIn("github")}>Login with Github</Button>
    </main>
  )
}
export default LoginPage
'use client'

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

const SignOutButton = () => {
  return (
    <Button onClick={async () => await signOut()}>Sign out</Button>
  )
}
export default SignOutButton
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Adapter } from "next-auth/adapters";

import NextAuth from "next-auth";
import db from "./db/drizzle";

import github from "next-auth/providers/github"; "next-auth/providers/github";
import google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  providers: [github, google],
  
});

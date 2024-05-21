import { DrizzleAdapter } from "@auth/drizzle-adapter";

import NextAuth from "next-auth";
import db from "./db/drizzle";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { accounts, sessions, users, verificationTokens } from "./db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: accounts,
    usersTable: users,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Github,
    Google,
    Resend({
      from: "noreply@mail.eliasascencio.software",
    }),
  ],
  pages: {
    signIn: "/login"
  }
});

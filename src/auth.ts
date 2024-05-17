import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Adapter } from "next-auth/adapters";

import NextAuth from "next-auth";
import db from "./db/drizzle";

import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";

import { authSchema } from "./lib/constants";
import { getUserByEmail } from "./lib/server/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  providers: [
    github,
    google,
    credentials({
      async authorize(credentials) {
        const validatedFields = authSchema("login").safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            console.log("User not found or password missing");
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            console.log("Password match, user authenticated");
            return user;
          } else {
            console.log("Password mismatch");
          }
        } else {
          console.log("Validation failed:", validatedFields.error);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

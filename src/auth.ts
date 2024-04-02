import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { db } from "@/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token}) {
        if(token && session.user) {
            session.user.id = token.sub;
        }
      return session;
    },
  },
  session: {strategy: "jwt"},
  adapter: PrismaAdapter(db),
  ...authConfig,
});

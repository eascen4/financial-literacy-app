import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extends the User interface from next-auth to include custom properties
   */
  interface User {
    isAdmin: boolean;
    points: number;
  }

  /**
   * Extends the Session interface to include the custom properties in the session's user object
   */
  interface Session {
    user: User & DefaultSession["user"];
  }
}
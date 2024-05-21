"use server";

import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserById = (id: string) => {
  const user = db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      name: true,
      email: true,
      image: true,
      points: true,
      isAdmin: true,
    },
  });
  return user;
};

export const getUserByEmail = (email: string) => {
  const user = db.query.users.findFirst({ where: eq(users.email, email) });
  return user;
};

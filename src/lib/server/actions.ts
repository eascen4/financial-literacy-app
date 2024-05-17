"use server";

import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT, authSchema } from "../constants";
import { getUserByEmail } from "./db";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

const formSchema = authSchema("signup");
const loginSchema = authSchema("login");

export async function register(values: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) return false;

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return false;

  await db.insert(users).values({ email, password: hashedPassword, name });

  return true;
}

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return false;

  const { email, password } = validatedFields.data;

  await signIn("credentials", { email, password, redirect: true });
}

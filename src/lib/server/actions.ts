"use server";

import db from "@/db/drizzle";
import { cachedAuth } from "./caches";
import {
  challengeOptions,
  challengeProgress,
  challenges,
  lessons,
  users,
} from "@/db/schema";
import { z } from "zod";
import {
  challengeOptionSchema,
  challengeSchema,
  lessonSchema,
} from "../constants";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export const createLesson = async (data: z.infer<typeof lessonSchema>) => {
  const { title, description, order } = data;

  const session = await cachedAuth();

  if (!session?.user.isAdmin) return false;

  await db.insert(lessons).values({
    title,
    description,
    order,
  });

  revalidatePath("/lessons");
  revalidatePath("/lessons/[lessonId]", "page");
  return true;
};

export const createChallenge = async (
  data: z.infer<typeof challengeSchema>
) => {
  const { question, lessonId, order } = data;

  const session = await cachedAuth();

  if (!session?.user.isAdmin) return false;

  await db.insert(challenges).values({
    question,
    lessonId,
    order,
  });

  revalidatePath("/lessons");
  revalidatePath("/lessons/[lessonId]", "page");
  return true;
};

export const createChallengeOption = async (
  data: z.infer<typeof challengeOptionSchema>
) => {
  const { challengeId, correct, text } = data;

  const session = await cachedAuth();

  if (!session?.user.isAdmin) return false;

  await db.insert(challengeOptions).values({
    challengeId,
    correct,
    text,
  });

  revalidatePath("/lessons");
  revalidatePath("/lessons/[lessonId]", "page");
  return true;
};

export const createChallengeProgress = async (challengeId: number) => {
  const session = await cachedAuth();

  if (!session?.user.id) return false;

  const existingProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, session.user.id),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  if (existingProgress) {
    if (existingProgress.completed) return false;
    await db
      .update(challengeProgress)
      .set({ completed: true })
      .where(
        and(
          eq(challengeProgress.userId, session.user.id),
          eq(challengeProgress.challengeId, challengeId)
        )
      );

    await db
      .update(users)
      .set({ points: session.user.points + 10 })
      .where(eq(users.id, session.user.id));

    revalidatePath("/lessons");
    revalidatePath("/lessons/[lessonId]", "page");
    revalidatePath("/profile");
    revalidatePath("/leaderboard");
    return true;
  }

  await db.insert(challengeProgress).values({
    userId: session.user.id,
    challengeId,
    completed: true,
  });

  await db
    .update(users)
    .set({ points: session.user.points + 10 })
    .where(eq(users.id, session.user.id));

  revalidatePath("/lessons");
  revalidatePath("/lessons/[lessonId]", "page");
  revalidatePath("/profile");
  revalidatePath("/leaderboard");
  return true;
};

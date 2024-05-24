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

  if (!session?.user.isAdmin)
    return { success: false, message: "You are not an admin" };

  const array = await db
    .insert(lessons)
    .values({
      title,
      description,
      order,
    })
    .returning({ lessonId: lessons.id });

  if (array.length < 1 || !array[0].lessonId)
    return { success: false, message: "Failed to create the lesson" };

  const { lessonId } = array[0];

  revalidatePath("/lessons");
  revalidatePath("/lessons/[lessonId]", "page");
  return { success: true, message: `Lesson created ID: ${lessonId}` };
};

export const createChallenge = async (
  data: z.infer<typeof challengeSchema>
) => {
  const { question, lessonId, order } = data;

  const session = await cachedAuth();

  if (!session?.user.isAdmin)
    return { success: false, message: "You are not an admin" };

  const lessonExists = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  });

  if (!lessonExists)
    return { success: false, message: "Lesson with that ID does not exist" };

  const array = await db
    .insert(challenges)
    .values({
      question,
      lessonId,
      order,
    })
    .returning({ newChallengeId: challenges.id });

  if (array.length < 1 || !array[0].newChallengeId)
    return { success: false, message: "Failed to create the challenge" };

  const { newChallengeId } = array[0];

  revalidatePath("/lessons");
  revalidatePath("/lessons/[lessonId]", "page");
  return { success: true, message: `Challenge created ID: ${newChallengeId}` };
};

export const createChallengeOption = async (
  data: z.infer<typeof challengeOptionSchema>
) => {
  const { challengeId, correct, text } = data;

  const session = await cachedAuth();

  if (!session?.user.isAdmin)
    return { success: false, message: "You are not an admin" };

  const challengeExists = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challengeExists)
    return { success: false, message: "Challenge with that ID does not exist" };

  const array = await db
    .insert(challengeOptions)
    .values({
      challengeId,
      correct,
      text,
    })
    .returning({ newChallengeOptionId: challengeOptions.id });

  if (array.length < 1 || !array[0].newChallengeOptionId)
    return { success: false, message: "Failed to create the challenge option" };

  const { newChallengeOptionId } = array[0];

  revalidatePath("/lessons");
  revalidatePath("/lessons/[lessonId]", "page");
  return {
    success: true,
    message: `Challenge option created ID: ${newChallengeOptionId}`,
  };
};

export const createChallengeProgress = async (challengeId: number) => {
  const session = await cachedAuth();

  if (!session?.user.id) return { success: false, message: "You are not logged in"};

  const existingProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, session.user.id),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  if (existingProgress) {
    if (existingProgress.completed) return {success: false, message: "Challenge already completed"};
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
    return {success: true, message: "Challenge completed successfully"};
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
  return {success: true, message: "Challenge completed successfully"};
};

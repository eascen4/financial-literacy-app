"use server";

import db from "@/db/drizzle";
import { challengeOptions, challengeProgress, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cachedAuth } from "./caches";

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

export const getLeaderboard = async () => {
  const session = await cachedAuth();

  if (!session?.user.id) return [];

  const data = db.query.users.findMany({
    orderBy: (users, { desc }) => [desc(users.points)],
    limit: 10,
    columns: {
      id: true,
      name: true,
      points: true,
      image: true,
    },
  });

  return data;
};

export const getLessons = async () => {
  const session = await cachedAuth();

  if (!session?.user.id) return [];

  const lessons = db.query.lessons.findMany({
    with: {
      challenges: {
        with: {
          challengeProgresses: {
            where: eq(challengeProgress.userId, session.user.id),
            columns: {
              completed: true,
            },
          },
        },
      },
    },
  });

  return lessons;
};

export const getLessonById = async (id: string) => {
  const session = await cachedAuth();

  if (!session?.user.id) return null;

  const lesson = db.query.lessons.findFirst({
    where: eq(users.id, id),
    with: {
      challenges: {
        with: {
          challengeOptions: true,
          challengeProgresses: {
            where: eq(challengeProgress.userId, session.user.id),
            columns: {
              completed: true,
            },
          },
        },
      },
    },
  });

  return lesson;
};

import { auth } from "@/auth";
import { cache } from "react";
import { getLeaderboard, getLessonById, getLessons } from "./db";

export const cachedAuth = cache(auth);

export const cachedLeaderboard = cache(getLeaderboard);

export const cachedLessons = cache(getLessons);

export const cachedLessonById = cache(getLessonById);
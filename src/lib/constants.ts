import { z } from "zod";

export const AUTH_LINKS = [
  { name: "Sign Up", path: "/signup" },
  { name: "Log in", path: "/login" },
];

export const REST_OF_PAGES = [
  { name: "Profile", path: "/profile" },
  { name: "Shop", path: "/shop" },
  { name: "Rocket", path: "/rocket" },
  { name: "Lessons", path: "/lessons" },
  { name: "Leaderboard", path: "/leaderboard" },
  {name: "Admin", path: "/admin"}
];

export const AUTH_ROUTES = ["/login", "/signup"];

export const PUBLIC_ROUTES = ["/"];

export const PROTECTED_ROUTES = ["/profile", "/shop", "/rocket", "/lessons", "/leaderboard", "/admin"];

export const API_AUTH_PREFIX = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/profile";

export const lessonSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(5),
  order: z.number().int().min(1),
});

export const challengeSchema = z.object({
  question: z.string().min(5).max(50),
  lessonId: z.number().int().min(1),
  order: z.number().int().min(1),
});

export const challengeOptionSchema = z.object({
  text: z.string().min(5).max(50),
  challengeId: z.number().int().min(1),
  correct: z.boolean(),
});
"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavigationBar() {
  const [showMenu, setShowMenu] = useState(false);
  const auth = true;

  return (
    <div className="w-full h-16 fixed bg-blue-500 p-2 flex items-center justify-center">
      <nav className="w-full flex justify-between">
        <Link
          href="/"
          onClick={() => setShowMenu(false)}
          className="flex items-center gap-1"
        >
          <span className="material-symbols-rounded">Rocket_Launch</span>
          RocketFinance
        </Link>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="material-symbols-rounded"
        >
          menu
        </button>
        {showMenu && !auth && (
          <ul className="absolute top-16 left-0 w-full bg-slate-400">
            <Link
              href="/login"
              onClick={() => setShowMenu(false)}
              className="h-14 flex items-center justify-center border-b"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setShowMenu(false)}
              className="h-14 flex items-center justify-center border-b"
            >
              Signup
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setShowMenu(false)}
              className="h-14 flex items-center justify-center"
            >
              Leaderboard
            </Link>
          </ul>
        )}
        {showMenu && auth && (
          <ul className="absolute top-16 left-0 w-full bg-slate-400">
            <Link
              href="/lessons"
              onClick={() => setShowMenu(false)}
              className="h-14 flex items-center justify-center border-b"
            >
              Lessons
            </Link>
            <Link
              href="/shop"
              onClick={() => setShowMenu(false)}
              className="h-14 flex items-center justify-center border-b"
            >
              Shop
            </Link>
            <Link
              href="/rocket"
              onClick={() => setShowMenu(false)}
              className="h-14 flex items-center justify-center border-b"
            >
              Rocket
            </Link>
            <Link
              href="/test"
              onClick={() => setShowMenu(false)}
              className="h-14 flex items-center justify-center border-b"
            >
              Test
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setShowMenu(false)}
              className="h-14 flex items-center justify-center border-b"
            >
              Leaderboard
            </Link>
            <button className="h-14 w-full flex items-center justify-center">Logout</button>
          </ul>
        )}
      </nav>
    </div>
  );
}

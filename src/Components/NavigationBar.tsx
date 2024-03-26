"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavigationBar() {
  const [showMenu, setShowMenu] = useState(false);

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
        {showMenu && (
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
      </nav>
    </div>
  );
}

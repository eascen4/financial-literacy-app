import React from "react";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-2 text-left">
      <label>
        Email:
        <input type="email" className="border px-2 py-1 rounded block w-full" />
      </label>
      <label>
        Password:
        <input type="password" className="border px-2 py-1 rounded block w-full" />
      </label>
      <button>Login</button>
    </form>
  );
}

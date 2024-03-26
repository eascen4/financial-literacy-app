"use client";

export default function LoginForm() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login form submitted");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-left">
      <label>
        Email:
        <input type="email" className="border px-2 py-1 rounded block w-full" required />
      </label>
      <label>
        Password:
        <input
          type="password"
          className="border px-2 py-1 rounded block w-full" required
        />
      </label>
      <button
        className="inline rounded-lg border py-2 bg-slate-400"
      >
        Login
      </button>
    </form>
  );
}

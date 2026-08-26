"use client";

import { useState } from "react";

export default function AdminSetupPage() {
  const [form, setForm] = useState({ email: "", password: "", secret: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/admin/bootstrap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong.");
      return;
    }

    setStatus("done");
    setMessage(
      data.needsEmailConfirmation
        ? "Account created. It needs to be confirmed before you can log in — send the email you used to whoever set this up."
        : "Account created. You can log in now at /admin/login."
    );
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-xl font-semibold">Owner setup</h1>
      <p className="mt-2 text-sm text-muted">
        One-time bootstrap for the site owner&apos;s admin account. Requires the setup secret.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus-visible:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus-visible:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Setup secret
          <input
            type="password"
            required
            value={form.secret}
            onChange={(e) => setForm({ ...form, secret: e.target.value })}
            className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus-visible:border-accent"
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-60"
        >
          {status === "loading" ? "Creating…" : "Create owner account"}
        </button>

        {message && (
          <p className={`text-sm ${status === "error" ? "text-critical" : "text-positive"}`}>{message}</p>
        )}
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword(form);

    if (signInError) {
      setStatus("error");
      setError(signInError.message);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-xl font-semibold">Owner login</h1>
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus-visible:border-accent"
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-60"
        >
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
        {error && <p className="text-sm text-critical">{error}</p>}
      </form>
    </div>
  );
}

"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { finalCta } from "@/lib/content";
import { Button } from "./Button";

type Status = "idle" | "submitting" | "done" | "error";

export function WaitlistForm() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setStatus("error");
      return;
    }
    setStatus("submitting");

    // TODO: wire this up to a real backend (e.g. a Next.js route handler at
    // app/api/waitlist/route.ts, or a service like Resend / Loops / Supabase).
    // For now we just simulate a short delay and show the success state.
    await new Promise((r) => setTimeout(r, 600));

    setStatus("done");
  }

  if (status === "done") {
    return (
      <p role="status" className="mx-auto inline-flex items-center gap-2 rounded-2xl bg-white/80 px-5 py-3 text-sm text-ink shadow-sm">
        <CheckCircle2 size={18} className="text-chip-green" aria-hidden="true" />
        {finalCta.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto w-full max-w-md">
      <div className="glass flex flex-col gap-2 rounded-2xl p-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          {finalCta.emailLabel}
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={finalCta.emailPlaceholder}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${inputId}-err` : undefined}
          className="h-11 flex-1 rounded-xl bg-transparent px-3 text-[15px] text-ink placeholder:text-ink-subtle focus-visible:outline-2 focus-visible:outline-accent"
        />
        <Button type="submit" variant="dark" disabled={status === "submitting"}>
          {status === "submitting" ? finalCta.submitting : finalCta.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
      {status === "error" && (
        <p id={`${inputId}-err`} role="alert" className="mt-2 text-left text-sm text-chip-pink">
          {finalCta.error}
        </p>
      )}
    </form>
  );
}

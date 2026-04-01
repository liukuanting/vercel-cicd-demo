"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const [mode, setMode] = useState<Mode>("login");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const actionLabel = useMemo(
    () =>
      mode === "login"
        ? "\u767b\u5165\u6703\u54e1"
        : "\u5efa\u7acb\u5e33\u865f",
    [mode]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const displayName = String(formData.get("displayName") || "");
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName
            }
          }
        });

        if (error) {
          throw error;
        }

        setMessage(
          "\u8a3b\u518a\u5b8c\u6210\uff0c\u8acb\u5207\u63db\u5230\u767b\u5165\u6a21\u5f0f\u4f7f\u7528\u5e33\u865f\u5bc6\u78bc\u767b\u5165\u3002"
        );
        setMode("login");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "\u767b\u5165\u5931\u6557\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66\u3002"
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="preview-ribbon">MEMBERS ONLY</div>
      <h1>
        {mode === "login"
          ? "\u767b\u5165\u5f8c\u958b\u59cb\u5831\u968a"
          : "\u5efa\u7acb\u7fbd\u7403\u6703\u54e1\u5e33\u865f"}
      </h1>
      <p className="muted">
        {
          "\u53ea\u6709\u6703\u54e1\u53ef\u4ee5\u9810\u7d04\u5834\u6b21\u8207\u767c\u8d77\u65b0\u6642\u6bb5\u3002\u767b\u5165\u5f8c\u5c31\u80fd\u9032\u5165\u6703\u54e1\u4e2d\u5fc3\u7ba1\u7406\u81ea\u5df1\u7684\u7fbd\u7403\u6d3b\u52d5\u3002"
        }
      </p>

      <div className="auth-switch" style={{ marginTop: 18 }}>
        <button
          type="button"
          className={mode === "login" ? "primary-btn" : "secondary-btn"}
          onClick={() => setMode("login")}
        >
          {"\u767b\u5165"}
        </button>
        <button
          type="button"
          className={mode === "signup" ? "primary-btn" : "secondary-btn"}
          onClick={() => setMode("signup")}
        >
          {"\u8a3b\u518a"}
        </button>
      </div>

      <form className="form-grid" onSubmit={handleSubmit} style={{ marginTop: 22 }}>
        {mode === "signup" ? (
          <div className="field">
            <label htmlFor="displayName">{"\u66b1\u7a31"}</label>
            <input
              id="displayName"
              name="displayName"
              placeholder="\u4f8b\u5982\uff1aAllen"
              required
            />
          </div>
        ) : null}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="member@example.com" required />
        </div>

        <div className="field">
          <label htmlFor="password">{"\u5bc6\u78bc"}</label>
          <input id="password" name="password" type="password" minLength={6} required />
        </div>

        <button type="submit" className="primary-btn" disabled={pending}>
          {pending ? "\u8655\u7406\u4e2d..." : actionLabel}
        </button>
      </form>

      {message ? (
        <p className="notice" style={{ marginTop: 16 }}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

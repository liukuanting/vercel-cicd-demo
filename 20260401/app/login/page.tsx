import { AuthForm } from "@/components/auth-form";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export default function LoginPage() {
  if (!hasSupabaseEnv()) {
    return (
      <main className="auth-shell">
        <div className="container">
          <div className="auth-card">
            <div className="preview-ribbon">SETUP REQUIRED</div>
            <h1>{"\u8acb\u5148\u5b8c\u6210 Supabase \u8a2d\u5b9a"}</h1>
            <p className="muted">
              {
                "\u76ee\u524d\u7f3a\u5c11 Supabase \u74b0\u5883\u8b8a\u6578\u3002\u8acb\u5728 Vercel \u8a2d\u5b9a NEXT_PUBLIC_SUPABASE_URL \u8207 NEXT_PUBLIC_SUPABASE_ANON_KEY \u5f8c\u518d\u4f7f\u7528\u6703\u54e1\u767b\u5165\u3002"
              }
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-shell">
      <div className="container">
        <AuthForm />
      </div>
    </main>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { SignOutButton } from "@/components/sign-out-button";

export const metadata: Metadata = {
  title: "CourtCrew \u7fbd\u7403\u5831\u968a",
  description:
    "\u904b\u52d5\u98a8\u683c\u7fbd\u7403\u5831\u968a\u7db2\u7ad9\uff0c\u63d0\u4f9b\u6703\u54e1\u767b\u5165\u3001\u958b\u5718\u8207\u9810\u7d04\u529f\u80fd\u3002"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configured = hasSupabaseEnv();
  let user: { id: string } | null = null;

  if (configured) {
    const supabase = await createClient();
    const {
      data: { user: currentUser }
    } = await supabase.auth.getUser();
    user = currentUser;
  }

  return (
    <html lang="zh-Hant">
      <body>
        <div className="page-shell">
          <header className="site-header">
            <div className="container header-row">
              <Link href="/" className="brand">
                <div className="brand-mark">BC</div>
                <div>
                  <div>CourtCrew</div>
                  <div className="muted">
                    {"\u7fbd\u7403\u5831\u968a\u4ff1\u6a02\u90e8"}
                  </div>
                </div>
              </Link>
              <nav className="nav-links">
                <Link href="/#sessions" className="pill-link">
                  {"\u63ea\u5718\u5834\u6b21"}
                </Link>
                <Link href={configured ? "/dashboard" : "/#setup"} className="pill-link">
                  {"\u6703\u54e1\u4e2d\u5fc3"}
                </Link>
                {user ? (
                  <SignOutButton />
                ) : (
                  <Link href={configured ? "/login" : "/#setup"} className="primary-btn">
                    {configured ? "\u6703\u54e1\u767b\u5165" : "Setup Supabase"}
                  </Link>
                )}
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

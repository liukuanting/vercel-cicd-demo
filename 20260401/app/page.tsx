import Link from "next/link";
import { SessionCard } from "@/components/session-card";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { SessionRecord } from "@/lib/types";

function normalizeSession(raw: any): SessionRecord {
  return {
    id: raw.id,
    title: raw.title,
    session_date: raw.session_date,
    start_time: raw.start_time,
    end_time: raw.end_time,
    min_players: raw.min_players,
    max_players: raw.max_players,
    skill_level: raw.skill_level,
    fee: raw.fee,
    shuttlecock: raw.shuttlecock,
    location: raw.location,
    notes: raw.notes,
    organizer_id: raw.organizer_id,
    created_at: raw.created_at,
    profiles: raw.profiles ?? null,
    session_bookings: Array.isArray(raw.session_bookings)
      ? raw.session_bookings.map((booking: any) => ({
          id: booking.id,
          user_id: booking.user_id
        }))
      : []
  };
}

async function getSessions() {
  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("badminton_sessions")
    .select(
      "id, title, session_date, start_time, end_time, min_players, max_players, skill_level, fee, shuttlecock, location, notes, organizer_id, created_at, profiles(display_name), session_bookings(id, user_id)"
    )
    .order("session_date", { ascending: true })
    .order("start_time", { ascending: true });

  return (data ?? []).map(normalizeSession);
}

export default async function HomePage() {
  const configured = hasSupabaseEnv();
  const sessions = await getSessions();

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-card">
            <span className="hero-tag">BADMINTON MATCHUP PLATFORM</span>
            <h1>
              {"\u958b\u5718\u3001\u5831\u968a\u3001\u76f4\u63a5\u4e0a\u5834\u3002"}
            </h1>
            <p>
              {
                "\u5c08\u70ba\u7fbd\u7403\u6703\u54e1\u8a2d\u8a08\u7684\u63ea\u5718\u8207\u9810\u7d04\u5e73\u53f0\u3002\u6bcf\u4e00\u5834\u90fd\u6e05\u695a\u6a19\u793a\u65e5\u671f\u3001\u6642\u9593\u3001\u4eba\u6578\u3001\u7a0b\u5ea6\u3001\u8cbb\u7528\u8207\u63d0\u4f9b\u7403\u7a2e\uff0c\u627e\u7403\u53cb\u66f4\u5feb\u66f4\u6e96\u3002"
              }
            </p>

            <div className="hero-actions">
              {configured ? (
                <>
                  <Link href="/dashboard" className="primary-btn">
                    {"\u9032\u5165\u6703\u54e1\u4e2d\u5fc3"}
                  </Link>
                  <Link href="/login" className="secondary-btn">
                    {"\u5148\u767b\u5165\u518d\u9810\u7d04"}
                  </Link>
                </>
              ) : (
                <a href="#setup" className="primary-btn">
                  {"\u5148\u5b8c\u6210 Supabase \u8a2d\u5b9a"}
                </a>
              )}
            </div>

            <div className="hero-stats">
              <div className="stat-chip">
                <strong>{"\u6703\u54e1\u5236"}</strong>
                <span>{"\u767b\u5165\u5f8c\u624d\u80fd\u9810\u7d04\u8207\u958b\u5718"}</span>
              </div>
              <div className="stat-chip">
                <strong>{"\u5834\u6b21\u900f\u660e"}</strong>
                <span>
                  {"\u65e5\u671f\u3001\u6642\u6bb5\u3001\u8cbb\u7528\u8207\u7a0b\u5ea6\u5b8c\u6574\u63ed\u9732"}
                </span>
              </div>
              <div className="stat-chip">
                <strong>Supabase</strong>
                <span>
                  {"\u6d3b\u52d5\u3001\u6703\u54e1\u3001\u9810\u7d04\u90fd\u53ef\u76f4\u63a5\u9032\u8cc7\u6599\u5eab"}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="preview-ribbon">SPORT READY</div>
            <h2>
              {"\u4f60\u9700\u8981\u7684\u5831\u968a\u8cc7\u8a0a\uff0c\u9019\u88e1\u4e00\u6b21\u770b\u5b8c"}
            </h2>
            <div className="preview-list">
              <div className="preview-item">
                <strong>
                  {"\u5e7e\u6708\u5e7e\u865f / \u5e7e\u9ede\u5230\u5e7e\u9ede"}
                </strong>
                <p className="muted">
                  {"\u5831\u540d\u524d\u5148\u78ba\u8a8d\u6642\u6bb5\uff0c\u4e0d\u518d\u7528\u804a\u5929\u5ba4\u6162\u6162\u554f\u3002"}
                </p>
              </div>
              <div className="preview-item">
                <strong>
                  {
                    "\u6700\u5c11\u5e7e\u4eba / \u6700\u591a\u5e7e\u4eba / \u5be6\u529b\u9ad8\u4f4e"
                  }
                </strong>
                <p className="muted">
                  {
                    "\u8b93\u63ea\u5718\u9580\u6abb\u8207\u53c3\u52a0\u689d\u4ef6\u66f4\u660e\u78ba\uff0c\u6e1b\u5c11\u843d\u5dee\u3002"
                  }
                </p>
              </div>
              <div className="preview-item">
                <strong>{"\u8cbb\u7528\u8207\u7403\u7a2e"}</strong>
                <p className="muted">
                  {
                    "\u4f8b\u5982\u6bd4\u8cfd\u7d1a\u7fbd\u7403\u3001\u8a13\u7df4\u7403\u3001\u96f6\u6253\u898f\u5247\u90fd\u80fd\u5beb\u6e05\u695a\u3002"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="sessions">
        <div className="container">
          {!configured ? (
            <div className="notice" id="setup" style={{ marginBottom: 20 }}>
              {
                "\u76ee\u524d\u5c1a\u672a\u8a2d\u5b9a Supabase \u74b0\u5883\u8b8a\u6578\u3002\u8acb\u5728 Vercel Project Settings > Environment Variables \u52a0\u4e0a NEXT_PUBLIC_SUPABASE_URL \u8207 NEXT_PUBLIC_SUPABASE_ANON_KEY\uff0c\u518d\u91cd\u65b0 Deploy\u3002"
              }
            </div>
          ) : null}
          <div className="section-head">
            <div>
              <h2>{"\u8fd1\u671f\u7fbd\u7403\u5834\u6b21"}</h2>
              <p className="muted">
                {
                  "\u516c\u958b\u986f\u793a\u6d3b\u52d5\u8cc7\u8a0a\uff0c\u771f\u6b63\u9810\u7d04\u8207\u5efa\u7acb\u5834\u6b21\u9700\u5148\u767b\u5165\u6703\u54e1\u3002"
                }
              </p>
            </div>
            <Link href={configured ? "/dashboard" : "/#setup"} className="secondary-btn">
              {configured ? "\u6211\u8981\u767c\u8d77\u65b0\u6642\u6bb5" : "Supabase Setup"}
            </Link>
          </div>

          {configured && sessions.length > 0 ? (
            <div className="session-grid">
              {sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="empty">
              {configured
                ? "\u76ee\u524d\u9084\u6c92\u6709\u5834\u6b21\u3002\u767b\u5165\u6703\u54e1\u4e2d\u5fc3\u5f8c\uff0c\u5c31\u53ef\u4ee5\u767c\u8d77\u7b2c\u4e00\u5834\u7fbd\u7403\u5831\u968a\u6d3b\u52d5\u3002"
                : "Supabase \u8a2d\u5b9a\u5b8c\u6210\u5f8c\uff0c\u9019\u88e1\u6703\u986f\u793a\u5834\u6b21\u8207\u6703\u54e1\u529f\u80fd\u3002"}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

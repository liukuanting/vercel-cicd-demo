import { redirect } from "next/navigation";
import { BookingButton } from "@/components/booking-button";
import { CreateSessionForm } from "@/components/create-session-form";
import { formatDate, formatMoney } from "@/lib/format";
import { skillLabel } from "@/lib/labels";
import { createClient } from "@/lib/supabase/server";
import type { SessionRecord } from "@/lib/types";

async function getDashboardData() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: sessions } = await supabase
    .from("badminton_sessions")
    .select(
      "id, title, session_date, start_time, end_time, min_players, max_players, skill_level, fee, shuttlecock, location, notes, organizer_id, created_at, profiles(display_name), session_bookings(id, user_id)"
    )
    .order("session_date", { ascending: true })
    .order("start_time", { ascending: true });

  return {
    user,
    sessions: (sessions || []) as SessionRecord[]
  };
}

export default async function DashboardPage() {
  const { user, sessions } = await getDashboardData();

  return (
    <main className="dashboard-shell">
      <div className="container stack">
        <div className="dashboard-head">
          <div>
            <h1>{"\u6703\u54e1\u4e2d\u5fc3"}</h1>
            <p className="muted">
              {"\u4f60\u597d\uff0c"}
              {user.user_metadata.display_name || user.email}
              {
                "\u3002\u4f60\u53ef\u4ee5\u5728\u9019\u88e1\u767c\u8d77\u7fbd\u7403\u6642\u6bb5\uff0c\u6216\u76f4\u63a5\u9810\u7d04\u5176\u4ed6\u6703\u54e1\u5efa\u7acb\u7684\u5834\u6b21\u3002"
              }
            </p>
          </div>
        </div>

        <div className="dashboard-layout">
          <CreateSessionForm />

          <div className="stack">
            {sessions.length > 0 ? (
              sessions.map((session) => {
                const bookingCount = session.session_bookings?.length ?? 0;
                const isBooked = session.session_bookings?.some(
                  (booking) => booking.user_id === user.id
                );

                return (
                  <section key={session.id} id={`session-${session.id}`} className="form-card">
                    <div className="session-top">
                      <div>
                        <div className="preview-ribbon">{formatDate(session.session_date)}</div>
                        <h2 style={{ marginBottom: 8 }}>{session.title}</h2>
                        <p className="muted">{session.location}</p>
                      </div>
                      <div className="skill-badge">{skillLabel(session.skill_level)}</div>
                    </div>

                    <div className="session-info" style={{ marginTop: 18 }}>
                      <div className="info-box">
                        <span className="info-label">{"\u6642\u9593"}</span>
                        <strong>
                          {session.start_time.slice(0, 5)} - {session.end_time.slice(0, 5)}
                        </strong>
                      </div>
                      <div className="info-box">
                        <span className="info-label">{"\u8cbb\u7528"}</span>
                        <strong>{formatMoney(session.fee)}</strong>
                      </div>
                      <div className="info-box">
                        <span className="info-label">{"\u540d\u984d"}</span>
                        <strong>
                          {bookingCount} / {session.max_players} {"\u4eba"}
                        </strong>
                      </div>
                      <div className="info-box">
                        <span className="info-label">{"\u7403\u7a2e"}</span>
                        <strong>{session.shuttlecock}</strong>
                      </div>
                    </div>

                    {session.notes ? (
                      <p className="muted" style={{ marginTop: 16 }}>
                        {session.notes}
                      </p>
                    ) : null}

                    <div className="card-actions">
                      <div className="spot-badge">
                        {"\u767c\u8d77\u4eba\uff1a"}
                        {session.profiles?.display_name || "\u6703\u54e1"}
                        {" / "}
                        {"\u6700\u5c11 "}
                        {session.min_players}
                        {" \u4eba"}
                      </div>
                      <BookingButton sessionId={session.id} isBooked={Boolean(isBooked)} />
                    </div>
                  </section>
                );
              })
            ) : (
              <div className="empty">
                {
                  "\u9084\u6c92\u6709\u4efb\u4f55\u5834\u6b21\uff0c\u5de6\u5074\u8868\u55ae\u53ef\u4ee5\u5148\u5efa\u7acb\u7b2c\u4e00\u500b\u6642\u6bb5\u3002"
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

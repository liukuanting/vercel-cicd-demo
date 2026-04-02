import Link from "next/link";
import { formatDate, formatMoney } from "@/lib/format";
import { skillLabel } from "@/lib/labels";
import type { SessionRecord } from "@/lib/types";

type SessionCardProps = {
  session: SessionRecord;
  userId?: string;
  showBookingAction?: boolean;
};

export function SessionCard({
  session,
  userId,
  showBookingAction = false
}: SessionCardProps) {
  const bookingCount = session.session_bookings?.length ?? 0;
  const remainingSpots = Math.max(session.max_players - bookingCount, 0);
  const isBooked = session.session_bookings?.some(
    (booking) => booking.user_id === userId
  );
  const organizerName = Array.isArray(session.profiles)
    ? session.profiles[0]?.display_name
    : session.profiles?.display_name;

  return (
    <article className="session-card">
      <div className="session-top">
        <div>
          <div className="preview-ribbon">{formatDate(session.session_date)}</div>
          <h3>{session.title}</h3>
          <p className="muted">{session.location}</p>
        </div>
        <div className="skill-badge">{skillLabel(session.skill_level)}</div>
      </div>

      <div className="session-meta">
        <div className="meta-row">
          <span className="meta-label">{"\u6642\u9593"}</span>
          <strong>
            {session.start_time.slice(0, 5)} - {session.end_time.slice(0, 5)}
          </strong>
        </div>
        <div className="meta-row">
          <span className="meta-label">{"\u7fbd\u7403 / \u7403\u7a2e\u63d0\u4f9b"}</span>
          <strong>{session.shuttlecock}</strong>
        </div>
      </div>

      <div className="session-info">
        <div className="info-box">
          <span className="info-label">{"\u8cbb\u7528"}</span>
          <strong>{formatMoney(session.fee)}</strong>
        </div>
        <div className="info-box">
          <span className="info-label">{"\u4eba\u6578\u9650\u5236"}</span>
          <strong>
            {session.min_players} - {session.max_players} {"\u4eba"}
          </strong>
        </div>
        <div className="info-box">
          <span className="info-label">{"\u76ee\u524d\u5831\u540d"}</span>
          <strong>
            {bookingCount} {"\u4eba"}
          </strong>
        </div>
        <div className="info-box">
          <span className="info-label">{"\u5269\u9918\u540d\u984d"}</span>
          <strong>
            {remainingSpots} {"\u4f4d"}
          </strong>
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
          {organizerName || "\u6703\u54e1"}
        </div>
        {showBookingAction ? (
          <Link href={`/dashboard#session-${session.id}`} className="primary-btn">
            {isBooked ? "\u67e5\u770b\u6211\u7684\u9810\u7d04" : "\u524d\u5f80\u9810\u7d04"}
          </Link>
        ) : (
          <Link href="/login" className="secondary-btn">
            {"\u6703\u54e1\u767b\u5165\u5f8c\u9810\u7d04"}
          </Link>
        )}
      </div>
    </article>
  );
}

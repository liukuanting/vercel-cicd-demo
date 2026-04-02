export type SkillLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "competitive";

export type SessionProfile =
  | {
      display_name: string | null;
    }
  | Array<{
      display_name: string | null;
    }>
  | null;

export type SessionRecord = {
  id: string;
  title: string;
  session_date: string;
  start_time: string;
  end_time: string;
  min_players: number;
  max_players: number;
  skill_level: SkillLevel;
  fee: number;
  shuttlecock: string;
  location: string;
  notes: string | null;
  organizer_id: string;
  created_at: string;
  profiles?: SessionProfile;
  session_bookings?: Array<{
    id: string;
    user_id: string;
  }>;
};

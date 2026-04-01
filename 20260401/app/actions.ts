"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SkillLevel } from "@/lib/types";

export async function createSessionAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const payload = {
    organizer_id: user.id,
    title: String(formData.get("title") || ""),
    location: String(formData.get("location") || ""),
    session_date: String(formData.get("session_date") || ""),
    start_time: String(formData.get("start_time") || ""),
    end_time: String(formData.get("end_time") || ""),
    min_players: Number(formData.get("min_players") || 0),
    max_players: Number(formData.get("max_players") || 0),
    skill_level: String(
      formData.get("skill_level") || "intermediate"
    ) as SkillLevel,
    fee: Number(formData.get("fee") || 0),
    shuttlecock: String(formData.get("shuttlecock") || ""),
    notes: String(formData.get("notes") || "") || null
  };

  if (payload.max_players < payload.min_players) {
    throw new Error("\u6700\u591a\u4eba\u6578\u4e0d\u80fd\u5c0f\u65bc\u6700\u5c11\u4eba\u6578\u3002");
  }

  const { error } = await supabase.from("badminton_sessions").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
}

export async function bookSessionAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const sessionId = String(formData.get("session_id") || "");

  const { data: session, error: sessionError } = await supabase
    .from("badminton_sessions")
    .select("id, max_players, session_bookings(id)")
    .eq("id", sessionId)
    .single();

  if (sessionError || !session) {
    throw new Error("\u627e\u4e0d\u5230\u5834\u6b21\u8cc7\u6599\u3002");
  }

  const currentCount = session.session_bookings?.length ?? 0;

  if (currentCount >= session.max_players) {
    throw new Error("\u9019\u500b\u5834\u6b21\u5df2\u7d93\u6eff\u984d\u3002");
  }

  const { error } = await supabase.from("session_bookings").insert({
    session_id: sessionId,
    user_id: user.id
  });

  if (error && !error.message.toLowerCase().includes("duplicate")) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
}

import type { SkillLevel } from "@/lib/types";

export function skillLabel(level: SkillLevel) {
  switch (level) {
    case "beginner":
      return "\u521d\u968e";
    case "intermediate":
      return "\u4e2d\u968e";
    case "advanced":
      return "\u9032\u968e";
    case "competitive":
      return "\u7af6\u6280";
    default:
      return level;
  }
}

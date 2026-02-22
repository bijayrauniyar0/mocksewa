export type NotificationType = {
  id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  created_at: string; // ISO date string
  actor_id: number;
  meta: Record<string, any>; 
  type: "discussion" | "leaderboard" | "user";
};

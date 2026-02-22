// app/user-profile/[user_id]/page.tsx
import { redirect } from "next/navigation";

type UserProfileRedirectProps = {
  params: Promise<{ user_id: string }>;
};
export default async function UserProfileRedirect({params}: UserProfileRedirectProps) {
  const { user_id } = await params;
  redirect(`/user-profile/${user_id}/stats`);
}

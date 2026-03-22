import { FlexColumn } from "@/components/common/Layouts";
import { Card } from "@/components/ui/card";
import UserProfileTabs from "@/components/UserProfile/ProfileTabs";
import UserDetailsSection from "@/components/UserProfile/UserDetailsSection";
import { getUserPublicProfileById } from "@/services/ServerSide/userProfile";
import { User } from "@/store/auth";

type UserProfilePageProps = {
  params: Promise<{
    user_id: string;
  }>;
  children: React.ReactNode;
};
export default async function RootLayout({
  children,
  params,
}: UserProfilePageProps) {
  const resolvedParams = await params; // Await params here
  const user_id = resolvedParams.user_id;
  let userProfileData: User | null = null;
  try {
    const { data } = await getUserPublicProfileById(user_id);
    userProfileData = data;
  } catch {
    // console.log(error);
  }
  return (
    <FlexColumn className="max-2xl:px-4 max-sm:px-2 max-md:px-2 px-6 gap-2 md:gap-4 overflow-hidden md:py-0 md:max-h-[calc(100vh-4.5rem)] md:overflow-y-auto">
      <div className="md:fixed md:w-[18rem] pt-7">
        <Card className="md:h-[calc(100vh-6.5rem)] p-4 max-md:pb-0 ">
          <UserDetailsSection initialData={userProfileData} />
          <div className="md:hidden">
            <UserProfileTabs />
          </div>
        </Card>
      </div>
      <main className="md:pl-[19rem]">
        <div className="pt-7 pb-4 sticky top-0 bg-background z-[10] max-md:hidden">
          <UserProfileTabs />
        </div>
        <div className="px-1">{children}</div>
      </main>
    </FlexColumn>
  );
}

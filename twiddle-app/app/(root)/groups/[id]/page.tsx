import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchGroupDetails } from "@/lib/actions/group.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { groupTabs } from "@/constants";
import Image from "next/image";
import TweetsTab from "@/components/shared/TweetsTab";
import UserCard from "@/components/cards/UserCard";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await currentUser();
  if (!user) return null;

  const p = await params;
  const groupDetails = await fetchGroupDetails(p.id);
  if (!groupDetails) {
    return (
      <section className="flex flex-col items-center text-light-1">
        <h1 className="mt-10 mb-10 text-heading1-bold">Group not found</h1>
        <Image src="/assets/oops.svg" alt="opps" width={200} height={200} />
      </section>
    );
  }
  return (
    <section>
      <ProfileHeader
        accountId={groupDetails.createdBy.id}
        authUserId={user.id}
        name={groupDetails.name}
        username={groupDetails.username}
        imgUrl={groupDetails.image}
        bio={groupDetails.bio}
        type="Group"
      />

      <div className="mt-9">
        <Tabs defaultValue="tweets" className="w-full">
          <TabsList className="tab">
            {groupTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Tweets" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-light-2 text-[10px] leading-[140%] font-medium">
                    {groupDetails.tweets.length}
                  </p>
                )}

                {tab.label === "Members" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-light-2 text-[10px] leading-[140%] font-medium">
                    {groupDetails.members.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="tweets" className="w-full text-light-1">
            <TweetsTab
              currentUserId={user.id}
              accountId={groupDetails._id.toString()}
              accountType="Group"
              user={user}
            />
          </TabsContent>

          <TabsContent value="members" className="mt-9 w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {groupDetails.members.map(
                (member: {
                  id: string;
                  name: string;
                  username: string;
                  image: string;
                }) => (
                  <UserCard
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    username={member.username}
                    imgUrl={member.image}
                  />
                )
              )}
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;

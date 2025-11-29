import TweetCard from "@/components/cards/TweetCard";
import Comment from "@/components/forms/Comment";
import { fetchTweetById, isTweetByUser } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const p = await params;
  const tweet = await fetchTweetById(p.id);

  if (!tweet) {
    return (
      <div className=" flex flex-col items-center text-light-1">
        <h1 className="mt-10 mb-10 text-heading1-bold">
          Sorry, tweet doesn&apos;t exist anymore
        </h1>
        <Image src="/assets/oops.svg" alt="opps" width={200} height={200} />
      </div>
    );
  }

  {
    const isOwner = await isTweetByUser(
      userInfo._id.toString(),
      tweet._id.toString()
    );

    return (
      <section className="relative">
        <div>
          <TweetCard
            key={tweet._id}
            id={tweet._id.toString()}
            DB_userID={userInfo._id.toString()}
            retweetOf={tweet.retweetOf}
            currentUserId={user?.id || ""}
            parentId={tweet.parentId}
            content={tweet.text}
            author={tweet.author}
            group={tweet.group}
            createdAt={tweet.createdAt}
            comments={tweet.children}
            likes={tweet.likes}
            liked={userInfo.likedTweets.includes(tweet._id)}
            owner={isOwner}
          />
        </div>

        <div className="mt-7">
          <Comment
            tweetId={tweet._id.toString()}
            currentUserImg={userInfo.image}
            currentUserId={userInfo._id.toString()}
          />
        </div>

        <div className="mt-10">
          {tweet.children.map(
            async (child: {
              _id: string;
              parentId: string | null;
              text: string;
              author: { id: string; image: string; name: string };
              group: { id: string; name: string; image: string } | null;
              createdAt: string;
              children: { author: { id: string; image: string } }[];
              likes: number;
            }) => {
              const isOwner = await isTweetByUser(
                userInfo._id.toString(),
                child._id.toString()
              );
              return (
                <TweetCard
                  key={child._id}
                  id={child._id.toString()}
                  DB_userID={userInfo._id.toString()}
                  currentUserId={user?.id || ""}
                  parentId={child.parentId}
                  content={child.text}
                  author={child.author}
                  group={child.group}
                  createdAt={child.createdAt}
                  comments={child.children}
                  isComment
                  owner={isOwner}
                  likes={child.likes}
                  liked={userInfo.likedTweets.includes(child._id)}
                />
              );
            }
          )}
        </div>
      </section>
    );
  }
};

export default Page;

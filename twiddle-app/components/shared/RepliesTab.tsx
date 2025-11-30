import { fetchUser, fetchUserReplies } from "@/lib/actions/user.actions";
import TweetCard from "../cards/TweetCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { isTweetByUser } from "@/lib/actions/tweet.actions";
import type { RepliesTabProps, RepliesTabResult } from "@/interfaces";
  



const RepliesTab = async ({ currentUserId, accountId, user }: RepliesTabProps) => {
    const userInfo = await fetchUser(user.id)
    const result: RepliesTabResult = await fetchUserReplies(accountId);

    return (
      <section className="mt-9 flex flex-col gap-10">
        {result.replies.map(async (reply) => 
          {
            const isOwner = await isTweetByUser(userInfo._id.toString(), reply._id.toString())
            const parentTweetId: string | null = reply.parentId
            return (
              <div key={reply._id}>
                <TweetCard
                id={reply._id.toString()}
                owner = { isOwner }  
                DB_userID={userInfo._id.toString()}
                currentUserId={currentUserId}
                parentId={reply.parentId}
                content={reply.text}
                author={{ name: result.name, image: result.image, id: result.id }}
                group={reply.group}
                createdAt={reply.createdAt}
                comments={reply.children}
                likes={reply.likes}
                liked={ userInfo.likedTweets.includes(reply._id) } 
              />
                  <Link href={`/tweet/${parentTweetId}`}>
                    <Button size='sm' className='group-card_btn mt-5'>
                      See original tweet
                    </Button>
                  </Link>
              </div>
              
            )
          }
        )}
      </section>
    );


}

export default RepliesTab

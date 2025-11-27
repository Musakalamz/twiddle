'use client'

import { retweetTweet } from "@/lib/actions/tweet.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
    tweetId: string;
    userId: string;
    groupId: string | null;
    retweeted: boolean;
}

const RetweetButton = ({
    tweetId,
    userId,
    groupId,
    retweeted,
}: Props) => {
    const path = usePathname() // Get the current path

    const handleRetweet = async () => {
        try {
            await retweetTweet({
                tweetId,
                userId,
                path,
                groupId,
            })

            alert('Retweeted successfully')

        } catch(error: unknown) {
            const message = error instanceof Error ? error.message : String(error)
            if (message.includes('already retweeted')) {
                alert('You already retweeted this tweet before')
              } else {
                alert('An error occurred while retweeting. Please try again.');
            }
        }
       
    }

    return (
        <>
            <button onClick={handleRetweet}>
                {retweeted ?  (
                    <Image
                    src='/assets/retweeted.svg' 
                    alt="repost" 
                    width={24} 
                    height={24} 
                    className="cursor-pointer object-contain"
                /> 
                ) : 
                <Image
                    src='/assets/repost.svg' 
                    alt="repost" 
                    width={24} 
                    height={24} 
                    className="cursor-pointer object-contain"
                />
                }
                
            </button>
        </>
    )

}

export default RetweetButton

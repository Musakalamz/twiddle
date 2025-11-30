"use client";

import { likeOrDislikeTweet } from "@/lib/actions/user.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { TweetLikeButtonProps } from "@/interfaces";

const TweetLikeButton = ({
  tweetId,
  currentUserId,
  likes,
  liked,
}: TweetLikeButtonProps) => {
  const path = usePathname(); // Get the current path

  const handleLike = async () => {
    try {
      await likeOrDislikeTweet(currentUserId, tweetId, path);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Failed to like or dislike tweet:", message);
    }
  };

  return (
    <>
      <Image
        src={liked ? "/assets/heart-red.svg" : "/assets/heart.svg"} // Change the icon based on liked state
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={handleLike}
      />
      {likes > 0 && (
        <p className="ml-[-15px] rounded-sm bg-light-4 px-2 py-1 text-light-2 text-[10px] leading-[140%] font-medium">
          {likes}
        </p>
      )}
    </>
  );
};

export default TweetLikeButton;

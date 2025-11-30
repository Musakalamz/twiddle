"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import type { ProfileHeaderProps } from "@/interfaces";

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: ProfileHeaderProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={imgUrl}
                alt="Profile Image"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-left text-light-1 text-[24px] leading-[140%] font-bold">
                {name}
              </h2>
              <p className="text-gray-1 text-[16px] leading-[140%] font-medium">
                @{username}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-lg text-light-2 text-[16px] leading-[140%] font-normal">
          {bio}
        </p>
        <div className="mt-12 h-0.5 w-full bg-dark-3" />

        {accountId === authUserId && type === "User" && (
          <Button
            className="user-card_btn w-20"
            onClick={() => {
              router.push(`/profile/edit/`);
            }}
          >
            Edit profile
          </Button>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;

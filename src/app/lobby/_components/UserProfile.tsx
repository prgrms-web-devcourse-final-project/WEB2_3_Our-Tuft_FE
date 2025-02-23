import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface UserProfile {
  id: string;
  nickname: string;
  profileImage: string;
  stats: {
    wins: number;
    losses: number;
    winRate: number;
  };
  bio: string;
}

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "1",
    nickname: "jeongmin",
    profileImage: "/assets/images/profile.png",
    stats: {
      wins: 150,
      losses: 50,
      winRate: 75,
    },
    bio: "잘 부탁드립니다. 퍼블리싱 너무 힘드네요",
  });

  return (
    <div className="w-full h-full bg-[var(--color-point)] rounded-xl p-4">
      {" "}
      {/* padding 조정 */}
      <div className="flex h-full">
        {/* 프로필 이미지 */}
        <div className="relative w-[40%] h-full overflow-hidden">
          <Image
            src={userProfile.profileImage}
            alt={`${userProfile.nickname}의 프로필`}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>

        {/* 유저 정보 */}
        <div className="flex flex-col justify-between w-[60%] pl-4">
          <div className="flex flex-col">
            {/* 닉네임 */}
            <h2 className="text-2xl font-bold text-white mb-4">
              {userProfile.nickname}
            </h2>
            {/* 전적 정보 */}
            <div className="flex flex-col gap-1 text-sm text-white mb-2">
              {/* 승패 정보 */}
              <div className="flex items-center gap-2">
                <span>{userProfile.stats.wins}승</span>
                <span>{userProfile.stats.losses}패</span>
              </div>
              {/* 승률 정보 */}
              <div className="flex items-center gap-1">
                <span>승률</span>
                <span>{userProfile.stats.winRate}%</span>
              </div>
            </div>
            {/* 자기소개 */}
            <p className="text-sm text-white break-words line-clamp-2">
              {userProfile.bio}
            </p>
          </div>

          {/* 프로필 편집 버튼 */}
          <div className="flex justify-center">
            <Link
              href="/my"
              className="h-[30px] w-[60%] bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] text-white text-base rounded-lg cursor-pointer transition-all inline-flex items-center justify-center"
            >
              편집
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

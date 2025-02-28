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
  const [userProfile] = useState<UserProfile>({
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
    <div className="w-full h-full bg-[var(--color-point)] rounded-xl p-[0.7em] text-[0.85vw] md:text-[0.75vw] xl:text-[0.55vw]">
      <div className="flex h-full">
        {/* 프로필 이미지 */}
        <div className="relative w-[32%] h-full overflow-hidden">
          <div className="relative w-full h-[85%] top-[7%]">
            <Image
              src={userProfile.profileImage}
              alt={`${userProfile.nickname}의 프로필`}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>

        {/* 유저 정보 */}
        <div className="flex flex-col justify-between w-[68%] pl-[1.4em] mt-[0.9em]">
          <div className="flex flex-col">
            {/* 닉네임 */}
            <h2 className="text-[2.5em] font-bold text-white mb-[0.4em] truncate">
              {userProfile.nickname}
            </h2>

            {/* 태블릿 모드*/}
            <div className="flex items-center justify-between xl:hidden mb-[0.4em]">
              {/* 승률 정보 (태블릿 모드) */}
              <div className="flex items-center gap-[0.4em] text-[1.7em] text-white">
                <span>승률</span>
                <span>{userProfile.stats.winRate}%</span>
              </div>

              {/* 편집 버튼 (태블릿 모드) */}
              <Link
                href="/my"
                className="h-[2.5em] w-[6em] bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] text-white text-[1.4em] rounded-lg cursor-pointer transition-all inline-flex items-center justify-center"
              >
                편집
              </Link>
            </div>

            {/* 데스크탑 모드 */}
            <div className="hidden xl:flex xl:flex-col gap-[0.15em] text-[1.7em] text-white mb-[0.4em]">
              {/* 승패 정보 */}
              <div className="items-center gap-[0.4em] flex">
                <span>{userProfile.stats.wins}승</span>
                <span>{userProfile.stats.losses}패</span>
              </div>
              {/* 승률 정보 */}
              <div className="flex items-center gap-[0.4em]">
                <span>승률</span>
                <span>{userProfile.stats.winRate}%</span>
              </div>
            </div>

            {/* 자기소개 */}
            <p className="text-[1.5em] text-white break-words line-clamp-2 hidden xl:block">
              {userProfile.bio}
            </p>
          </div>

          {/* 프로필 편집 버튼 (데스크탑 모드) */}
          <div className="hidden xl:flex justify-center">
            <Link
              href="/my"
              className="h-[2.5em] w-[55%] bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] text-white text-[1.4em] rounded-lg cursor-pointer transition-all inline-flex items-center justify-center"
            >
              편집
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

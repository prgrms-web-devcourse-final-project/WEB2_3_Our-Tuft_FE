import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonGroup from "./ButtonGroup";

interface MobileProfile {
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

export default function MobileProfile() {
  const [mobileProfile] = useState<MobileProfile>({
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
    <div className="bg-[var(--color-point)] h-full w-full rounded-lg flex items-center justify-between p-2 px-3 sm:px-4 overflow-hidden">
      {/* 왼쪽 영역: 프로필 이미지와 정보 */}
      <div className="flex items-center h-full">
        {/* 프로필 이미지 */}
        <div className="relative w-[10vw] h-[10vw] min-w-[2.5rem] min-h-[2.5rem] max-w-[3.5rem] max-h-[3.5rem] mr-3">
          <Image
            src={mobileProfile.profileImage}
            alt={`${mobileProfile.nickname}의 프로필`}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* 프로필 정보 */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-[0.7rem] font-bold text-white">
              {mobileProfile.nickname}
            </h2>
            <p className="text-[0.65rem] text-white">
              승률: {mobileProfile.stats.winRate}%
            </p>
          </div>
          {/* 프로필 편집 버튼 */}
          <div className="flex items-center mt-[0.2rem]">
            <Link
              href="/my"
              className="h-[1rem] w-[3rem] bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] text-white text-[0.6rem] rounded-lg cursor-pointer transition-all inline-flex items-center justify-center"
            >
              편집
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 scale-[0.85] transform origin-right ml-2">
        <ButtonGroup />
      </div>
    </div>
  );
}

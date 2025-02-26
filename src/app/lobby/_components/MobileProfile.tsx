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
    <div className="bg-[var(--color-point)] h-full w-full rounded-lg flex items-center p-2">
      {/* 프로필 이미지 */}
      <div className="relative w-16 h-16 mr-4">
        <Image
          src={mobileProfile.profileImage}
          alt={`${mobileProfile.nickname}의 프로필`}
          layout="fill"
          className="object-cover rounded-xl"
        />
      </div>
      {/* 프로필 정보 */}
      <div className="flex flex-col justify-between h-full flex-grow">
        <div>
          <h2 className="text-xs font-bold text-white">
            {mobileProfile.nickname}
          </h2>
          <p className="text-xs text-white">
            승률: {mobileProfile.stats.winRate}%
          </p>
        </div>
        {/* 프로필 편집 버튼 */}
        <div className="flex items-center mt-0.3">
          <Link
            href="/my"
            className="h-[20px] w-[65px] bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] text-white text-xs rounded-lg cursor-pointer transition-all inline-flex items-center justify-center"
            style={{ marginLeft: "-5px" }}
          >
            편집
          </Link>
        </div>
      </div>
      {/* 버튼 그룹 */}
      <div className="ml-4 flex-shrink-0">
        <ButtonGroup />
      </div>
    </div>
  );
}

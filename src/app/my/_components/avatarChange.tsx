"use client";
import Image from "next/image";
import { useState } from "react";

interface AvatarProfile {
  nickname: string;
  eye: {
    itemId: number;
    imageUrl: string;
  };
  mouth: {
    itemId: number;
    imageUrl: string;
  };
  skin: {
    itemId: number;
    imageUrl: string;
  };
  nickColor: {
    itemId: number;
    value: string;
  };
}

// 각 카테고리별 타입 정의
type CategoryType = "eye" | "mouth" | "skin" | "nickColor";

// 카테고리별 아이템 매핑을 위한 인덱스 시그니처 타입
interface CategoryMapping {
  [key: number]: CategoryType;
}

export default function AvatarChange() {
  const [avatarProfile, setAvatarProfile] = useState<AvatarProfile>({
    nickname: "Jeongmin",
    eye: {
      itemId: 1,
      imageUrl: "/assets/profile/eyes/default-eye.png",
    },
    mouth: {
      itemId: 1,
      imageUrl: "/assets/profile/mouth/default-mouth.png",
    },
    skin: {
      itemId: 1,
      imageUrl: "/assets/profile/skin/default-skin.png",
    },
    nickColor: {
      itemId: 1,
      value: "#000000",
    },
  });

  // 아이템 변경 함수
  const changeItem = (category: CategoryType, itemId: number) => {
    const itemUrls: Record<CategoryType, Record<number, string>> = {
      eye: {
        1: "/assets/profile/eyes/default-eye.png",
        2: "/assets/profile/eyes/eye2.png",
        3: "/assets/profile/eyes/eye3.png",
        4: "/assets/profile/eyes/special-eye.png",
      },
      mouth: {
        1: "/assets/profile/mouth/default-mouth.png",
        2: "/assets/profile/mouth/mouth2.png",
        3: "/assets/profile/mouth/mouth3.png",
        4: "/assets/profile/mouth/special-mouth.png",
      },
      skin: {
        1: "/assets/profile/skin/default-skin.png",
        2: "/assets/profile/skin/skin2.png",
        3: "/assets/profile/skin/skin3.png",
      },
      nickColor: {
        1: "#000000",
        2: "#FF5733",
        3: "#33A8FF",
        4: "#33FF57",
      },
    };

    if (category === "nickColor") {
      setAvatarProfile((prev) => ({
        ...prev,
        [category]: {
          itemId,
          value: itemUrls[category][itemId],
        },
      }));
    } else {
      setAvatarProfile((prev) => ({
        ...prev,
        [category]: {
          itemId,
          imageUrl: itemUrls[category][itemId],
        },
      }));
    }
  };

  // 카테고리별 아이템 매핑
  const categoryMapping: CategoryMapping = {
    1: "eye",
    2: "mouth",
    3: "skin",
    4: "nickColor",
  };

  // 현재 아이템 ID 가져오는 함수
  const getCurrentItemId = (category: CategoryType): number => {
    return avatarProfile[category].itemId;
  };

  return (
    <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:mb-0">
      <div className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px] xl:w-[620px] h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] bg-[var(--color-second)]/70 rounded-xl flex flex-col items-center justify-center relative">
        <div className="w-[60%] md:w-[65%] max-w-[350px] aspect-square bg-[var(--color-secondPoint)] rounded-t-[28px] overflow-hidden relative">
          {/* 배경 이미지 */}
          <div className="absolute inset-0">
            <Image
              src="/assets/profile/profile-bg.png"
              alt="프로필 배경"
              fill
              className="object-cover"
              style={{ objectPosition: "center top" }}
              priority
            />
          </div>

          {/* 스킨(가장 아래층) */}
          <div className="absolute inset-0 z-5">
            <Image
              src={avatarProfile.skin.imageUrl}
              alt="스킨"
              fill
              className="object-contain"
              style={{ objectPosition: "center bottom" }}
              priority
            />
          </div>

          {/* 눈(중간층) */}
          <div
            className="absolute inset-x-0 z-10"
            style={{ top: "25%", height: "35%" }}
          >
            <div className="relative w-[80%] h-full mx-auto">
              <Image
                src={avatarProfile.eye.imageUrl}
                alt="눈"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 입(최상층) */}
          <div
            className="absolute inset-x-0 z-20"
            style={{ top: "40%", height: "30%" }}
          >
            <div className="relative w-[70%] h-full mx-auto">
              <Image
                src={avatarProfile.mouth.imageUrl}
                alt="입"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* 사용자 닉네임 */}
        <div className="w-[60%] md:w-[65%] max-w-[350px] mt-0 bg-white rounded-b-2xl text-lg md:text-xl lg:text-2xl py-3 md:py-4 px-2 text-center drop-shadow-custom flex items-center justify-center">
          <span
            className="font-semibold"
            style={{ color: avatarProfile.nickColor.value }}
          >
            {avatarProfile.nickname}
          </span>
        </div>

        <div className="absolute left-[3%] md:left-[1%] lg:left-[2%] xl:left-[3%] top-[52%] lg:top-[53%] xl:top-[56%] transform -translate-y-1/2 flex flex-col space-y-4 lg:space-y-6 xl:space-y-8">
          {[1, 2, 3, 4].map((index) => {
            const category = categoryMapping[index];
            const currentItemId = getCurrentItemId(category);
            const prevItemId = Math.max(1, currentItemId - 1);

            return (
              <button
                key={`left-${index}`}
                className="hover:scale-110 transition-transform cursor-pointer"
                onClick={() => changeItem(category, prevItemId)}
              >
                <Image
                  src="/assets/images/pixel-left.png"
                  alt="이전 아이템"
                  width={80}
                  height={80}
                  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
                />
              </button>
            );
          })}
        </div>

        <div className="absolute right-[3%] md:right-[1%] lg:right-[2%] xl:right-[3%] top-[52%] lg:top-[53%] xl:top-[56%] transform -translate-y-1/2 flex flex-col space-y-4 lg:space-y-6 xl:space-y-8">
          {[1, 2, 3, 4].map((index) => {
            const category = categoryMapping[index];
            const currentItemId = getCurrentItemId(category);
            const nextItemId = Math.min(4, currentItemId + 1);

            return (
              <button
                key={`right-${index}`}
                className="hover:scale-110 transition-transform cursor-pointer"
                onClick={() => changeItem(category, nextItemId)}
              >
                <Image
                  src="/assets/images/pixel-right.png"
                  alt="다음 아이템"
                  width={80}
                  height={80}
                  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

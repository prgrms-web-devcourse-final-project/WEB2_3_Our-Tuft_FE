"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { useLoginStore } from "../../../store/store";

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

interface AvatarChangeProps {
  profile: AvatarProfile;
  isLoading?: boolean;
  error?: string | null;
  onProfileChange: (updatedProfile: AvatarProfile) => void;
}

type CategoryType = "eye" | "mouth" | "skin" | "nickColor";

interface CategoryMapping {
  [key: number]: CategoryType;
}

// 카테고리별 itemId 범위 정의
const ITEM_ID_RANGES = {
  eye: { min: 1, max: 10 },
  mouth: { min: 11, max: 20 },
  skin: { min: 21, max: 30 },
  nickColor: { min: 31, max: 38 },
};

// 닉네임 색상 매핑 테이블
const COLOR_MAPPING: { [key: number]: string } = {
  31: "#ED4D0E",
  32: "#166534",
  33: "#DDDD05",
  34: "#B91C1C",
  35: "#F761A0",
  36: "#000000",
  37: "#7E22CE",
  38: "#4338CA",
};

// 기본 이미지 경로 정의 (API 응답 실패용)
const DEFAULT_ITEMS = {
  eye: {
    itemId: 1,
    imageUrl:
      "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/eye/eye1.png",
  },
  mouth: {
    itemId: 11,
    imageUrl:
      "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/mouth/mouth1.png",
  },
  skin: {
    itemId: 21,
    imageUrl:
      "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/skin/skin1.png",
  },
  nickColor: {
    itemId: 31,
    value: COLOR_MAPPING[36],
  },
};

export default function AvatarChange({
  profile,
  isLoading = false,
  error = null,
  onProfileChange,
}: AvatarChangeProps) {
  // profile이 null이거나 undefined일 경우 기본값 사용
  const [avatarProfile, setAvatarProfile] = useState<AvatarProfile>(
    profile || {
      nickname: "",
      eye: DEFAULT_ITEMS.eye,
      mouth: DEFAULT_ITEMS.mouth,
      skin: DEFAULT_ITEMS.skin,
      nickColor: DEFAULT_ITEMS.nickColor,
    }
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(error);

  // profile prop이 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    if (profile) {
      // nickColor의 value가 없을 경우 매핑 테이블에서 가져오기
      if (profile.nickColor && !profile.nickColor.value) {
        const colorId = profile.nickColor.itemId;
        const colorValue = COLOR_MAPPING[colorId] || COLOR_MAPPING[36];

        setAvatarProfile({
          ...profile,
          nickColor: {
            ...profile.nickColor,
            value: colorValue,
          },
        });
      } else {
        setAvatarProfile(profile);
      }
    }
  }, [profile]);

  // 아이템 변경 함수
  const changeItem = (category: CategoryType, action: "prev" | "next") => {
    try {
      setIsSaving(true);

      const currentItemId = avatarProfile[category].itemId;
      const { min, max } = ITEM_ID_RANGES[category];

      // 이전/다음 아이템 ID 계산
      let newItemId = currentItemId;
      if (action === "prev" && currentItemId > min) {
        newItemId = currentItemId - 1;
      } else if (action === "next" && currentItemId < max) {
        newItemId = currentItemId + 1;
      } else {
        setIsSaving(false);
        return;
      }

      // 로컬 상태 업데이트 및 부모 컴포넌트에 변경 사항 전달
      let updatedProfile = { ...avatarProfile };

      if (category === "nickColor") {
        // 색상일 경우 - 매핑 테이블에서 색상 가져오기
        const newColor = COLOR_MAPPING[newItemId] || "#000000";

        updatedProfile = {
          ...updatedProfile,
          [category]: {
            itemId: newItemId,
            value: newColor,
          },
        };
      } else {
        const partName = category; // eye, mouth, skin
        const partNumber = newItemId - min + 1; // 1부터 시작하는 인덱스
        const newImageUrl = `https://team09-bucket.s3.ap-northeast-2.amazonaws.com/${partName}/${partName}${partNumber}.png`;

        updatedProfile = {
          ...updatedProfile,
          [category]: {
            itemId: newItemId,
            imageUrl: newImageUrl,
          },
        };
      }

      // 로컬 상태 업데이트
      setAvatarProfile(updatedProfile);

      // 부모 컴포넌트에 변경 사항 전달
      onProfileChange(updatedProfile);
    } catch (err) {
      console.error("아바타 변경 중 오류:", err);
      setLocalError(
        err instanceof Error
          ? err.message
          : "아바타 변경 중 오류가 발생했습니다."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 카테고리별 아이템 매핑
  const categoryMapping: CategoryMapping = {
    1: "eye",
    2: "mouth",
    3: "skin",
    4: "nickColor",
  };

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:mb-0 h-[400px]">
        <div className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px] xl:w-[620px] h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] bg-[var(--color-second)]/70 rounded-xl flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-point)]"></div>
          <p className="mt-4 text-[var(--color-point)] font-medium">
            아바타 정보를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  // 에러 UI
  if (localError) {
    return (
      <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:mb-0 h-[400px]">
        <div className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px] xl:w-[620px] h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] bg-[var(--color-second)]/70 rounded-xl flex flex-col items-center justify-center p-4 text-center">
          <div className="text-red-500 text-lg font-medium mb-3">
            {localError}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[var(--color-point)] text-white rounded-lg hover:bg-[var(--color-point)]/80 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:mb-0">
      <div className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px] xl:w-[620px] h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] bg-[var(--color-second)]/70 rounded-xl flex flex-col items-center justify-center relative">
        {isSaving && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 rounded-xl">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[var(--color-point)]"></div>
              <span>저장 중...</span>
            </div>
          </div>
        )}

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
        <div className="w-[60%] md:w-[65%] max-w-[350px] mt-0 bg-white rounded-b-2xl text-lg md:text-xl lg:text-2xl py-3 md:py-4 px-2 text-center drop-shadow-custom flex items-center justify-center ">
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
            const currentItemId = avatarProfile[category].itemId;
            const { min } = ITEM_ID_RANGES[category];
            const isPrevDisabled = currentItemId <= min;

            return (
              <button
                key={`left-${index}`}
                className="hover:scale-110 transition-transform cursor-pointer"
                onClick={() => changeItem(category, "prev")}
                disabled={isSaving || isPrevDisabled}
              >
                <Image
                  src="/assets/images/pixel-left.png"
                  alt="이전 아이템"
                  width={80}
                  height={80}
                  className={`w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] ${
                    isPrevDisabled ? "opacity-50" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="absolute right-[3%] md:right-[1%] lg:right-[2%] xl:right-[3%] top-[52%] lg:top-[53%] xl:top-[56%] transform -translate-y-1/2 flex flex-col space-y-4 lg:space-y-6 xl:space-y-8">
          {[1, 2, 3, 4].map((index) => {
            const category = categoryMapping[index];
            const currentItemId = avatarProfile[category].itemId;
            const { max } = ITEM_ID_RANGES[category];
            const isNextDisabled = currentItemId >= max;

            return (
              <button
                key={`right-${index}`}
                className="hover:scale-110 transition-transform cursor-pointer"
                onClick={() => changeItem(category, "next")}
                disabled={isSaving || isNextDisabled}
              >
                <Image
                  src="/assets/images/pixel-right.png"
                  alt="다음 아이템"
                  width={80}
                  height={80}
                  className={`w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] ${
                    isNextDisabled ? "opacity-50" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

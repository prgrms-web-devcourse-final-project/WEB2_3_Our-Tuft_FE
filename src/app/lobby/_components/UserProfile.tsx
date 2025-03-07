import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { useLoginStore } from "../../../store/store";

// 기본 이미지 경로 정의
const DEFAULT_EYE_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/eye/default-eye.png";
const DEFAULT_MOUTH_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/mouth/default-mouth.png";
const DEFAULT_SKIN_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/skin/default-skin.png";

// 아이템 ID에서 이미지 URL을 가져오는 함수
const getImageUrl = (
  type: "eye" | "mouth" | "skin",
  itemId: number
): string => {
  // 아이템 ID가 1이면 기본 이미지 반환
  if (itemId === 1) {
    if (type === "eye") return DEFAULT_EYE_URL;
    if (type === "mouth") return DEFAULT_MOUTH_URL;
    if (type === "skin") return DEFAULT_SKIN_URL;
    return DEFAULT_SKIN_URL;
  }

  // 그 외의 경우 해당 ID의 이미지 URL 생성
  return `https://team09-bucket.s3.ap-northeast-2.amazonaws.com/${type}/${type}${itemId}.png`;
};

interface UserProfile {
  nickname: string;
  introduction: string;
  level: number;
  exp: number;
  progress: number;
  totalGames: number;
  wins: number;
  winRate: number;
  eye: {
    itemId: number;
    imageUrl?: string;
  };
  mouth: {
    itemId: number;
    imageUrl?: string;
  };
  skin: {
    itemId: number;
    imageUrl?: string;
  };
  nickColor: {
    itemId: number;
    value: string;
  };
}

export default function UserProfile() {
  const { token } = useLoginStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);

        // 토큰이 없으면 사용자 정보를 가져올 수 없음을 알림
        if (!token) {
          setError("로그인이 필요합니다");
          setIsLoading(false);
          return;
        }

        const data = await defaultFetch<UserProfile>("/myInfo");

        // API 응답에 imageUrl이 없는 경우 사용할 이미지 URL을 설정
        if (data) {
          if (data.eye && !data.eye.imageUrl) {
            data.eye.imageUrl = getImageUrl("eye", data.eye.itemId);
          }

          if (data.mouth && !data.mouth.imageUrl) {
            data.mouth.imageUrl = getImageUrl("mouth", data.mouth.itemId);
          }

          if (data.skin && !data.skin.imageUrl) {
            data.skin.imageUrl = getImageUrl("skin", data.skin.itemId);
          }
        }

        setUserProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
        console.error("사용자 정보 로딩 중 오류:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !userProfile) {
    return (
      <div className="w-full h-full bg-[var(--color-point)] rounded-xl p-[0.7em] flex items-center justify-center text-white text-[1.2em]">
        {error || "사용자 정보를 불러올 수 없습니다."}
      </div>
    );
  }

  const losses = userProfile.totalGames - userProfile.wins;

  return (
    <div className="w-full h-full bg-[var(--color-point)] rounded-xl p-[0.7em] text-[0.85vw] md:text-[0.75vw] xl:text-[0.55vw] flex flex-col justify-between">
      {/* 상단 영역: 프로필 이미지와 정보 */}
      <div className="flex h-[85%]">
        {/* 프로필 이미지 */}
        <div className="relative w-[35%] h-full overflow-hidden flex items-center">
          <div
            className="relative w-full rounded-xl overflow-hidden"
            style={{ aspectRatio: "1/1.2" }}
          >
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
              <Image
                src="/assets/profile/profile-bg.png"
                alt="프로필 배경"
                fill
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 15vw"
                className="object-cover rounded-xl"
                style={{ objectPosition: "center top" }}
                priority
              />
            </div>

            {/* 스킨 */}
            <div className="absolute inset-0 z-5">
              <Image
                src={userProfile?.skin?.imageUrl || DEFAULT_SKIN_URL}
                alt="스킨"
                fill
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 15vw"
                className="object-contain"
                style={{ objectPosition: "center bottom" }}
                priority
              />
            </div>

            {/* 눈(중간층) */}
            <div
              className="absolute inset-x-0 z-10"
              style={{ top: "30%", height: "35%" }}
            >
              <div className="relative w-[80%] h-full mx-auto">
                <Image
                  src={userProfile?.eye?.imageUrl || DEFAULT_EYE_URL}
                  alt="눈"
                  fill
                  sizes="(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* 입(최상층)  */}
            <div
              className="absolute inset-x-0 z-20"
              style={{ top: "45%", height: "30%" }}
            >
              <div className="relative w-[70%] h-full mx-auto">
                <Image
                  src={userProfile?.mouth?.imageUrl || DEFAULT_MOUTH_URL}
                  alt="입"
                  fill
                  sizes="(max-width: 768px) 15vw, (max-width: 1200px) 12vw, 8vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* 유저 정보 */}
        <div className="flex flex-col w-[60%] pl-[1.7em] mt-[0.9em]">
          <div className="flex flex-col">
            {/* 닉네임 */}
            <h2
              className="text-[2.5em] font-bold text-white mb-[0.4em] truncate"
              style={{ color: userProfile?.nickColor?.value || "#FFFFFF" }}
            >
              {userProfile?.nickname || "사용자"}
            </h2>

            {/* 태블릿 모드*/}
            <div className="flex items-center justify-between xl:hidden mb-[0.4em]">
              {/* 승률 정보 (태블릿 모드) */}
              <div className="flex items-center gap-[0.4em] text-[1.7em] text-white">
                <span>승률</span>
                <span>{userProfile?.winRate || 0}%</span>
              </div>

              <Link
                href="/my"
                className="h-[2.5em] w-[6em] bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] text-white text-[1.4em] rounded-lg cursor-pointer transition-all inline-flex items-center justify-center xl:hidden"
              >
                편집
              </Link>
            </div>

            {/* 데스크탑 모드 */}
            <div className="hidden xl:flex xl:flex-col gap-[0.15em] text-[1.7em] text-white mb-[0.4em]">
              {/* 승패 정보 */}
              <div className="items-center gap-[0.4em] flex">
                <span>{userProfile?.wins || 0}승</span>
                <span>{losses || 0}패</span>
              </div>
              {/* 승률 정보 */}
              <div className="flex items-center gap-[0.4em]">
                <span>승률</span>
                <span>{userProfile?.winRate || 0}%</span>
              </div>
            </div>

            {/* 자기소개 */}
            <p className="text-[1.5em] text-white break-words line-clamp-2 hidden xl:block">
              {userProfile?.introduction || "자기소개가 없습니다."}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden xl:flex justify-center items-center w-full h-[15%]">
        <Link
          href="/my"
          className="h-[2.5em] w-[30%] mb-[0.7em] bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] text-white text-[1.4em] rounded-lg cursor-pointer transition-all inline-flex items-center justify-center"
        >
          편집
        </Link>
      </div>
    </div>
  );
}

// 로딩 중 표시할 스켈레톤 컴포넌트
function ProfileSkeleton() {
  return (
    <div className="w-full h-full bg-[var(--color-point)] rounded-xl p-[0.7em] text-[0.85vw] md:text-[0.75vw] xl:text-[0.55vw] flex flex-col justify-between">
      <div className="flex h-[85%]">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="relative w-[35%] h-full overflow-hidden flex items-center">
          <div
            className="relative w-full rounded-xl overflow-hidden bg-gray-700 animate-pulse"
            style={{ aspectRatio: "1/1.2" }}
          ></div>
        </div>

        {/* 유저 정보 스켈레톤 */}
        <div className="flex flex-col w-[60%] pl-[1.7em] mt-[0.9em] gap-2">
          {/* 닉네임 스켈레톤 */}
          <div className="h-[2.5em] w-[70%] bg-gray-700 rounded-md animate-pulse"></div>

          {/* 승률 정보 스켈레톤 */}
          <div className="h-[1.7em] w-[50%] bg-gray-700 rounded-md animate-pulse mt-2"></div>

          {/* 자기소개 스켈레톤 */}
          <div className="h-[3em] w-[90%] bg-gray-700 rounded-md animate-pulse mt-2 hidden xl:block"></div>
        </div>
      </div>

      <div className="hidden xl:flex justify-center items-center w-full h-[15%]">
        <div className="h-[2.5em] w-[30%] mb-[0.7em] bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

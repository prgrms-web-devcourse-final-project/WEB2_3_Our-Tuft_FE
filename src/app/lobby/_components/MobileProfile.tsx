import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonGroup from "./ButtonGroup";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { useLoginStore } from "../../../store/store";

// 기본 이미지 경로 정의
const DEFAULT_EYE_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/eye/eye1.png";
const DEFAULT_MOUTH_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/mouth/mouth1.png";
const DEFAULT_SKIN_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/skin/skin1.png";

// API 응답 타입
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

// 사용자 프로필 타입
interface UserProfile {
  userId: number;
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

export default function MobileProfile() {
  const { token } = useLoginStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);

        if (!token) {
          setError("로그인이 필요합니다");
          setIsLoading(false);
          return;
        }

        const response = await defaultFetch<ApiResponse<UserProfile>>(
          "/myInfo"
        );

        if (response.isSuccess && response.data) {
          setUserProfile(response.data);
        } else {
          setError(response.message || "사용자 정보를 불러올 수 없습니다.");
        }
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

  // 닉네임 포맷팅 함수
  const formatNickname = (nickname: string): string => {
    if (nickname && nickname.includes("@")) {
      return nickname.split("@")[0];
    }
    return nickname;
  };

  // 로딩 중일 때
  if (isLoading) {
    return <MobileProfileSkeleton />;
  }

  // 오류 발생 시
  if (error || !userProfile) {
    return (
      <div className="bg-[var(--color-point)] h-full w-full rounded-lg flex items-center justify-center p-2 text-white text-xs">
        {error || "사용자 정보를 불러올 수 없습니다."}
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-point)] h-full w-full rounded-lg flex items-center justify-between p-2 px-3 sm:px-4 overflow-hidden">
      {/* 왼쪽 영역: 프로필 이미지와 정보 */}
      <div className="flex items-center h-full">
        {/* 프로필 이미지 - 아바타 컴포지션으로 변경 */}
        <div className="relative w-[10vw] h-[10vw] min-w-[2.5rem] min-h-[2.5rem] max-w-[3.5rem] max-h-[3.5rem] mr-3 overflow-hidden rounded-xl">
          {/* 배경 */}
          <div className="absolute inset-0">
            <Image
              src="/assets/profile/profile-bg.png"
              alt="프로필 배경"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 스킨 */}
          <div className="absolute inset-0 z-5">
            <Image
              src={userProfile.skin?.imageUrl || DEFAULT_SKIN_URL}
              alt="스킨"
              fill
              className="object-contain"
              style={{ objectPosition: "center bottom" }}
              priority
            />
          </div>

          {/* 눈 */}
          <div
            className="absolute inset-x-0 z-10"
            style={{ top: "27%", height: "35%" }}
          >
            <div className="relative w-[80%] h-full mx-auto">
              <Image
                src={userProfile.eye?.imageUrl || DEFAULT_EYE_URL}
                alt="눈"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 입 */}
          <div
            className="absolute inset-x-0 z-20"
            style={{ top: "45%", height: "30%" }}
          >
            <div className="relative w-[70%] h-full mx-auto">
              <Image
                src={userProfile.mouth?.imageUrl || DEFAULT_MOUTH_URL}
                alt="입"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* 프로필 정보 */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-[0.7rem] font-bold text-white">
              {formatNickname(userProfile.nickname)}
            </h2>
            <p className="text-[0.65rem] text-white">
              승률: {userProfile.winRate || 0}%
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

// 로딩 중 표시할 스켈레톤 컴포넌트
function MobileProfileSkeleton() {
  return (
    <div className="bg-[var(--color-point)] h-full w-full rounded-lg flex items-center justify-between p-2 px-3 sm:px-4 overflow-hidden">
      {/* 왼쪽 영역: 프로필 이미지와 정보 */}
      <div className="flex items-center h-full">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="w-[10vw] h-[10vw] min-w-[2.5rem] min-h-[2.5rem] max-w-[3.5rem] max-h-[3.5rem] mr-3 rounded-xl bg-gray-700 animate-pulse"></div>

        {/* 프로필 정보 스켈레톤 */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="w-[4rem] h-[0.7rem] bg-gray-700 rounded-md animate-pulse mb-1"></div>
            <div className="w-[3rem] h-[0.65rem] bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          {/* 버튼 스켈레톤 */}
          <div className="flex items-center mt-[0.2rem]">
            <div className="h-[1rem] w-[3rem] bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 scale-[0.85] transform origin-right ml-2">
        <ButtonGroup />
      </div>
    </div>
  );
}

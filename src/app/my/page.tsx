"use client";
import { useState, useEffect } from "react";
import { defaultFetch } from "../../service/api/defaultFetch";
import { useLoginStore } from "../../store/store";
import { useRouter } from "next/navigation";
import AvatarChange from "./_components/avatarChange";
import InfoChange from "./_components/infoChange";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

// ApiResponse 타입 정의
interface ApiResponse<T> {
  isSuccess: boolean;
  message?: string;
  data?: T;
}

// AvatarProfile 타입 정의
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
  introduction?: string;
}

// 토스트 컴포넌트
interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

function Toast({ message, type, isVisible }: ToastProps) {
  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}
      >
        {type === "success" ? (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        {message}
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const { token } = useLoginStore();
  const [originalProfile, setOriginalProfile] = useState<AvatarProfile | null>(
    null
  );
  const [editedProfile, setEditedProfile] = useState<AvatarProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // 토스트 관련 상태
  const [toast, setToast] = useState<ToastProps>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // 토스트 표시 함수
  const showToast = (message: string, type: "success" | "error") => {
    setToast({
      message,
      type,
      isVisible: true,
    });

    // 3초 후 토스트 자동 숨김
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // 유저 프로필 로딩
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!token) {
          setError("로그인이 필요합니다");
          setIsLoading(false);
          return;
        }

        const response = await defaultFetch<ApiResponse<AvatarProfile>>(
          "/myInfo"
        );

        if (response.isSuccess && response.data) {
          const data = response.data;

          // URL 확인 및 기본값 설정
          if (!data.eye?.imageUrl) {
            data.eye.imageUrl = `https://team09-bucket.s3.ap-northeast-2.amazonaws.com/eye/eye${data.eye.itemId}.png`;
          }
          if (!data.mouth?.imageUrl) {
            data.mouth.imageUrl = `https://team09-bucket.s3.ap-northeast-2.amazonaws.com/mouth/mouth${data.mouth.itemId}.png`;
          }
          if (!data.skin?.imageUrl) {
            data.skin.imageUrl = `https://team09-bucket.s3.ap-northeast-2.amazonaws.com/skin/skin${data.skin.itemId}.png`;
          }

          setOriginalProfile(data);
          setEditedProfile(data);
        } else {
          setError(response.message || "사용자 정보를 불러올 수 없습니다");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  // 아바타 변경 처리 함수
  const handleAvatarChange = (updatedProfile: AvatarProfile) => {
    setEditedProfile(updatedProfile);
  };

  // 닉네임과 자기소개 변경 처리 함수
  const handleInfoChange = (nickname: string, introduction: string) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        nickname,
        introduction,
      });
    }
  };

  // 프로필 저장 함수
  const saveProfile = async () => {
    if (!editedProfile) return;

    try {
      setIsSaving(true);
      setSaveError(null);

      // 서버 요청 형식에 맞게 데이터 구성
      const requestBody = {
        introduction: editedProfile.introduction || "",
        nickname: editedProfile.nickname || originalProfile?.nickname,
        eye: editedProfile.eye.itemId,
        mouth: editedProfile.mouth.itemId,
        skin: editedProfile.skin.itemId,
        nickColor: editedProfile.nickColor.itemId,
      };

      const response = await defaultFetch<ApiResponse<any>>("/myInfo", {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });

      if (!response.isSuccess) {
        throw new Error(response.message || "프로필 변경에 실패했습니다");
      }

      // 저장 성공 시 원본 프로필 업데이트
      setOriginalProfile(editedProfile);
      showToast("프로필이 성공적으로 저장되었습니다", "success");

      // 1.5초 후에 로비로 이동
      setTimeout(() => {
        router.push("/lobby");
      }, 1500);
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : "변경 사항을 저장하는데 실패했습니다"
      );

      // 실패 시 토스트 오류 메시지 표시
      showToast("프로필 저장에 실패했습니다", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div
        className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/images/shopbg.png')" }}
      >
        <div className="w-[90%] md:w-[85%] max-w-[1700px] h-[90%] md:h-[85%] max-h-[900px] bg-[#1B399C]/70 rounded-xl md:rounded-3xl shadow-lg flex flex-col items-center justify-start p-4 md:pt-8 lg:pt-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-4">
            프로필 편집
          </h1>
          {saveError && (
            <div className="w-full bg-red-500 text-white text-center py-1 rounded mb-2">
              {saveError}
            </div>
          )}
          <div className="flex flex-col md:flex-row w-full h-full overflow-auto md:overflow-hidden">
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-point)]"></div>
              </div>
            ) : (
              <>
                <AvatarChange
                  profile={
                    editedProfile || {
                      nickname: "",
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
                      nickColor: { itemId: 31, value: "#FFFFFF" },
                    }
                  }
                  isLoading={isLoading}
                  error={error}
                  onProfileChange={handleAvatarChange}
                />
                <div className="hidden md:block w-[2px] md:w-[3px] h-[2px] md:h-[90%] bg-white my-4 md:my-0 md:mx-2 md:mt-4 md:mb-2"></div>
                <div className="block md:hidden w-full h-[2px] bg-white my-4"></div>
                {editedProfile && (
                  <InfoChange
                    profile={editedProfile}
                    isSaving={isSaving}
                    onInfoChange={handleInfoChange}
                    onSave={saveProfile}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 토스트 메시지 */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
      />
    </ProtectedRoute>
  );
}

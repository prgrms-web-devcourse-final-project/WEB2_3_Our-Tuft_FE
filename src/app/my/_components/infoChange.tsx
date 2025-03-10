"use client";
import { useState, useEffect } from "react";
import { defaultFetch } from "../../../service/api/defaultFetch";

interface Profile {
  nickname: string;
  introduction?: string;
}

interface InfoChangeProps {
  profile: Profile;
  isSaving: boolean;
  onInfoChange: (nickname: string, introduction: string) => void;
  onSave: () => void;
  saveError?: string | null;
}

interface NicknameResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    nickName: string;
  };
}

export default function InfoChange({
  profile,
  isSaving,
  onInfoChange,
  onSave,
}: InfoChangeProps) {
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [isChangingNickname, setIsChangingNickname] = useState(false);
  const [nicknameChangeResult, setNicknameChangeResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 프로필이 로드되면 값을 설정
  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || "");
      setIntroduction(profile.introduction || "");
    }
  }, [profile]);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    onInfoChange(e.target.value, introduction);

    // 입력 시 이전 결과 메시지 초기화
    if (nicknameChangeResult) {
      setNicknameChangeResult(null);
    }
  };

  // 자기소개 변경 핸들러
  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIntroduction(e.target.value);
    onInfoChange(nickname, e.target.value);
  };

  // 닉네임 변경 API 호출 함수
  const handleChangeNickname = async () => {
    if (!nickname.trim() || isChangingNickname) return;

    try {
      setIsChangingNickname(true);
      setNicknameChangeResult(null);

      const response = await defaultFetch<NicknameResponse>(
        "/myInfo/nickname",
        {
          method: "PUT",
          body: JSON.stringify({ nickName: nickname }),
        }
      );

      if (response.isSuccess) {
        setNicknameChangeResult({
          success: true,
          message: "변경이 완료되었습니다!",
        });
        // 프로필 정보 업데이트 반영
        onInfoChange(nickname, introduction);
      } else {
        setNicknameChangeResult({
          success: false,
          message: "변경을 실패하였습니다!",
        });
      }

      console.log("닉네임 변경 응답:", response);
    } catch (error) {
      console.error("닉네임 변경 오류:", error);
      setNicknameChangeResult({
        success: false,
        message: "변경을 실패하였습니다!",
      });
    } finally {
      setIsChangingNickname(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-2 md:space-y-4">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
        <label
          className="block text-white text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4"
          htmlFor="nickname"
        >
          닉네임
        </label>
        <div className="flex items-center gap-2">
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            disabled={isChangingNickname}
            className="flex-1 py-2 md:py-3 lg:py-4 px-3 rounded-lg bg-white text-black text-base md:text-lg lg:text-xl disabled:bg-gray-200"
            placeholder="닉네임을 입력하세요"
          />
          <button
            onClick={handleChangeNickname}
            disabled={isChangingNickname}
            className="shrink-0 py-2 md:py-3 lg:py-4 px-4 md:px-5 lg:px-6 bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] disabled:bg-gray-400 text-white text-sm md:text-base lg:text-lg rounded-lg transition-all flex items-center justify-center"
          >
            {isChangingNickname ? "변경 중..." : "변경"}
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 md:mt-4">
          {nicknameChangeResult ? (
            <p
              className={`text-sm md:text-base mb-2 md:mb-0 ${
                nicknameChangeResult.success
                  ? "text-green-500"
                  : "text-[var(--color-lightRed)]"
              }`}
            >
              {nicknameChangeResult.message}
            </p>
          ) : (
            <p className="text-[var(--color-lightRed)] text-xs md:text-sm mb-2 md:mb-0">
              닉네임은 2주에 한 번만 변경할 수 있습니다. 신중하게 결정해주세요!
            </p>
          )}
        </div>
      </div>
      <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
        <label
          className="block text-white text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4"
          htmlFor="bio"
        >
          자기소개
        </label>
        <textarea
          id="bio"
          value={introduction}
          onChange={handleIntroductionChange}
          className="w-full py-2 md:py-3 lg:py-4 px-3 rounded-lg bg-white text-black text-base md:text-lg lg:text-xl"
          placeholder="자기소개를 입력하세요"
          rows={4}
        ></textarea>
        <div className="flex justify-end space-x-3 md:space-x-4 mt-8 md:mt-12 lg:mt-16">
          <button
            onClick={() => (window.location.href = "/lobby")}
            className="w-[90px] md:w-[100px] lg:w-[110px] h-[40px] md:h-[45px] lg:h-[50px] bg-[#4E4C4C] hover:bg-gray-600 text-white text-lg md:text-xl rounded-lg md:rounded-xl transition-all flex items-center justify-center"
          >
            취소
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="w-[90px] md:w-[100px] lg:w-[110px] h-[40px] md:h-[45px] lg:h-[50px] bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] text-white text-lg md:text-xl rounded-lg md:rounded-xl transition-all flex items-center justify-center"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}

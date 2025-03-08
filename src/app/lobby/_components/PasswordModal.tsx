import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { defaultFetch } from "../../../service/api/defaultFetch";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: number;
}

interface ApiResponse {
  isSuccess: boolean;
  message?: string;
  data?: any;
}

export default function PasswordModal({
  isOpen,
  onClose,
  roomId,
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 모달이 열릴 때마다 입력값과 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  // 모달이 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen && mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // 비밀번호 검증 함수
  const verifyPassword = async (
    roomId: number,
    password: string
  ): Promise<boolean> => {
    try {
      // 타입을 ApiResponse로 지정하여 defaultFetch 호출
      const response = await defaultFetch<ApiResponse>(
        `/lobbies/rooms/${roomId}?password=${password}`,
        { method: "GET" }
      );

      // 응답이 성공적이면 비밀번호가 맞음
      return response && response.isSuccess;
    } catch (err) {
      console.error("비밀번호 검증 오류:", err);
      return false;
    }
  };

  const handleSubmit = async () => {
    // 비밀번호 유효성 검사 (4자리 숫자)
    if (!password || password.length !== 4 || !/^\d{4}$/.test(password)) {
      setError("비밀번호는 4자리 숫자여야 합니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 비밀번호 검증
      const isValidPassword = await verifyPassword(roomId, password);

      if (isValidPassword) {
        // 비밀번호가 맞으면 방으로 이동
        router.push(`/lobby/rooms/${roomId}?password=${password}`);
        onClose();
      } else {
        // 비밀번호가 틀리면 오류 메시지 표시
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      setError("비밀번호 확인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      {/* 배경 마스킹 */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      <div className="bg-[var(--color-second)]/90 w-[90%] max-w-[500px] rounded-2xl drop-shadow-custom overflow-hidden flex flex-col relative z-10 p-8">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-white text-2xl font-bold">비밀번호 입력</h2>
        </div>

        <div className="mb-6">
          <p className="text-white text-center mb-4">
            비공개 방에 입장하려면 비밀번호를 입력하세요.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null); // 입력 시 에러 메시지 초기화
            }}
            placeholder="4자리 비밀번호 입력"
            maxLength={4}
            className="w-full bg-[#D9D9D9] border border-white/50 rounded-xl p-3 text-black text-center text-xl tracking-widest focus:outline-none"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSubmit();
              }
            }}
          />

          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#4E4C4C] text-white text-lg rounded-lg hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 ${
              isLoading ? "bg-gray-500" : "bg-[var(--color-secondPoint)]"
            } text-white text-lg rounded-lg hover:opacity-90 transition-opacity`}
            disabled={isLoading}
          >
            {isLoading ? "확인 중..." : "입장"}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

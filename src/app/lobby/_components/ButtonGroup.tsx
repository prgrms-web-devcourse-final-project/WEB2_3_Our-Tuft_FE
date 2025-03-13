import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import VolumeModal from "./VolumeModal";
import MobileVolume from "./MobileVolume";
import { useLoginStore } from "../../../store/store";
import up from "@/assets/icons/up.png";
import off from "@/assets/icons/off.png";

export default function ButtonGroup() {
  const [isVolumeModalOpen, setIsVolumeModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const logout = useLoginStore((state) => state.logout);

  // 오디오 관련 상태
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 컴포넌트 마운트 시 로컬 스토리지에서 볼륨 설정 불러오기
  useEffect(() => {
    const savedVolumeState = localStorage.getItem("bgmPlaying");
    const shouldPlay = savedVolumeState !== "false";

    setIsPlaying(shouldPlay);

    // 오디오 요소 생성 및 설정
    const audioElement = new Audio("/assets/audio/SellBuyMusicbgm.mp3");
    audioElement.loop = true;
    audioRef.current = audioElement;

    if (shouldPlay) {
      const playPromise = audioElement.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("자동 재생 실패:", error);
          setIsPlaying(false);
        });
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 오디오 정리
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // 화면 크기 변경 시 모바일 여부 확인
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 세션 스토리지에서 토큰 및 사용자 정보 삭제
    if (typeof window !== "undefined") {
      logout();
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setTimeout(() => {
        router.push("/login");
      }, 100);
    }
  };

  // 음악 재생/일시정지 토글
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("재생 실패:", error);
        });
      }
    }

    // 상태 업데이트 및 로컬 스토리지에 저장
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    localStorage.setItem("bgmPlaying", newPlayingState.toString());
  };

  return (
    <>
      <div className="h-full w-full flex gap-2">
        {/* 볼륨 버튼 */}
        <button
          onClick={togglePlayPause}
          className="flex-1 h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
        >
          <Image
            src={isPlaying ? up : off}
            alt={isPlaying ? "음소거하기" : "소리켜기"}
            width={40}
            height={40}
            className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]"
            priority
          />
        </button>

        {/* 상점 버튼 */}
        <Link
          href="/shop"
          className="flex-1 h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
        >
          <Image
            src="/assets/images/shop.png"
            alt="shop"
            width={40}
            height={40}
            className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]"
          />
        </Link>

        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="flex-1 h-full bg-[var(--color-lightRed)]/90 hover:bg-[var(--color-lightRed-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
        >
          <Image
            src="/assets/images/exit.png"
            alt="exit"
            width={40}
            height={40}
            className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]"
          />
        </button>
      </div>

      {/* 모달 렌더링 */}
      {isMobile ? (
        <MobileVolume
          isOpen={isVolumeModalOpen}
          onClose={() => setIsVolumeModalOpen(false)}
        />
      ) : (
        <VolumeModal
          isOpen={isVolumeModalOpen}
          onClose={() => setIsVolumeModalOpen(false)}
        />
      )}
    </>
  );
}

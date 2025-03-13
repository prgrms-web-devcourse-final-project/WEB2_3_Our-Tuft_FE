import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import VolumeModal from "./VolumeModal";
import MobileVolume from "./MobileVolume";
import { useLoginStore } from "../../../store/store";
import up from "@/assets/icons/volumeOn.svg";
import off from "@/assets/icons/volumeOff.svg";

export default function ButtonGroup() {
  const [isVolumeModalOpen, setIsVolumeModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const logout = useLoginStore((state) => state.logout);

  // 화면 크기 변경 시 모바일 여부 확인
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 세션 스토리지에서 토큰 및 사용자 정보 삭제
    if (typeof window !== "undefined") {
      // 스토어 상태 업데이트 - 중요!
      logout(); // Zustand 스토어의 logout 함수 호출

      // 로컬 저장소에서 토큰 제거
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 쿠키에서도 토큰 제거
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // 잠시 지연 후 리디렉션 (상태 업데이트를 위한 시간 확보)
      setTimeout(() => {
        router.push("/login");
      }, 100);
    }
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current && audioRef.current.pause();
    } else {
      audioRef.current && audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    audioRef.current && audioRef.current.play();
  }, []);
  return (
    <>
      <div className="h-full w-full flex gap-2">
        {/* 볼륨 버튼 */}
        <div>
          <audio ref={audioRef} loop>
            <source src="/assets/audio/SellBuyMusicbgm.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <button
            onClick={togglePlayPause}
            className="flex-1 h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
          >
            {isPlaying ? (
              <Image
                src={up}
                alt="소리"
                width="60"
                className="cursor-pointer"
              />
            ) : (
              <Image
                src={off}
                alt="소리"
                width="60"
                className="cursor-pointer"
              />
            )}
          </button>
        </div>
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

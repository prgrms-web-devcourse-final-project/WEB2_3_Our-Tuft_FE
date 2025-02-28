import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import VolumeModal from "./VolumeModal";
import MobileVolume from "./MobileVolume";

export default function ButtonGroup() {
  const [isVolumeModalOpen, setIsVolumeModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 변경 시 모바일 여부 확인
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md 브레이크포인트 기준
    };

    // 초기 확인
    checkIfMobile();

    // 리사이즈 이벤트에 대한 리스너 추가
    window.addEventListener("resize", checkIfMobile);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <>
      <div className="h-full w-full flex gap-2">
        {/* 볼륨 버튼 */}
        <button
          onClick={() => setIsVolumeModalOpen(true)}
          className="flex-1 h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
        >
          <Image
            src="/assets/images/volume.png"
            alt="setting"
            width={40}
            height={40}
            className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]"
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
        <Link
          href="/login"
          className="flex-1 h-full bg-[var(--color-lightRed)]/90 hover:bg-[var(--color-lightRed-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
        >
          <Image
            src="/assets/images/exit.png"
            alt="exit"
            width={40}
            height={40}
            className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]"
          />
        </Link>
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

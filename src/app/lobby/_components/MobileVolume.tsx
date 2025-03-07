import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface MobileVolumeProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileVolume({ isOpen, onClose }: MobileVolumeProps) {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  // 음소거 토글 함수
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setVolume(0);
    } else {
      setVolume(50);
    }
  };

  // 볼륨 변경 함수
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // 포털을 사용하여 모달을 body에 직접 렌더링
  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="fixed inset-0 bg-black/70" onClick={onClose}></div>
      <div
        className="relative bg-[var(--color-second)]/90 rounded-lg w-[90%] max-w-[350px] z-[10000]"
        style={{ aspectRatio: "350/250" }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-[var(--color-lightRed)] hover:bg-[var(--color-lightRed-hover)]"
          aria-label="닫기"
        >
          <Image
            src="/assets/images/close.png"
            alt="닫기"
            width={14}
            height={14}
          />
        </button>

        {/* 모달 내용 */}
        <div className="p-5 h-full flex flex-col items-center">
          <h2 className="text-xl font-bold mb-5 text-white text-center">
            볼륨 설정
          </h2>
          <div className="flex-1 flex flex-col justify-center items-center w-full">
            <div className="flex items-center justify-between w-full mb-4">
              <button onClick={toggleMute} className="p-1">
                <Image
                  src={
                    isMuted
                      ? "/assets/icons/volumeOff.svg"
                      : "/assets/icons/volumeOn.svg"
                  }
                  alt={isMuted ? "음소거" : "볼륨"}
                  width={32}
                  height={32}
                  className="invert"
                />
              </button>
              <span className="text-white font-bold">{volume}%</span>
            </div>

            {/* 볼륨 슬라이더 */}
            <div className="w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-secondPoint) 0%, var(--color-secondPoint) ${volume}%, #D1D5DB ${volume}%, #D1D5DB 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}

"use-client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface VolumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VolumeModal({ isOpen, onClose }: VolumeModalProps) {
  const [volume, setVolume] = useState(50); // 기본 볼륨 50%
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null); // 오디오 엘리먼트에 접근할 ref

  if (!isOpen) return null;

  // 음소거 토글 함수
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setVolume(0);
    } else {
      setVolume(50); // 음소거 해제 시 기본 볼륨으로 복귀
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

  // 오디오의 볼륨을 상태에 맞게 설정
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // 0 ~ 1 사이의 값으로 설정
    }
  }, [volume]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      <div
        className="relative bg-[var(--color-second)]/90 rounded-lg"
        style={{
          width: "min(787px, 80vw)",
          height: "min(336px, 80vh)",
          aspectRatio: "787/336",
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg bg-[var(--color-lightRed)] hover:bg-[var(--color-lightRed-hover)]"
          aria-label="닫기"
        >
          <Image
            src="/assets/images/close.png"
            alt="닫기"
            width={16}
            height={16}
          />
        </button>

        {/* 모달 내용 */}
        <div className="p-8 h-full flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            볼륨 설정
          </h2>
          <div className="flex-1 flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-lg flex items-center gap-4 px-4">
              {/* 볼륨 아이콘 */}
              <button onClick={toggleMute} className="flex-none">
                <Image
                  src={
                    isMuted
                      ? "/assets/icons/volumeOff.svg"
                      : "/assets/icons/volumeOn.svg"
                  }
                  alt={isMuted ? "음소거" : "볼륨"}
                  width={44}
                  height={44}
                  className="invert"
                />
              </button>

              {/* 볼륨 슬라이더 */}
              <div className="flex-grow relative h-8">
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

              {/* 볼륨 퍼센트 표시 */}
              <span className="flex-none text-white font-bold w-12 text-right">
                {volume}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 오디오 엘리먼트 추가 */}
      <audio ref={audioRef} autoPlay loop>
        <source src="/assets/audio/SellBuyMusicbgm.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

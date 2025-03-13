import React from "react";
import Image from "next/image";

interface MobileGameRoomItemProps {
  roomId: number;
  roomName: string;
  round: number;
  disclosure: boolean;
  gameType: "SPEED" | "OX";
  time?: number;
  maxUsers?: number;
  currentPlayer?: number;
  gameRunning?: boolean;
}

export default function MobileGameRoomItem({
  roomId,
  roomName,
  round,
  disclosure,
  gameType,
  time = 60,
  maxUsers = 8,
  currentPlayer = 1,
  gameRunning = false,
}: MobileGameRoomItemProps) {
  const gameTypeToKorean = {
    SPEED: "스피드 퀴즈",
    OX: "OX 퀴즈",
  };

  const isFull =
    currentPlayer !== undefined &&
    maxUsers !== undefined &&
    currentPlayer >= maxUsers;

  return (
    <div
      className={`w-full h-[70px] bg-white border border-black rounded-xl flex items-center justify-center text-sm relative p-2 ${
        gameRunning ? "bg-opacity-70" : ""
      }`}
    >
      {/* 게임 진행 중 표시 */}
      {gameRunning && (
        <div className="absolute inset-0 bg-black/30 rounded-xl z-10 flex items-center justify-center">
          <div className="bg-[var(--color-point)] text-white px-3 py-1 rounded-md text-xs font-bold">
            게임 진행 중
          </div>
        </div>
      )}

      <div className="absolute left-[20%] top-[5px] bottom-[5px] w-[1px] bg-black"></div>
      <div className="absolute left-[6%] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
        {disclosure ? (
          <Image
            src="/assets/images/public.png"
            alt="Public"
            width={16}
            height={16}
          />
        ) : (
          <Image
            src="/assets/images/private.png"
            alt="Private"
            width={16}
            height={16}
          />
        )}
        <div className="mt-1 text-sm">{roomId}</div>
      </div>
      <div className="absolute left-[25%] top-[5px] text-sm max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap">
        {roomName}
      </div>
      <div className="absolute left-[25%] bottom-[20px] text-xs">
        라운드 {round}
      </div>
      <div className="absolute left-[25%] bottom-[5px] text-xs">
        진행시간 {time}초
      </div>
      <div className="absolute right-[8px] top-[5px] text-sm">
        {currentPlayer} / {maxUsers}
      </div>
      <div className="absolute right-[5px] rounded-[5px] bottom-[27px] bg-[#D9D9D9] w-[80px] h-[15px] text-xs flex justify-center items-center">
        상식
      </div>
      <div className="absolute right-[5px] rounded-[5px] bottom-[5px] bg-[#D9D9D9] w-[80px] h-[20px] text-xs flex justify-center items-center">
        {gameTypeToKorean[gameType]}
      </div>
    </div>
  );
}

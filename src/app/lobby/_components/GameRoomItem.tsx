import Image from "next/image";

interface GameRoomItemProps {
  roomId: number;
  roomName: string;
  round: number;
  disclosure: boolean;
  gameType: "SPEED" | "CATCHMIND" | "OX";
  time?: number;
  maxUsers?: number;
  currentUsers?: number;
  gameRunning?: boolean;
}

export default function GameRoomItem({
  roomId,
  roomName,
  round,
  disclosure,
  gameType,
  time = 60, // 기본값 설정
  maxUsers = 8, // 기본값 설정
  currentUsers = 1, // 기본값 설정
  gameRunning = false, // 기본값 설정
}: GameRoomItemProps) {
  // 게임 타입에 맞는 한글 이름으로 변환
  const gameTypeToKorean = {
    SPEED: "스피드 퀴즈",
    CATCHMIND: "그림 맞추기",
    OX: "OX 퀴즈",
  };

  return (
    <div
      className={`w-full h-full bg-white border border-black rounded-xl flex items-center justify-center relative text-[1vw] md:text-[0.8vw] xl:text-[0.55vw] ${
        gameRunning ? "bg-opacity-70 relative" : ""
      }`}
    >
      {/* 게임 진행 중 표시 */}
      {gameRunning && (
        <div className="absolute inset-0 bg-black/30 rounded-xl z-10 flex items-center justify-center">
          <div className="bg-[var(--color-point)] text-white px-4 py-2 rounded-md text-[1.4em] font-bold">
            게임 진행 중
          </div>
        </div>
      )}

      <div className="absolute left-[20%] top-[5%] bottom-[5%] w-[1px] bg-black"></div>

      {/* 방 번호 영역 */}
      <div className="absolute left-[4%] xl:left-[6%] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
        <div className="w-[2.5em] h-[2.5em] flex items-center justify-center">
          {disclosure ? (
            <Image
              src="/assets/images/public.png"
              alt="Public"
              width={24}
              height={24}
              className="w-[2.5em] h-[2.5em]"
            />
          ) : (
            <Image
              src="/assets/images/private.png"
              alt="Private"
              width={24}
              height={24}
              className="w-[2.5em] h-[2.5em]"
            />
          )}
        </div>
        <div className="mt-[0.5em] text-[2em]">{roomId}</div>
      </div>

      {/* 방 제목 */}
      <div className="absolute left-[22%] top-[8%] text-[1.6em] xl:text-[1.8em] max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap">
        {roomName}
      </div>

      {/* 라운드 정보 */}
      <div className="absolute left-[22%] top-[33%] text-[1.3em]">
        라운드 {round}
      </div>

      {/* 진행시간 정보 */}
      <div className="absolute left-[22%] top-[53%] text-[1.3em]">
        진행시간 {time}초
      </div>

      {/* 참가자 수 */}
      <div className="absolute left-[22%] bottom-[8%] text-[1.4em]">
        {currentUsers} / {maxUsers}
      </div>

      {/* 카테고리 태그 */}
      <div className="absolute right-[3%] rounded-[0.6em] bottom-[30%] bg-[#D9D9D9] w-[7em] h-[1.6em] text-[1em] flex justify-center items-center">
        상식
      </div>

      {/* 게임 모드 태그 */}
      <div className="absolute right-[3%] rounded-[0.6em] bottom-[8%] bg-[#D9D9D9] w-[7em] h-[2.2em] text-[1em] flex justify-center items-center">
        {gameTypeToKorean[gameType]}
      </div>
    </div>
  );
}

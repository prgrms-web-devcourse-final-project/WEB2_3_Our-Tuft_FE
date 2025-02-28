import Image from "next/image";

export default function GameRoomItem() {
  return (
    <div className="w-full h-full bg-white border border-black rounded-xl flex items-center justify-center relative text-[1vw] md:text-[0.8vw] xl:text-[0.55vw]">
      {/* 세로 구분선 */}
      <div className="absolute left-[20%] top-[5%] bottom-[5%] w-[1px] bg-black"></div>

      {/* 방 번호 영역 */}
      <div className="absolute left-[4%] xl:left-[6%] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
        <Image
          src="/assets/images/private.png"
          alt="Private"
          width={24}
          height={24}
          className="w-[2.5em] h-[2.5em]"
        />
        <div className="mt-[0.5em] text-[2em]">999</div>
      </div>

      {/* 방 제목 */}
      <div className="absolute left-[22%] top-[8%] text-[1.6em] xl:text-[1.8em] max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap">
        상식퀴즈 한판 ㄱㄱㄱ
      </div>

      {/* 라운드 정보 */}
      <div className="absolute left-[22%] top-[33%] text-[1.3em]">라운드 3</div>

      {/* 진행시간 정보 */}
      <div className="absolute left-[22%] top-[53%] text-[1.3em]">
        진행시간 120초
      </div>

      {/* 참가자 수 */}
      <div className="absolute left-[22%] bottom-[8%] text-[1.4em]">1 / 8</div>

      {/* 카테고리 태그 */}
      <div className="absolute right-[3%] rounded-[0.6em] bottom-[30%] bg-[#D9D9D9] w-[7em] h-[1.6em] text-[1em] flex justify-center items-center">
        상식
      </div>

      {/* 게임 모드 태그 */}
      <div className="absolute right-[3%] rounded-[0.6em] bottom-[8%] bg-[#D9D9D9] w-[7em] h-[2.2em] text-[1em] flex justify-center items-center">
        스피드 퀴즈
      </div>
    </div>
  );
}

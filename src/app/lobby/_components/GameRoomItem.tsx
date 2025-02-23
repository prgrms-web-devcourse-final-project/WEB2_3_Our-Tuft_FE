import Image from "next/image";

export default function GameRoomItem() {
  return (
    <div className="w-[445px] h-[150px] bg-white border border-black rounded-xl flex items-center justify-center text-2xl relative">
      <div className="absolute left-[20%] top-[10px] bottom-[10px] w-[1px] bg-black"></div>
      <div className="absolute left-[6%] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
        <Image
          src="/assets/images/private.png"
          alt="Private"
          width={24}
          height={24}
        />
        <div className="mt-2 text-2xl">999</div>
      </div>
      <div className="absolute left-[22%] top-[10px] text-2xl">
        상식퀴즈 한판 ㄱㄱㄱ
      </div>
      <div className="absolute left-[22%] top-[50px] text-lg">라운드 3</div>
      <div className="absolute left-[22%] top-[80px] text-lg">
        진행시간 120초
      </div>
      <div className="absolute left-[22%] bottom-[10px] text-xl">1 / 8</div>
      <div className="absolute right-[10px] rounded-[10px] bottom-[45px] bg-[#D9D9D9] w-[96px] h-[22px] text-base flex justify-center items-center">
        상식
      </div>
      <div className="absolute right-[10px] rounded-[10px] bottom-[10px] bg-[#D9D9D9] w-[96px] h-[33px] text-base flex justify-center items-center">
        스피드 퀴즈
      </div>
    </div>
  );
}

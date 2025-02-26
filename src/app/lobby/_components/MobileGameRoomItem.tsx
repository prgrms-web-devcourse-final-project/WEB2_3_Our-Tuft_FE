import React from "react";
import Image from "next/image";

export default function MobileGameRoomItem() {
  return (
    <div className="w-full h-[70px] bg-white border border-black rounded-xl flex items-center justify-center text-sm relative p-2">
      <div className="absolute left-[20%] top-[5px] bottom-[5px] w-[1px] bg-black"></div>
      <div className="absolute left-[6%] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
        <Image
          src="/assets/images/private.png"
          alt="Private"
          width={16}
          height={16}
        />
        <div className="mt-1 text-sm">999</div>
      </div>
      <div className="absolute left-[25%] top-[5px] text-sm">
        상식퀴즈 한판 ㄱㄱㄱ
      </div>
      <div className="absolute left-[25%] bottom-[20px] text-xs">라운드 3</div>
      <div className="absolute left-[25%] bottom-[5px] text-xs">
        진행시간 120초
      </div>
      <div className="absolute right-[8px] top-[5px] text-sm">1 / 8</div>
      <div className="absolute right-[5px] rounded-[5px] bottom-[27px] bg-[#D9D9D9] w-[80px] h-[15px] text-xs flex justify-center items-center">
        상식
      </div>
      <div className="absolute right-[5px] rounded-[5px] bottom-[5px] bg-[#D9D9D9] w-[80px] h-[20px] text-xs flex justify-center items-center">
        스피드 퀴즈
      </div>
    </div>
  );
}

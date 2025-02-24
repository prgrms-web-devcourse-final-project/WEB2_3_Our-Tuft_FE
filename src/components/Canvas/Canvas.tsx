"use client";

import React from "react";

export default function Canvas() {
  return (
    <div className="grid grid-rows-[9fr,2fr] w-full h-full row-span-10 min-[1025px]:row-span-11 rounded-xl gap-x-4 gap-y-4">
      <div className="bg-[#FFFFFF] flex items-center justify-center row-span-8 min-[1025px]:row-span-9 rounded-xl min-[1025px]:rounded-2xl relative">
        {/* 상단 가운데 텍스트 */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-[var(--color-second)]/90 p-2 w-[50%] min-w-[160px] max-w-full rounded-full text-white text-center text-sm sm:text-base">
          닉네임6님이 그리는중
        </div>
        Canvas
        {/* 우측 하단 라운드 정보 */}
        <div className="absolute bottom-2 right-2 min-[1025px]:bottom-4 min-[1025px]:right-4 bg-[var(--color-second)]/90 min-w-[160px] p-2 rounded-full text-white text-center text-sm sm:text-base">
          6라운드 / 30라운드
        </div>
      </div>
      <div className="bg-[#FFFFFF]/90 flex items-center justify-center row-span-2 rounded-xl min-[1025px]:rounded-2xl">
        그림판 도구
      </div>
    </div>
  );
}

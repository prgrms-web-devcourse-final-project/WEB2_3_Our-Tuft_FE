import React from "react";

export default function WordTimeCount() {
  return (
    <>
      {/* 단어, 남은 시간 표시 */}
      <div className="bg-[#FFFFFF]/90 flex flex-col items-center justify-center row-span-2 min-[1025px]:row-span-3 rounded-xl min-[1025px]:rounded-2xl">
        <p className="max-[375px]:text-base text-xl sm:text-2xl md:text-3xl min-[1025px]:text-4xl md:mb-2.5 min-[1025px]:mb-3 xl:mb-3.5 2xl:mb-4">
          {/* 모바일 */}
          <span className="hidden max-[1024px]:block">모바일</span>
          {/* 데스크톱 */}
          <span className="hidden min-[1025px]:block">데스크톱</span>
        </p>
        <p className="text-base min-[1025px]:text-lg xl:text-xl 2xl:text-2xl">
          <span className="sm:inline hidden">남은 시간 : </span>
          <span className="block sm:inline">2초</span>
        </p>
      </div>
    </>
  );
}

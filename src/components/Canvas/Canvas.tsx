"use client";

import React from "react";

export default function Canvas() {
  return (
    <div className="grid grid-rows-[9fr,2fr] w-full h-full row-span-10 min-[1025px]:row-span-11 rounded-xl gap-x-4 gap-y-4">
      <div className="bg-[#FFFFFF] flex items-center justify-center row-span-8 min-[1025px]:row-span-9 rounded-xl min-[1025px]:rounded-2xl">
        Canvas
      </div>
      <div className="bg-[#FFFFFF]/90 flex items-center justify-center row-span-2 rounded-xl min-[1025px]:rounded-2xl">
        그림판 도구
      </div>
    </div>
  );
}

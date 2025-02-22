import React from "react";

export default function RoomActionButtons() {
  return (
    <div className="flex md:text-md lg:text-4xl cursor-pointer">
      <button className="flex-1 bg-[var(--color-second)] lg:py-12 md:py-7 lg:rounded-l-[20px] md:rounded-l-[12px]">
        대기 중
      </button>
      <button className="flex-1 bg-[var(--color-amberOrange)] lg:rounded-r-[20px] md:rounded-r-[12px] cursor-pointer">
        준비 완료
      </button>
    </div>
  );
}

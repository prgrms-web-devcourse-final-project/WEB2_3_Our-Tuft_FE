import React from "react";

export default function RoomActionButtons() {
  return (
    <div className="flex md:text-xl lg:text-4xl">
      <button className="flex-1 bg-[var(--color-second)] py-12 rounded-l-[20px]">
        대기 중
      </button>
      <button className="flex-1 bg-[var(--color-amberOrange)] rounded-r-[20px]">
        준비 완료
      </button>
    </div>
  );
}

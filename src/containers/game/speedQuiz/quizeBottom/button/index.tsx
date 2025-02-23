"use client";
import { useState } from "react";
import LeaveGameModal from "../../quizeModal/LeaveGameModal";

export default function Button() {
  const [isOpen, setOpenLeave] = useState<boolean>(false);
  return (
    <div className="flex gap-7 text-2xl items-center">
      <div className="flex items-center justify-center w-[207px] h-[71px] opacity-90 bg-[#4c3bcf] rounded-[10px] drop-shadow-custom cursor-pointer">
        설정
      </div>
      <div
        className="flex items-center justify-center w-[207px] h-[71px] opacity-90 bg-[#f05650] rounded-[10px] drop-shadow-custom text-center cursor-pointer"
        onClick={() => setOpenLeave(true)}
      >
        나가기
      </div>
      {isOpen && <LeaveGameModal setIsClose={setOpenLeave} />}
    </div>
  );
}

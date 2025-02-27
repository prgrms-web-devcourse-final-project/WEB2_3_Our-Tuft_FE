"use client";
import Image from "next/image";
import setting from "@/assets/icons/setting.svg";
import { useState } from "react";
import TopicModal from "../../roomsModal/TopicModal";

export default function RoomsInfo() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className="
        flex justify-between items-center
        text-sm md:text-lg xl:text-2xl
        px-2 xl:py-1 md:px-4
        md:break-keep"
    >
      <button
        className="
          bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] 
          w-[40%] xl:rounded-[20px] rounded-[16px] py-2 xl:py-5 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        주제: 상식{" "}
      </button>
      <div className="flex gap-4 text-center items-center">
        <div className="hidden xl:block md:block">제한 시간</div>
        <div
          className="
          bg-[var(--color-point)] text-center 
          p-1 md:px-5 xl:py-5 xl:px-10 
          xl:rounded-[20px] md:rounded-[16px] rounded-[8px]"
        >
          120초
        </div>
      </div>
      <div
        className="
            flex xl:gap-5 md:gap-3 gap-0 text-center items-center 
            xl:bg-transparent md:bg-transparent bg-[var(--color-point)] rounded-[8px] pl-1"
      >
        <div>라운드</div>
        <div
          className="
          bg-[var(--color-point)] 
          p-1 md:px-5 xl:py-5 xl:px-10 
          xl:rounded-[20px] md:rounded-[16px] rounded-[8px]"
        >
          25
        </div>
      </div>
      <div
        className="
          flex md:gap-2 xl:gap-6 bg-[var(--color-point)] hover:bg-[var(--color-point-hover)] 
          xl:w-[15%] p-1 md:py-2 md:px-4 xl:py-5 xl:px-10 xl:rounded-[20px] 
          md:rounded-[16px] rounded-[8px] justify-center cursor-pointer"
      >
        <Image
          src={setting}
          alt="설정 아이콘"
          className="xl:w-8 xl:h-8 md:w-7 md:h-7 w-5 h-5"
        />
        <span className="hidden xl:block">설정</span>
      </div>

      {isOpen && <TopicModal setIsClose={setOpen} />}
    </div>
  );
}

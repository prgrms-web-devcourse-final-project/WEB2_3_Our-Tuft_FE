"use client";
import { useState } from "react";
import GameControlButtons from "../GameControlButtons";
import WideChat from "../WideChat";
import close from "@/assets/icons/close.svg";
import Image from "next/image";

export default function SpeedOXFooter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleChange = () => {};
  return (
    <>
      <div
        className="
        flex w-full items-center drop-shadow-custom 
        2xl:gap-5 md:gap-3 gap-2 
        mt-3 p-3 bg-[var(--color-point)] rounded-b-xl"
      >
        {isOpen && (
          <div
            className={`
            absolute w-full bottom-18 2xl:bottom-23 left-0 
            bg-[var(--color-point)]/90 h-[200%] z-20 overflow-auto font-white
            rounded-t-2xl p-7
          `}
          >
            <Image
              src={close}
              alt="닫기 아이콘"
              className="absolute right-4 top-4 2xl:w-4 2xl:h-4 w-4 h-4 opacity-70 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <div>
              <p>
                <span className="font-bold">안녕하세요 : </span>
                안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              </p>
              <p>
                <span className="font-bold">안녕하세요 : </span>
                안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              </p>
              <p>
                <span className="font-bold">안녕하세요 : </span>
                안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              </p>
            </div>
          </div>
        )}
        <div
          className="
            flex-3 min-w-0 bg-[#D9D9D9] 
            py-2 md:py-4 2xl:py-4 2xl:rounded-[20px] rounded-[12px]"
        >
          <div className="text-2xl">
            <input
              className="w-full focus:outline-none text-black placeholder:text-gray-500 pl-7 placeholder:text-[20px] text-[1rem]"
              placeholder="메시지를 입력하세요..."
              onClick={() => setIsOpen(true)}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex-1">
          <GameControlButtons />
        </div>
      </div>
    </>
  );
}

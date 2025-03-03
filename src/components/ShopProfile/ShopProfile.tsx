"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import coinIcon from "@/assets/icons/coin.svg";
import exitIcon from "@/assets/icons/exit.svg";
import profileImg from "@/assets/images/profile.png";

export default function ShopProfile() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-9 grid-cols-2 w-full h-full">
      <div className="flex row-span-1 col-span-2 gap-x-2 sm:gap-x-4 lg:gap-x-6 pb-6">
        <div className="flex flex-7 sm:flex-6 items-center justify-evenly sm:justify-end bg-[var(--color-main)]/90 drop-shadow-custom rounded-xl sm:rounded-2xl">
          <span className="text-white text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl lg:mr-1.5 xl:mr-3">
            5200
          </span>
          <Image
            src={coinIcon}
            alt="코인"
            className="w-auto h-[40%] sm:h-[50%] max-w-[60%] max-h-[60%] aspect-square object-contain sm:mr-1 md:mr-1.5 lg:mr-2 xl:mr-4"
          />
        </div>
        <button
          className="flex flex-3 sm:flex-4 items-center justify-center bg-[var(--color-lightRed)]/90 hover:bg-[var(--color-lightRed-hover)]/90 rounded-xl sm:rounded-2xl text-white md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl border border-black drop-shadow-custom cursor-pointer"
          onClick={() => router.push("/")}
        >
          {/* sm 이상일 때 텍스트 표시 */}
          <span className="hidden sm:inline">나가기</span>
          {/* sm보다 작을 때 이미지 표시 */}
          <Image src={exitIcon} alt="나가기" className="w-6 h-6 sm:hidden" />
        </button>
      </div>
      {/* 사용자 프로필 이미지 */}
      <div className="flex items-center justify-center row-span-4 col-span-2 w-full h-full bg-[#1B399C] rounded-t-2xl drop-shadow-custom">
        <Image src={profileImg} alt="프로필" className="w-auto h-[80%]" />
      </div>
      {/* 사용자 닉네임, 장바구니 */}
      <div className="grid grid-rows-3 grid-cols-1 row-span-3 col-span-2 justify-center w-full h-full">
        <div className="row-span-1 bg-[#E9ECEF] w-full h-full flex items-center justify-center drop-shadow-custom">
          <span className="md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            닉네임
          </span>
        </div>
        {/* 피그마 상 비어있는 공간, 장바구니 */}
        <div className="row-span-2 bg-[#1B399C] drop-shadow-custom"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 bg-[#1B399C] p-2.5 py-1.5 lg:px-5 lg:py-3 gap-y-1.5 md:gap-x-1.5 lg:gap-x-3 rounded-b-2xl drop-shadow-custom">
        <button className="row-span-1 bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] rounded-2xl text-white md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl border border-black drop-shadow-custom cursor-pointer">
          전부 구매
        </button>
        <button className="row-span-1 bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] rounded-2xl text-white md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl border border-black drop-shadow-custom cursor-pointer">
          원래대로
        </button>
      </div>
    </div>
  );
}

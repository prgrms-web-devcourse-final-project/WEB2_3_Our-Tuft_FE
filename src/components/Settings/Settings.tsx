"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import settingIcon from "@/assets/icons/setting.svg";
import reportIcon from "@/assets/icons/report.svg";
import exitIcon from "@/assets/icons/exit.svg";

export default function Settings() {
  const router = useRouter();
  return (
    <>
      {/* 설정 버튼 영역 */}
      <div className="flex bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 items-center justify-center w-8 h-8 min-[1025px]:h-10 min-[1025px]:w-full min-[1025px]:h-full rounded-lg md:rounded-xl lg:rounded-2xl cursor-pointer">
        <Image
          src={settingIcon}
          alt="setting"
          className="w-5 min-[1025px]:w-6 xl:w-8"
        />
      </div>
      <div className="flex bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 items-center justify-center w-8 h-8 min-[1025px]:w-full min-[1025px]:h-full rounded-lg md:rounded-xl lg:rounded-2xl cursor-pointer">
        <Image
          src={reportIcon}
          alt="report"
          className="w-5 min-[1025px]:w-6 xl:w-8"
        />
      </div>
      <div
        className="flex bg-[var(--color-lightRed)]/90 hover:bg-[var(--color-lightRed-hover)]/90 items-center justify-center w-8 h-8 min-[1025px]:w-full min-[1025px]:h-full rounded-lg md:rounded-xl lg:rounded-2xl cursor-pointer"
        onClick={() => router.push("/game")}
      >
        <Image
          src={exitIcon}
          alt="exit"
          className="w-5 min-[1025px]:w-6 xl:w-8"
        />
      </div>
    </>
  );
}

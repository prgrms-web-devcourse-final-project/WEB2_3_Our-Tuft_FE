import Image from "next/image";
import React from "react";
import dummy from "@/assets/images/dummy.svg";

export default function User() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full bg-[#ffd377] lg:rounded-[12px] lg:p-5 text-xl drop-shadow-custom cursor-pointer">
        <Image
          src={dummy}
          alt="아이콘"
          className="w-full h-40 text-center rounded-t-[12px] object-cover"
        />
        <div className="w-full bg-white text-black text-center rounded-b-[12px]  p-1 text-[18px]">
          닉네임
        </div>
        <div className="justify-cente pt-2 text-2xl font-bold">250</div>
      </div>
    </div>
  );
}

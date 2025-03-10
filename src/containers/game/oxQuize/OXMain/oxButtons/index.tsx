"use client";
import Image from "next/image";
import OImg from "@/assets/images/O-img.png";
import XImg from "@/assets/images/X-img.svg";
import { sendMessage } from "../../../../../service/api/socketConnection";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OXButtons({ oxAnswer }: { oxAnswer: boolean | null }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!id) return;

      if (event.key === "F1") {
        event.preventDefault();
        sendMessage(`/app/game/${id}/ox`, "O");
        console.log("O");
      }

      if (event.key === "F2") {
        event.preventDefault();
        sendMessage(`/app/game/${id}/ox`, "X");
        console.log("X");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="2xl:fixed md:absolute absolute left-1/2 transform -translate-x-1/2 top-[30%] md:top-[15%] 2xl:top-[30%] flex gap-3 z-10 cursor-pointer">
      <div
        onClick={() => {
          if (oxAnswer !== null) return;
          sendMessage(`/app/game/${id}/ox`, "O");
        }}
        className={`relative flex items-center justify-center 
        bg-white rounded-xl opacity-90 drop-shadow-custom 
          w-14 h-14 md:w-20 md:h-20 2xl:w-32 2xl:h-32 
          hover:scale-105 
          md:hover:scale-115 
          2xl:hover:scale-110
          hover:opacity-70
          `}
      >
        <div className="absolute top-2 right-2 text-black text-xl font-bold hidden 2xl:block">
          F1
        </div>
        <Image src={OImg} alt="O 이미지" className="w-28" />
      </div>

      <div
        onClick={() => {
          if (oxAnswer !== null) return;
          sendMessage(`/app/game/${id}/ox`, "X");
        }}
        className={`relative flex items-center justify-center 
          bg-white rounded-xl opacity-90 drop-shadow-custom 
            w-14 h-14 md:w-20 md:h-20 2xl:w-32 2xl:h-32 
            hover:scale-105 
            md:hover:scale-115 
            2xl:hover:scale-110
            hover:opacity-70
            `}
      >
        <div className="absolute top-2 right-2 text-black text-xl font-bold hidden 2xl:block">
          F2
        </div>
        <Image src={XImg} alt="X 이미지" className="2xl:w-20 md:w-16 w-12" />
      </div>
    </div>
  );
}

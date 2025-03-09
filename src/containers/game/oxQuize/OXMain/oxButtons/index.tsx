"use client";
import Image from "next/image";
import OImg from "@/assets/images/O-img.png";
import XImg from "@/assets/images/X-img.svg";
import { useEffect, useState } from "react";

export default function OXButtons({ oxAnswer }: { oxAnswer: boolean | null }) {
  const [answers, setAnswer] = useState<boolean | null>(null);
  // const { userList } = useUser();
  // F1 = O 버튼 F2 = X버튼
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        socketAnswer(true);
      }

      if (event.key === "F2") {
        event.preventDefault();
        socketAnswer(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [oxAnswer]);

  const socketAnswer = (val: boolean) => {
    setAnswer(val);
    // socket.emit("answer", { user: userList, answer: val });
    // console.log("userList", userList, val);
  };

  return (
    <div className="2xl:fixed md:absolute absolute left-1/2 transform -translate-x-1/2 top-[30%] md:top-[15%] 2xl:top-[30%] flex gap-3 z-10 cursor-pointer">
      <div
        onClick={() => {
          if (oxAnswer !== null) return;
          socketAnswer(true);
        }}
        className={`relative flex items-center justify-center 
        bg-white rounded-xl opacity-90 drop-shadow-custom 
          w-14 h-14 md:w-20 md:h-20 2xl:w-32 2xl:h-32 
          hover:scale-105 
          md:hover:scale-115 
          2xl:hover:scale-110
          hover:opacity-70
          ${
            answers === true
              ? "border-8 border-[var(--color-secondPoint)]"
              : null
          }
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
          socketAnswer(false);
        }}
        className={`relative flex items-center justify-center 
          bg-white rounded-xl opacity-90 drop-shadow-custom 
            w-14 h-14 md:w-20 md:h-20 2xl:w-32 2xl:h-32 
            hover:scale-105 
            md:hover:scale-115 
            2xl:hover:scale-110
            hover:opacity-70
            ${
              answers === false
                ? "border-8 border-[var(--color-lightRed)]"
                : null
            }
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

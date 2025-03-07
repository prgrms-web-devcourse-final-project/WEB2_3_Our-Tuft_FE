"use client";
import { tree } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { useState } from "react";

export default function RoomActionButtons() {
  const [host, setHost] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);

  const sendReadyState = () => {
    setReady((prev) => !prev);
  };
  return (
    <div className="flex md:text-xl xl:text-3xl text-[10px] cursor-pointer break-keep text-white">
      {host === "방장" ? (
        <button
          className="
          flex-1 
          bg-[#4C3BCF] hover:bg-[var(--color-point-hover)]
          xl:py-8 py-5
          xl:rounded-[20px] md:rounded-[12px] rounded-[8px]
          cursor-pointer p-2 mr-3"
        >
          시 작
        </button>
      ) : (
        <>
          {/* <Link href="/game/oxquiz">
            <button
              className="
            hidden xl:block md:block flex-1 
            
            xl:py-8 py-5
            xl:rounded-l-[20px] rounded-l-[12px]"
            >
              {ready ? "준비 완료" : "대기 중"}
            </button>
          </Link> */}

          <button
            onClick={sendReadyState}
            className={`flex-1 
              ${
                ready
                  ? "bg-[var(--color-second)] hover:bg-[var(--color-second-hover)]"
                  : "bg-[var(--color-amberOrange)] hover:bg-[var(--color-amberOrange-hover)]"
              }
              xl:rounded-[20px] md:rounded-[12px] rounded-[8px]
              xl:py-8 py-5
              cursor-pointer p-2 mr-3`}
          >
            {ready ? "준비 완료" : "준비"}
          </button>
        </>
      )}
    </div>
  );
}

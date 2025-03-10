"use client";

import Timer from "./Timer";
import { quizeMsg } from "../../types/quize";

export default function QuizBoard({
  quize,
  chat,
}: {
  quize?: string;
  chat: quizeMsg[];
}) {
  return (
    <div
      className="
        flex justify-center items-center relative 
        p-3 2xl:p-6
        h-66 mt-5 mb-2 2xl:h-84 
        bg-[var(--color-point)] drop-shadow-custom 
        rounded-[32px] 2xl:rounded-[12px] 
        "
    >
      <div
        className="
          flex flex-col gap-6 
          p-6 2xl:p-8
          h-56 2xl:h-72 w-[97%] 2xl:w-full 
          bg-[var(--color-second)] drop-shadow-custom 
          rounded-[32px] 2xl:rounded-[12px] text-white 
          "
      >
        <div className="text-xl md:text-2xl 2xl:text-3xl whitespace-normal">
          {quize && (
            <div>
              <div className="text-2xl md:text-3xl 2xl:text-4xl mb-5">
                {chat
                  .filter((i) => i.message.includes("라운드"))
                  .pop()
                  ?.message.slice(0, 2)}{" "}
                라운드
              </div>
              <p>{quize}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-5 2xl:bottom-7 right-5 2xl:right-7">
          <Timer quize={quize ?? ""} />
        </div>
      </div>
    </div>
  );
}

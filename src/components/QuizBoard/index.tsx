"use client";

import { useEffect, useState } from "react";
import Timer from "./Timer";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

export default function QuizBoard({
  oxAnswer,
}: {
  oxAnswer: (val: boolean | null) => void;
}) {
  const [quize, setQuize] = useState<
    { question: string; hint: string; answer: boolean }[]
  >([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on(
      "quize",
      (msg: { question: string; hint: string; answer: boolean }[]) => {
        console.log("Received quize data:", msg);
        setQuize(msg);
        setCurrentIndex(0);
      }
    );

    return () => {
      socket.off("quize");
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    const timer = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const quizeLoop = async () => {
      for (let index = 0; index < quize.length; index++) {
        if (!isActive) return;
        setCurrentIndex(index);
        setShowAnswer(false);
        await timer(10000); // 5초 동안 퀴즈 표시

        setShowAnswer(true);
        oxAnswer(quize[currentIndex].answer);
        await timer(5000); // 3초 동안 정답 표시
        oxAnswer(null);
      }
    };

    quizeLoop();

    return () => {
      isActive = false;
    };
  }, [quize]);

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
          {quize.length > 0 && currentIndex < quize.length && (
            <div>
              <div className="text-2xl md:text-3xl 2xl:text-4xl mb-5">
                문제 {currentIndex + 1}
              </div>
              <p>
                {showAnswer
                  ? quize[currentIndex].answer
                    ? "O"
                    : "X"
                  : quize[currentIndex].question}
              </p>
            </div>
          )}
        </div>
        <div className="absolute bottom-5 2xl:bottom-7 right-5 2xl:right-7">
          <Timer />
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

export default function GameDescription() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [nextGameIndex, setNextGameIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const games = [
    {
      title: "HIQ",
      descriptions: [
        "소통과 경쟁이 함께하는 \n엔터테이먼트 플랫폼 하이큐 입니다!",
        "저희는 단순히 게임을 제공하는 것이 아니라",
        "마치 라운지처럼  사람들이 모여\n실시간으로 소통하며 퀴즈, 게임, 토론을 하며",
        "함께 즐기고 성장하는 경험을 제공하고자 합니다.",
      ],
    },
    {
      title: "스피드 퀴즈",
      descriptions: [
        "시간 제한 안에 주어진\n퀴즈를 맞춰야 합니다.",
        "정답을 가장 먼저 맞힌 플레어가\n점수를 획득합니다.",
        "최종적으로 가장 높은 점수를 획득한\n플레이어가 승리합니다.",
      ],
    },
    {
      title: "OX 퀴즈",
      descriptions: [
        "O 또는 X로 답할 수 있는\n퀴즈가 출제됩니다.",
        "제한 시간 안에 정답을\n선택해야 합니다.",
        "많은 문제를 맞힐수록\n높은 포인트를 획득합니다.",
      ],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentGameIndex(nextGameIndex);
        setNextGameIndex((nextGameIndex + 1) % games.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [nextGameIndex, games.length]);

  return (
    <div className="w-full h-full bg-[var(--color-point)] rounded-lg p-4 flex flex-col relative overflow-hidden text-[0.85vw] md:text-[0.75vw] lg:text-[0.65vw] xl:text-[0.55vw]">
      <div
        key={currentGameIndex}
        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center
          transition-transform duration-500 ease-in-out transform px-[5%]
          ${isAnimating ? "-translate-x-full" : "translate-x-0"}`}
      >
        <h2 className="text-[2.4em] font-bold text-white text-center mb-[5%] leading-tight">
          {games[currentGameIndex].title}
        </h2>
        <ul className="list-disc text-white space-y-[0.8em] text-[1.7em] text-center w-[90%] pl-[5%] leading-tight">
          {games[currentGameIndex].descriptions.map((desc, index) => (
            <li key={index} className="whitespace-pre-wrap">
              {desc}
            </li>
          ))}
        </ul>
      </div>
      <div
        key={nextGameIndex}
        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center
          transition-transform duration-500 ease-in-out transform px-[5%]
          ${isAnimating ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-[2.4em] font-bold text-white text-center mb-[5%] leading-tight">
          {games[nextGameIndex].title}
        </h2>
        <ul className="list-disc text-white space-y-[0.8em] text-[1.7em] text-center w-[90%] pl-[5%] leading-tight">
          {games[nextGameIndex].descriptions.map((desc, index) => (
            <li key={index} className="whitespace-pre-wrap">
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

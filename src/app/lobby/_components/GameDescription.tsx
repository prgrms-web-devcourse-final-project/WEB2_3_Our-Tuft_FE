import { useState, useEffect } from "react";

export default function GameDescription() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [nextGameIndex, setNextGameIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const games = [
    {
      title: "그림 맞추기",
      descriptions: [
        "각 라운드마다 제시어에 맞게\n플레이어는 그림으로 표현합니다.",
        "그림을 보고, 제시어를 맞힌\n플레이어 순으로 점수를 획득합니다.",
        "가장 많은 점수를 얻은\n플레이어가 승리합니다.",
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
  }, [nextGameIndex]);

  return (
    <div className="w-full h-full bg-[var(--color-point)] rounded-lg p-4 flex flex-col relative overflow-hidden">
      <div
        key={currentGameIndex}
        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center
          transition-transform duration-500 ease-in-out transform px-4
          ${isAnimating ? "-translate-x-full" : "translate-x-0"}`}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          {games[currentGameIndex].title}
        </h2>
        <ul className="list-disc text-white space-y-3 text-base text-center max-w-md pl-4">
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
          transition-transform duration-500 ease-in-out transform px-4
          ${isAnimating ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          {games[nextGameIndex].title}
        </h2>
        <ul className="list-disc text-white space-y-3 text-base text-center max-w-md pl-4">
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

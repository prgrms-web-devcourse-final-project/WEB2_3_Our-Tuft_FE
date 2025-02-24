import { useState, useEffect } from "react";
import Image from "next/image";

export default function GameBanner() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [nextGameIndex, setNextGameIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const games = [
    {
      name: "skribbl",
      image: "/assets/images/skribbl.png",
    },
    {
      name: "speed",
      image: "/assets/images/speed.png",
    },
    {
      name: "ox",
      image: "/assets/images/OX.png",
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
    <div className="w-full h-full relative overflow-hidden rounded-lg">
      <div
        key={currentGameIndex}
        className={`absolute inset-0 w-full h-full
          transition-transform duration-500 ease-in-out transform
          ${isAnimating ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={games[currentGameIndex].image}
            alt={games[currentGameIndex].name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
      </div>
      <div
        key={nextGameIndex}
        className={`absolute inset-0 w-full h-full
          transition-transform duration-500 ease-in-out transform
          ${isAnimating ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={games[nextGameIndex].image}
            alt={games[nextGameIndex].name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

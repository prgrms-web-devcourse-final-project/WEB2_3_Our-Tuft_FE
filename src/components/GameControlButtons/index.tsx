"use client";
import { useEffect, useRef, useState } from "react";
import RoundButton from "../../components/RoundButton";
import LeaveGameModal from "../LeaveGameModal/LeaveGameModal";
import Image from "next/image";
import up from "@/assets/icons/volumeOn.svg";
import off from "@/assets/icons/volumeOff.svg";

export default function GameControlButtons() {
  const [isOpen, setOpenLeave] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current && audioRef.current.pause();
    } else {
      audioRef.current && audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    audioRef.current && audioRef.current.play();
  }, []);
  return (
    <div className="flex 2xl:gap-3 gap-1 text-2xl items-center">
      <audio ref={audioRef} loop>
        <source src="/assets/audio/SellBuyMusicbgm.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <RoundButton
        width={"w-full"}
        height={"xl:h-[70px] md:h-[55px] h-[50px]"}
        bgColor={"bg-[var(--color-lightRed)]"}
        text={""}
        className={"hover:bg-[var(--color-lightRed-hover)]"}
        url={`${
          isPlaying
            ? "/assets/icons/volumeOn.svg"
            : "/assets/icons/volumeOff.svg"
        }`}
        onClick={() => togglePlayPause()}
      />
      <RoundButton
        width={"w-full"}
        height={"xl:h-[70px] md:h-[55px] h-[50px]"}
        bgColor={"bg-[var(--color-lightRed)]"}
        text={"나가기"}
        className={"hover:bg-[var(--color-lightRed-hover)]"}
        url={"/assets/icons/exit.svg"}
        onClick={() => setOpenLeave(true)}
      />
      {isOpen && <LeaveGameModal setIsClose={setOpenLeave} />}
    </div>
  );
}

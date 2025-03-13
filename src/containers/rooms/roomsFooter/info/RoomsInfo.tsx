"use client";

import { useRef, useState } from "react";
import { topic } from "../../../../types/modal";
import { roomInfoData } from "../../../../types/Room";
import { useIsRoomStore } from "../../../../store/roomStore";
import TopicModal from "../../roomsModal/TopicModal";
import CreateRoomModal from "../../../../app/lobby/_components/CreateRoomModal";
import up from "@/assets/icons/volumeOn.svg";
import off from "@/assets/icons/volumeOff.svg";
import Image from "next/image";

export default function RoomsInfo({ roomInfo }: { roomInfo: roomInfoData }) {
  const { isHost, quizeSet } = useIsRoomStore();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<topic>({
    quizSetId: 0,
    quizSetName: "",
  });
  const [isCreateRoomOpen, setCreateRoomOpen] = useState<boolean>(false);

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
  return (
    <div
      className="
        flex justify-between items-center text-white
        xl:text-2xl md:text-lg text-sm
        xl:py-1 md:px-4 px-2
        md:break-keep"
    >
      <button
        className={`
          bg-[var(--color-secondPoint)] ${
            isHost && "hover:bg-[var(--color-secondPoint-hover)]"
          }
          xl:rounded-[20px] rounded-[16px] xl:py-5 py-2 w-[40%] cursor-pointer"
        `}
        onClick={() => isHost && setOpen(true)}
      >
        {topic?.quizSetName
          ? topic?.quizSetName
          : isHost
          ? "퀴즈를 선택해주세요"
          : quizeSet || "퀴즈 선택중.."}
      </button>
      <div className="flex gap-4 text-center items-center">
        <div className="xl:block md:block hidden">제한 시간</div>
        <div
          className="
          bg-[var(--color-point)] text-center
          xl:rounded-[20px] md:rounded-[16px] rounded-[8px] 
          xl:py-5 xl:px-10 md:px-5 p-1"
        >
          {roomInfo.data.time}초
        </div>
      </div>
      <div
        className="
          flex text-center items-center
          xl:gap-5 md:gap-3 gap-0 
          xl:bg-transparent md:bg-transparent bg-[var(--color-point)] 
          rounded-[8px] pl-1"
      >
        <div>라운드</div>
        <div
          className="
          bg-[var(--color-point)]
          xl:rounded-[20px] md:rounded-[16px] rounded-[8px]
          xl:py-5 xl:px-10 md:px-5 p-1"
        >
          {roomInfo.data.round}
        </div>
      </div>
      <div>
        <audio ref={audioRef} loop>
          <source src="/assets/audio/SellBuyMusicbgm.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <button
          onClick={togglePlayPause}
          className="bg-[var(--color-point)] xl:rounded-[20px] md:rounded-[16px] rounded-[8px] p-1"
        >
          {isPlaying ? (
            <Image src={off} alt="소리" width="60" />
          ) : (
            <Image src={up} alt="소리" width="60" />
          )}
        </button>
      </div>
      {/* {isHost ? (
        <div
          onClick={() => isHost && setCreateRoomOpen(true)}
          className="
          flex justify-center
          xl:gap-6 md:gap-2 
          xl:w-[15%] 
          xl:rounded-[20px] md:rounded-[16px] rounded-[8px]
          xl:py-5 xl:px-10 md:py-2 md:px-4 p-1 
          bg-[var(--color-point)] hover:bg-[var(--color-point-hover)]
          cursor-pointer"
        >
          <>
            <Image
              src={setting}
              alt="설정 아이콘"
              className="xl:w-8 xl:h-8 md:w-7 md:h-7 w-5 h-5"
            />
            <span className="xl:block hidden">설정</span>
          </>
        </div>
      ) : null} */}
      {isOpen && (
        <TopicModal setIsClose={setOpen} setTopic={setTopic} topic={topic} />
      )}
      {isCreateRoomOpen && (
        <CreateRoomModal
          type="설정"
          isOpen={isCreateRoomOpen}
          onClose={() => setCreateRoomOpen(false)}
        />
      )}
    </div>
  );
}

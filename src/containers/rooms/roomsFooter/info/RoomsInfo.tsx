"use client";
import Image from "next/image";
import setting from "@/assets/icons/setting.svg";
import { useState } from "react";
import TopicModal from "../../roomsModal/TopicModal";
import CreateRoomModal from "../../../../app/lobby/_components/CreateRoomModal";
import { topic } from "../../../../types/modal";
import { roomInfoData } from "../../../../types/Room";
import { useIsRoomStore } from "../../../../store/roomStore";

export default function RoomsInfo({ roomInfo }: { roomInfo: roomInfoData }) {
  const { isHost } = useIsRoomStore();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<topic>({
    quizSetId: 0,
    quizSetName: "주제 선택",
  });
  const [isCreateRoomOpen, setCreateRoomOpen] = useState<boolean>(false);

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
        {topic?.quizSetName || "선택해주세요"}
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
      {isHost ? (
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
      ) : null}
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

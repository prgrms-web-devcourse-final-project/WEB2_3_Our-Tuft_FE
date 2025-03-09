"use client";

import { useState } from "react";
import { sendMessage } from "../../../../service/api/socketConnection";
import { useParams, useRouter } from "next/navigation";
import { roomInfoData } from "../../../../types/roomType";
import { useIsRoomStore } from "../../../../store/roomStore";

export default function RoomActionButtons({
  roomInfo,
}: {
  roomInfo: roomInfoData;
}) {
  const router = useRouter();
  const params = useParams();

  const { isHost, isQuizisReady } = useIsRoomStore();

  const [ready, setReady] = useState<boolean>(false);

  const sendReadyState = () => {
    setReady((prev) => !prev);
    sendMessage(`/app/room/${params.id}/event`, "PLAYER_CHANGE_READY");
  };

  const sendStartGame = () => {
    if (isQuizisReady) {
      sendMessage(`/app/room/${params.id}/event`, "SWITCHING_ROOM_TO_GAME");
      router.push(`/game/${roomInfo.data.gameType}?id=${params.id}`);
    }
  };

  return (
    <div className="flex md:text-xl xl:text-3xl text-[10px] cursor-pointer break-keep text-white">
      {isHost ? (
        <button
          onClick={sendStartGame}
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

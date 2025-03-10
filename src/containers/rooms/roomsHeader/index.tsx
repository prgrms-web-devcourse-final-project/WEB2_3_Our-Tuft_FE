import Image from "next/image";
import lock from "@/assets/icons/rock.png";
import unlock from "@/assets/images/public.png";
import CloseButton from "../../../components/CloseButton/CloseButton";
import { roomInfoData } from "../../../types/Room";
import { useIsRoomStore } from "../../../store/roomStore";
import { useEffect } from "react";

export default function RoomsHeader({ roomInfo }: { roomInfo: roomInfoData }) {
  const { setInfoRoom } = useIsRoomStore();
  useEffect(() => {
    setInfoRoom(roomInfo.data.gameType);
  }, [roomInfo.data.gameType]);
  return (
    <div className="flex w-full">
      <div
        className="
          flex w-full 
          bg-[var(--color-second)] h-18 xl:h-24 md:h-20 
          items-center justify-between 
          xl:text-3xl md:text-xl text-md 
          px-5 
          xl:rounded-[20px] md:rounded-[12px] rounded-[20px] 
          drop-shadow-custom text-white
          "
      >
        <div className="flex gap-5 items-center">
          <Image
            src={roomInfo.data.disclosure ? unlock : lock}
            alt="잠금 아이콘"
            className="
              xl:w-12 xl:h-12 
              md:w-10 md:h-10 
              w-6 h-6
              "
          />

          <div
            className="
              absolute xl:static md:static top-[10%] left-0
              xl:bg-[#3052ccb8] md:bg-[#3052ccb8] 
              xl:rounded-[20px] md:rounded-[10px] 
              p-0 pl-20 xl:p-4 md:p-2
              "
          >
            # {roomInfo.data.roomId}
          </div>

          <div
            className="
            absolute xl:static md:static -top-[5%] left-40
              xl:bg-[#3052ccb8] md:bg-[#3052ccb8] 
              xl:rounded-[20px] md:rounded-[10px] 
              xl:p-4 md:p-2  
              mt-3 xl:m-0 md:m-0
              "
          >
            {roomInfo.data.gameType} 퀴즈
          </div>

          <div
            className="
              xl:bg-[#3052ccb8] md:bg-[#3052ccb8] 
              xl:rounded-[20px] md:rounded-[10px] 
              p-0 xl:p-4 md:p-2 pt-2
              mt-3 xl:m-0 md:m-0
              overflow-hidden
              text-ellipsis
              whitespace-nowrap
              max-w-[23ch]
              xl:overflow-visible xl:whitespace-normal xl:max-w-none 
              "
          >
            {roomInfo.data.roomName}
          </div>
        </div>

        <CloseButton url={"/lobby"} />
      </div>
    </div>
  );
}

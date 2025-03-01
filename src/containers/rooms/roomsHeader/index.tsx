import Image from "next/image";
import rock from "@/assets/icons/rock.png";
import CloseButton from "../../../components/CloseButton/CloseButton";

export default function RoomsHeader() {
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
            src={rock}
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
            # 1078
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
            스피드 퀴즈
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
            방 제목이 길어지는 경우는 이렇게
          </div>
        </div>

        <CloseButton url={"/lobby"} />
      </div>
    </div>
  );
}

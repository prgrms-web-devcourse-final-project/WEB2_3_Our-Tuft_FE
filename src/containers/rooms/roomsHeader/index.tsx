import Image from "next/image";
import rock from "@/assets/icons/rock.png";
import CloseButton from "../../../components/CloseButton/CloseButton";

export default function RoomsHeader() {
  return (
    <div className="flex w-full">
      <div className="flex bg-[var(--color-second)] h-24 2xl:h-24 md:h-20 w-full items-center justify-between 2xl:text-3xl md:text-xl px-9 2xl:rounded-[20px] md:rounded-[12px] drop-shadow-custom">
        <div className="flex gap-5 items-center">
          <Image
            src={rock}
            alt="잠금 아이콘 "
            className="2xl:w-12 2xl:h-12 md:w-8 md:h-8"
          />
          <div className="bg-[#3052ccb8] 2xl:rounded-[20px] md:rounded-[10px] p-4 2xl:p-4 md:p-2">
            # 1078
          </div>
          <div className="bg-[#3052ccb8] 2xl:rounded-[20px] md:rounded-[10px] p-4 2xl:p-4 md:p-2">
            스피드 퀴즈
          </div>
          <div className="bg-[#3052ccb8] 2xl:rounded-[20px] md:rounded-[10px] p-4 2xl:p-4 md:p-2">
            방 제목
          </div>
        </div>
        <CloseButton />
      </div>
    </div>
  );
}

import Image from "next/image";
import rock from "@/assets/icons/rock.png";
import CloseButton from "../../../components/Button/CloseButton";

export default function RoomsHeader() {
  return (
    <div className="flex w-full">
      <div className="flex bg-[var(--color-second)] h-24 w-full items-center justify-between text-3xl px-9 rounded-[20px] drop-shadow-custom">
        <div className="flex gap-5 items-center">
          <Image src={rock} alt="잠금 아이콘 " className="w-12 h-12" />
          <div className="bg-[#3052ccb8] rounded-[20px] p-4"># 1078</div>
          <div className="bg-[#3052ccb8] rounded-[20px] p-4">스피드 퀴즈</div>
          <div className="bg-[#3052ccb8] rounded-[20px] p-4">방 제목</div>
        </div>
        <CloseButton />
      </div>
    </div>
  );
}

import Image from "next/image";
import setting from "@/assets/icons/setting.svg";
import { useModalStore } from "../../../../store/modalStore";

export default function RoomsInfo() {
  const { isOpen } = useModalStore();
  return (
    <div className="flex justify-between md:text-md lg:text-3xl items-center px-5 md:break-keep">
      <button
        className="bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] w-[20%] lg:rounded-[20px] md:rounded-[16px] md:py-2 lg:py-7 cursor-pointer"
        onClick={() => isOpen("topic")}
      >
        주제: 상식{" "}
      </button>
      <div className="flex gap-2  text-center items-center">
        <div>제한 시간</div>
        <div className="bg-[var(--color-point)] text-center md:py-2 md:px-5 lg:py-7 lg:px-10 lg:rounded-[20px] md:rounded-[16px]">
          120초
        </div>
      </div>
      <div className="flex gap-2  text-center items-center">
        <div>라운드</div>
        <div className="bg-[var(--color-point)] md:py-2 md:px-5 lg:py-7 lg:px-10 lg:rounded-[20px] md:rounded-[16px]">
          25
        </div>
      </div>
      <div className="flex md:gap-2 lg:gap-6 bg-[var(--color-point)] lg:w-[15%] md:py-2 md:px-4 lg:py-7 lg:px-10 lg:rounded-[20px] md:rounded-[16px] justify-center cursor-pointer">
        <Image
          src={setting}
          alt="설정 아이콘"
          className="lg:w-8 lg:h-8 md:w-6 md:h-6"
        />
        <span className="md:hidden lg:block">설정</span>
      </div>
    </div>
  );
}

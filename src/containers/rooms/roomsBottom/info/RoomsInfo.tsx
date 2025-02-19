import Image from "next/image";
import setting from "@/assets/icons/setting.svg";

export default function RoomsInfo() {
  return (
    <div className="flex justify-between md:text-md lg:text-3xl items-center px-5 md:break-keep">
      <button className="bg-[var(--color-secondPoint)] w-[20%] rounded-[20px] py-7 min-[1024px]:max-[1380px]:py-0">
        주제: 상식{" "}
      </button>
      <div className="flex md:gap-2 lg:gap-10 text-center items-center">
        <div>제한 시간</div>
        <div className="bg-[var(--color-point)] md:py-2 md:px-5 lg:py-7 lg:px-14 rounded-[20px]">
          120초
        </div>
      </div>
      <div className="flex md:gap-2 lg:gap-10  text-center items-center">
        <div>라운드</div>
        <div className="bg-[var(--color-point)] md:py-2 md:px-5 lg:py-7 lg:px-20 rounded-[20px]">
          25
        </div>
      </div>
      <div className="flex md:gap-2 lg:gap-6 bg-[var(--color-point)] md:py-2 md:px-3 lg:py-7 lg:px-10 rounded-[20px] items-center">
        <Image
          src={setting}
          alt="설정 아이콘"
          className="lg:w-8 lg:h-8 md:w-4 md:h-4"
        />
        <span>설정</span>
      </div>
    </div>
  );
}

import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";

export default function UserCard({ color }: { color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-[var(--color-amberOrange)] lg:rounded-[16px] md:rounded-[8px] lg:px-8 md:px-4 lg:pt-8 md:pt-4 text-xl drop-shadow-custom">
      <Image
        src={dummy}
        alt="아이콘"
        className="w-full lg:h-42 md:h-20 text-center lg:rounded-t-[16px] md:rounded-t-[8px] object-cover"
      />
      <div className="w-full bg-white text-black text-center lg:rounded-b-[16px] md:rounded-b-[8px] p-2 md:text-sm lg:text-2xl">
        닉네임
      </div>
      <div className="bg-[var(--color-amberOrange)] justify-center text-[#993000] lg:py-5 md:py-2 lg:text-2xl md:text-sm md:font-bold">
        준비 완료
      </div>
    </div>
  );
}

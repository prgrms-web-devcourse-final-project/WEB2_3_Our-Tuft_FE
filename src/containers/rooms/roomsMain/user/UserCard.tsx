import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";

export default function UserCard({ color }: { color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-[var(--color-amberOrange)] rounded-[16px] lg:px-8 md:px-4 lg:pt-8 md:pt-4 text-xl drop-shadow-custom">
      <Image
        src={dummy}
        alt="아이콘"
        className="w-full lg:h-44 md:h-20 text-center rounded-t-[16px] object-cover"
      />
      <div className="w-full bg-white text-black text-center rounded-b-[16px] p-2 ">
        닉네임
      </div>
      <div className="bg-[var(--color-amberOrange)] justify-center text-[#993000] py-5 text-2xl">
        준비 완료
      </div>
    </div>
  );
}

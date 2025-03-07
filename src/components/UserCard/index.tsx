import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";

export default function UserCard({
  bgColor = "bg-[var(--color-amberOrange)]",
  borderRadius = "2xl:rounded-[20px] rounded-[28px]",
  padding = "pt-5 px-7 pb-0",
  imageSize = "h-45",
  nickname,
  textSize = "text-xl",
  textSize2 = "text-2xl",
  className,
  children,
  oxAnswer,
}: {
  bgColor?: string;
  borderRadius?: string;
  padding?: string;
  imageSize?: string;
  nickname?: string;
  textSize?: string;
  textSize2?: string;
  className?: string;
  children?: React.ReactNode;
  oxAnswer: boolean | null;
}) {
  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center w-full 
          ${
            oxAnswer ? "bg-[#FFA20E]" : bgColor
          } ${borderRadius} ${padding} ${textSize} ${className}  
          hover:opacity-80 drop-shadow-custom cursor-pointer`}
      >
        <Image
          src={dummy}
          alt="아이콘"
          className={`w-full ${imageSize} text-center rounded-t-[16px] object-cover hidden 2xl:block`}
        />
        <div
          className={`w-full 2xl:bg-white text-black 2xl:text-center rounded-b-[16px] 2xl:p-1 pl-3 ${textSize2}`}
        >
          {nickname}
        </div>
        {children}
      </div>
    </div>
  );
}

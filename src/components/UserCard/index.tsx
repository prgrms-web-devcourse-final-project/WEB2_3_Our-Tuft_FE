import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";

export default function UserCard({
  bgColor = "bg-[var(--color-amberOrange)]",
  borderRadius = "rounded-[12px]",
  padding = "p-5",
  imageSize = "h-42",
  nickname = "닉네임",
  textSize = "text-xl",
  textSize2 = "text-2xl",
  className,
  children,
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
}) {
  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center w-full ${bgColor} ${borderRadius} ${padding} ${textSize} ${className}  hover:opacity-80 drop-shadow-custom cursor-pointer`}
      >
        <Image
          src={dummy}
          alt="아이콘"
          className={`w-full ${imageSize} text-center rounded-t-[12px] object-cover`}
        />
        <div
          className={`w-full bg-white text-black text-center rounded-b-[12px] p-1 ${textSize2}`}
        >
          {nickname}
        </div>
        {children}
      </div>
    </div>
  );
}

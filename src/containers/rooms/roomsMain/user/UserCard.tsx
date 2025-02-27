import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";

export default function UserCard({
  bgColor = "bg-[var(--color-amberOrange)]",
  borderRadius = "2xl:rounded-[20px] rounded-[28px] md:rounded-[18px]",
  padding = "py-3 px-7 xl:px-8 xl:pt-8 md:p-3 ",
  imageSize = "h-45",
  nickname = "닉네임",
  textSize = "2xl:text-xl md:text-xl text-lg",
  textSize2 = "2xl:text-2xl md:text-xl text-lg",
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
    <div className="flex flex-col items-center justify-center">
      <div
        className={`
          flex flex-col items-center justify-center 
          2xl:w-full w-full 
          hover:opacity-80 drop-shadow-custom cursor-pointer
          ${bgColor} ${borderRadius} ${padding} ${textSize} ${className}  
        `}
      >
        <Image
          src={dummy}
          alt="아이콘"
          className={`
            w-full 
            text-center 
            rounded-t-[16px] 
            md:rounded-t-[12px] 
            object-cover 
            hidden 2xl:block md:block
            ${imageSize} 
          `}
        />

        <div
          className={`
            w-full 
            2xl:bg-white md:bg-white 
            text-black 
            2xl:text-center md:text-center 
            rounded-b-[16px] 
            2xl:p-1 md:p-0 md:py-1 
            pl-3 
            ${textSize2}
          `}
        >
          {nickname}
        </div>

        {children}
      </div>
    </div>
  );
}

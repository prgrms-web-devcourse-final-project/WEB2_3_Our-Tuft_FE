import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";
import { useIsHostStore } from "../../../../store/roomStore";
import { useEffect } from "react";

export default function UserCard({
  nickName,
  isReady,
  host,
  children,
}: {
  nickName: string;
  isReady: string;
  host: boolean;
  children?: React.ReactNode;
}) {
  const { setIsHost } = useIsHostStore();
  useEffect(() => {
    setIsHost(host);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`
          flex flex-col items-center justify-center
          cursor-pointer hover:opacity-80 drop-shadow-custom 
          ${
            host
              ? "bg-[var(--color-main)]"
              : isReady === "true"
              ? "bg-[var(--color-amberOrange)]"
              : "bg-[var(--color-point)]"
          } 
          w-full 2xl:w-full 
          xl:px-8 xl:pt-8 md:p-3 py-3 px-7 
          2xl:rounded-[20px] md:rounded-[18px] rounded-[28px] 
          2xl:text-xl md:text-xl text-lg 
        `}
      >
        <Image
          src={dummy}
          alt="아이콘"
          className={`
            w-full object-cover text-center
            h-45
            2xl:block md:block hidden 
            2xl:rounded-t-[16px] md:rounded-t-[12px]  
          `}
        />

        <div
          className={`
            w-full text-black rounded-b-2xl 
            2xl:bg-white md:bg-white 
            2xl:text-2xl md:text-xl text-lg 
            2xl:p-1 md:p-0 md:py-1 pl-3 
            2xl:text-center md:text-center
          `}
        >
          {nickName}
        </div>

        {children}
      </div>
    </div>
  );
}

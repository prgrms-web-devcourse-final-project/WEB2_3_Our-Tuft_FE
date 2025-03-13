import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";
import { quizeUserList } from "../../types/quize";

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
  playList,
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
  oxAnswer?: boolean | null;
  playList: quizeUserList;
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
        <div className="relative w-[35%] h-full overflow-hidden flex items-center">
          <div
            className="relative w-full rounded-xl overflow-hidden"
            style={{ aspectRatio: "1/1.2" }}
          >
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
              <Image
                src="/assets/profile/profile-bg.png"
                alt="프로필 배경"
                fill
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 15vw"
                className="object-cover rounded-xl"
                style={{ objectPosition: "center top" }}
                priority
              />
            </div>

            {/* 스킨 */}
            <div className="absolute inset-0 z-5">
              <Image
                src={
                  playList.data.filter((user) => user.username === nickname)[0]
                    .skin || ""
                }
                alt="스킨"
                fill
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 15vw"
                className="object-contain"
                style={{ objectPosition: "center bottom" }}
                priority
              />
            </div>

            {/* 눈(중간층) */}
            <div
              className="absolute inset-x-0 z-10"
              style={{ top: "27%", height: "35%" }}
            >
              <div className="relative w-[80%] h-full mx-auto">
                <Image
                  src={
                    playList.data.filter(
                      (user) => user.username === nickname
                    )[0].eye || ""
                  }
                  alt="눈"
                  fill
                  sizes="(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* 입(최상층) */}
            <div
              className="absolute inset-x-0 z-20"
              style={{ top: "45%", height: "30%" }}
            >
              <div className="relative w-[70%] h-full mx-auto">
                <Image
                  src={
                    playList.data.filter(
                      (user) => user.username === nickname
                    )[0].mouth || ""
                  }
                  alt="입"
                  fill
                  sizes="(max-width: 768px) 15vw, (max-width: 1200px) 12vw, 8vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
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

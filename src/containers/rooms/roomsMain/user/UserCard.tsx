import Image from "next/image";
import {
  playerData,
  roomPlayList,
  roomUserListData,
} from "../../../../types/Room";

const DEFAULT_EYE_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/eye/eye1.png";
const DEFAULT_MOUTH_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/mouth/mouth1.png";
const DEFAULT_SKIN_URL =
  "https://team09-bucket.s3.ap-northeast-2.amazonaws.com/skin/skin1.png";

export default function UserCard({
  playList,
  nickName,
  isReady,
  host,
  children,
}: {
  playList: roomUserListData;
  nickName: string;
  isReady: string;
  host: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
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
        <div className="relative w-full h-full overflow-hidden flex items-center">
          <div
            className="relative w-full overflow-hidden"
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
                  playList.data.dto.filter(
                    (user) => user.username === nickName
                  )[0].skin || DEFAULT_SKIN_URL
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
                    playList.data.dto.filter(
                      (user) => user.username === nickName
                    )[0].eye || DEFAULT_EYE_URL
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
                    playList.data.dto.filter(
                      (user) => user.username === nickName
                    )[0].mouth || DEFAULT_MOUTH_URL
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

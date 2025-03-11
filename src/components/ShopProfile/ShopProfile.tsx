"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import coinIcon from "@/assets/icons/coin.svg";
import exitIcon from "@/assets/icons/exit.svg";
import { ShopUserData } from "../../types/shopUser";

export default function ShopProfile({
  points,
  nickname,
  eye,
  mouth,
  skin,
  nickColor,
}: ShopUserData) {
  const [avatarProfile, setAvatarProfile] = useState<ShopUserData>({
    points: 0,
    nickname: "사용자",
    eye: {
      itemId: 1,
      imageUrl: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/eye/eye1.png`,
    },
    mouth: {
      itemId: 11,
      imageUrl: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/mouth/mouth1.png`,
    },
    skin: {
      itemId: 21,
      imageUrl: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/skin/skin1.png`,
    },
    nickColor: {
      itemId: 31,
      value: "#000000",
    },
  });

  const router = useRouter();

  useEffect(() => {
    setAvatarProfile({
      points: points || 0,
      nickname: nickname || "사용자",
      eye: {
        itemId: eye?.itemId ?? 1,
        imageUrl:
          eye?.imageUrl ??
          `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/eye/eye1.png`,
      },
      mouth: {
        itemId: mouth?.itemId ?? 4,
        imageUrl:
          mouth?.imageUrl ??
          `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/mouth/mouth1.png`,
      },
      skin: {
        itemId: skin?.itemId ?? 7,
        imageUrl:
          skin?.imageUrl ??
          `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/skin/skin1.png`,
      },
      nickColor: {
        itemId: nickColor?.itemId ?? 10,
        value: nickColor?.value ?? "#000000",
      },
    });
  }, [nickname, eye, mouth, skin, nickColor]);

  return (
    <div className="grid grid-rows-9 grid-cols-2 w-full h-full">
      <div className="flex row-span-1 col-span-2 gap-x-2 sm:gap-x-4 lg:gap-x-6 pb-6">
        <div className="flex flex-7 sm:flex-6 items-center justify-evenly sm:justify-end bg-[var(--color-main)]/90 drop-shadow-custom rounded-xl sm:rounded-2xl">
          <span className="text-white text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl lg:mr-1.5 xl:mr-3">
            {points}
          </span>
          <Image
            src={coinIcon}
            alt="코인"
            className="w-auto h-[40%] sm:h-[50%] max-w-[60%] max-h-[60%] aspect-square object-contain sm:mr-1 md:mr-1.5 lg:mr-2 xl:mr-4"
          />
        </div>
        <button
          className="flex flex-3 sm:flex-4 items-center justify-center bg-[var(--color-lightRed)]/90 hover:bg-[var(--color-lightRed-hover)]/90 rounded-xl sm:rounded-2xl text-white md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl border border-black drop-shadow-custom cursor-pointer"
          onClick={() => router.push("/lobby")}
        >
          <span className="hidden sm:inline">나가기</span>
          <Image src={exitIcon} alt="나가기" className="w-6 h-6 sm:hidden" />
        </button>
      </div>

      <div className="flex items-center justify-center row-span-4 col-span-2 w-full h-full bg-[#1B399C] rounded-t-2xl drop-shadow-custom">
        <div className="relative w-[60%] h-[80%] flex items-center justify-center">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/profile/profile-bg.png"
              alt="프로필 배경"
              fill
              className="object-cover rounded-xl"
              style={{ objectPosition: "center top" }}
              priority
            />
          </div>

          {/* 스킨 레이어 */}
          <div className="absolute inset-0 z-5">
            <Image
              src={avatarProfile.skin.imageUrl}
              alt="스킨"
              fill
              className="object-contain"
              style={{ objectPosition: "center bottom" }}
              priority
            />
          </div>

          {/* 눈 레이어 */}
          <div
            className="absolute inset-x-0 z-10"
            style={{ top: "30%", height: "35%" }}
          >
            <div className="relative w-[80%] h-full mx-auto">
              <Image
                src={avatarProfile.eye.imageUrl}
                alt="눈"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 입 레이어 */}
          <div
            className="absolute inset-x-0 z-20"
            style={{ top: "45%", height: "30%" }}
          >
            <div className="relative w-[70%] h-full mx-auto">
              <Image
                src={avatarProfile.mouth.imageUrl}
                alt="입"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* 사용자 닉네임, 장바구니 */}
      <div className="grid grid-rows-3 grid-cols-1 row-span-3 col-span-2 justify-center w-full h-full">
        <div className="row-span-1 bg-[#E9ECEF] w-full h-full flex items-center justify-center drop-shadow-custom">
          <span className="md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            {nickname === null ? "사용자" : nickname}
          </span>
        </div>
        {/* 피그마 상 비어있는 공간, 장바구니 */}
        <div className="row-span-2 bg-[#1B399C] drop-shadow-custom"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 bg-[#1B399C] p-2.5 py-1.5 lg:px-5 lg:py-3 gap-y-1.5 md:gap-x-1.5 lg:gap-x-3 rounded-b-2xl drop-shadow-custom">
        <button className="row-span-1 bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] rounded-2xl text-white md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl border border-black drop-shadow-custom cursor-pointer">
          전부 구매
        </button>
        <button className="row-span-1 bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] rounded-2xl text-white md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl border border-black drop-shadow-custom cursor-pointer">
          원래대로
        </button>
      </div>
    </div>
  );
}

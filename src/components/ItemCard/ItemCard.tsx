"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { defaultFetch } from "../../service/api/defaultFetch";

import coinIcon from "@/assets/icons/coin.svg";

interface ItemCardProps {
  id: number;
  imageUrl: string;
  name: string;
  wishlist: Set<number>;
}

export default function ItemCard({
  id,
  imageUrl,
  name,
  wishlist,
}: ItemCardProps) {
  // const [isFavorited, setIsFavorited] = useState<boolean>(false);
  // const [favoriteItems, setFavoriteItems] = useState<number[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<Set<number>>(wishlist);

  // 찜 여부 확인
  const isFavorited = favoriteItems.has(id);

  // 찜하기/취소 로직
  const toggleFavorite = async () => {
    try {
      await defaultFetch(`/shop/wishlist/${id}`, {
        method: isFavorited ? "DELETE" : "POST",
      });

      setFavoriteItems((prev) => {
        const updated = new Set(prev);
        isFavorited ? updated.delete(id) : updated.add(id);
        return updated;
      });
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
    }
  };
  // // 찜 목록 가져오기
  // const favoriteList = async () => {
  //   try {
  //     const response: { data: { content: { id: number }[] } } =
  //       await defaultFetch("/shop/wishlist", {
  //         method: "GET",
  //       });

  //     const favoriteIds = response.data.content.map((item) => item.id);
  //     setFavoriteItems(favoriteIds);
  //   } catch (error) {
  //     console.log("서버 요청 중 오류 발생:", error);
  //   }
  // };

  // // 찜하기, 찜 취소 로직
  // const toggleFavorite = async () => {
  //   try {
  //     await defaultFetch(
  //       isFavorited ? `/shop/wishlist/${id}` : `/shop/wishlist/${id}`,
  //       {
  //         method: isFavorited ? "DELETE" : "POST",
  //       }
  //     );
  //     setIsFavorited((prev) => !prev);
  //   } catch (error) {
  //     console.log("서버 요청 중 오류 발생:", error);
  //   }
  // };

  // useEffect(() => {
  //   favoriteList();
  // }, []);

  // useEffect(() => {
  //   // 현재 id가 찜한 목록에 있는지 체크
  //   setIsFavorited(favoriteItems.includes(id));
  // }, [favoriteItems, id]);

  return (
    <div className="grid grid-rows-3 grid-cols-2 bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] w-full h-18 h-36 md:h-24 lg:h-28 xl:h-36 2xl:h-56 px-5 py-3 max-[480px]:px-3 md:px-3.5 md:py-2 xl:px-5 xl:py-3 max-[480px]:gap-x-2.5 gap-x-5 gap-y-2.5 md:gap-x-2.5 md:gap-y-1.5 lg:gap-x-5 lg:gap-y-2.5 rounded-2xl relative cursor-pointer">
      <div className="row-span-3 bg-[var(--color-main)] rounded-2xl flex items-center justify-center relative">
        {/* 찜 버튼 (별표 아이콘) */}
        <div
          className="absolute left-1 top-1 cursor-pointer w-[40%] sm:w-[30%] h-[auto] z-30"
          onClick={toggleFavorite}
        >
          {isFavorited ? (
            // 찜 상태일 때 (노란색 별, 테두리 없음)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="yellow"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z" />
            </svg>
          ) : (
            // 찜 안된 상태일 때 (검정 테두리, 흰색 별)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z" />
            </svg>
          )}
        </div>
        <div className="w-[80%] h-full relative">
          <Image
            src={imageUrl}
            alt="상품 이미지"
            fill
            className="object-contain rounded-2xl"
            unoptimized
          />
        </div>
      </div>
      <div className="row-span-1 bg-[var(--color-point)] rounded-2xl flex items-center justify-center">
        <span className="text-white text-center md:text-base lg:text-lg xl:text-xl 2xl:text-3xl">
          {name}
        </span>
      </div>
      <div className="relative row-span-2 bg-[var(--color-main)] rounded-2xl">
        <div className="flex items-center mt-1 ml-1 gap-x-0.5">
          <Image src={coinIcon} alt="₩" width="24" />
          <span>300</span>
        </div>
        <div className="absolute right-1 bottom-1 2xl:right-2 2xl:bottom-2 bg-[var(--color-point)] px-2 py-1 md:px-1.5 md:py-0.5 lg:px-2 lg:py-1 2xl:px-3 2xl:py-2 rounded-xl md:rounded-lg lg:rounded-xl">
          <button
            className="text-white text-center text-base md:text-sm lg:text-base 2xl:text-lg cursor-pointer"
            onClick={() => console.log(`${name} 구매`)}
          >
            구매
          </button>
        </div>
      </div>
    </div>
  );
}

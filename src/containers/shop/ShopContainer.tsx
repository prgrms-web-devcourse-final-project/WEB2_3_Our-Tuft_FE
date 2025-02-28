"use client";

import { useState } from "react";

import ItemTab from "./tabs/ItemTab";
import MainTab from "./tabs/MainTab";
import ShopProfile from "../../components/ShopProfile/ShopProfile";

export default function ShopContainer() {
  const [selectedTab, setSelectedTab] = useState("main");

  // 더미데이터
  const dummyData = {
    "Hair/Eyes": [
      { id: 1, imgSrc: "머리/눈 1", name: "머리/눈 1" },
      { id: 2, imgSrc: "머리/눈 2", name: "머리/눈 2" },
    ],
    Mouth: [
      { id: 5, imgSrc: "입 1", name: "입 1" },
      { id: 6, imgSrc: "입 2", name: "입 2" },
      { id: 7, imgSrc: "입 3", name: "입 3" },
    ],
    Skin: [
      { id: 8, imgSrc: "피부 1", name: "피부 1" },
      { id: 9, imgSrc: "피부 2", name: "피부 2" },
      { id: 10, imgSrc: "피부 3", name: "피부 3" },
    ],
    Decoration: [
      { id: 11, imgSrc: "치장 1", name: "치장 1" },
      { id: 12, imgSrc: "치장 2", name: "치장 2" },
      { id: 13, imgSrc: "치장 3", name: "치장 3" },
    ],
  };

  return (
    <div
      style={{ backgroundImage: "url('/assets/images/shopbg.png')" }}
      className="w-full min-h-screen flex bg-center items-center justify-center bg-cover bg-repeat"
    >
      <div className="grid grid-rows-[repeat(9,_1fr)] grid-cols-[2fr_1fr] w-[95vw] sm:w-[90vw] h-[90vh] flex flex-col gap-x-2 md:gap-x-4 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-16">
        {/* 탭 버튼들 */}
        <div className="bg-transparent flex gap-x-3 row-span-1 h-full items-end">
          <button
            onClick={() => setSelectedTab("main")}
            className={`rounded-t-md text-white transition-colors h-[80%] aspect-[1/1] md:aspect-[1.5/1] min-[1025px]:aspect-[2/1] transition-colors duration-200 cursor-pointer ${
              selectedTab === "main"
                ? "bg-[var(--color-second)]/80"
                : "bg-[var(--color-main)]/80 hover:bg-[var(--color-main)]"
            }`}
          >
            메인
          </button>

          <button
            onClick={() => setSelectedTab("item")}
            className={`rounded-t-md text-white transition-colors h-[80%] aspect-[1/1] md:aspect-[1.5/1] min-[1025px]:aspect-[2/1] transition-colors duration-200 cursor-pointer ${
              selectedTab === "item"
                ? "bg-[var(--color-second)]/80"
                : "bg-[var(--color-main)]/80 hover:bg-[var(--color-main)]"
            }`}
          >
            아이템
          </button>
        </div>
        {/* 두 번째 그리드 영역(보유 코인량, 나가기 버튼, 사용자 정보) */}
        <div className="w-full h-full row-span-9">
          <ShopProfile />
        </div>

        {/* 선택된 탭 내용 */}
        <div className="w-full h-full row-span-8">
          {selectedTab === "main" && <MainTab data={dummyData} />}
          {selectedTab === "item" && <ItemTab data={dummyData} />}
        </div>
      </div>
    </div>
  );
}

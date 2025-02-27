"use client";
import { useState } from "react";
import Image from "next/image";
import ItemCard from "../../../components/ItemCard/ItemCard";

import searchIcon from "@/assets/images/search.png";

interface ItemTabProps {
  data: Record<string, { id: number; imgSrc: string; name: string }[]>;
}

export default function ItemTab({ data }: ItemTabProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "머리/눈"
  );

  const categories = ["머리/눈", "입", "피부", "치장"];

  const categoriesMap: Record<string, string> = {
    "머리/눈": "Hair/Eyes",
    입: "Mouth",
    피부: "Skin",
    치장: "Decoration",
  };

  const handleSearch = () => {
    if (query.trim() === "") return;
    console.log("검색어: ", query);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 선택된 카테고리에 맞는 데이터를 필터링
  const filteredItems = selectedCategory
    ? data[categoriesMap[selectedCategory]].filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="grid grid-rows-8 grid-cols-2 w-full h-full">
      <div className="grid grid-cols-2 row-span-1 col-span-2 bg-[var(--color-main)]/90 flex items-center rounded-tr-md w-full h-full">
        <div className="grid grid-rows-2 grid-cols-2 md:grid-rows-1 md:grid-cols-4 flex items-center w-full h-full overflow-hidden lg:gap-x-3 xl:gap-x-6 lg:pl-2 xl:pl-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`text-white transition-colors duration-200 text-cursor-pointer w-auto min-w-[36px] h-[80%] md:h-[60%] rounded-3xl cursor-pointer
              ${
                selectedCategory === category
                  ? "bg-[var(--color-secondPoint)]/70"
                  : "bg-[var(--color-point)]/70 hover:bg-[var(--color-point-hover)]/70"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="col-span-1 flex items-center justify-end bg-[var(--color-second)] opacity-50 border border-black drop-shadow-custom w-[80%] md:w-[60%] h-[50%] mr-[12%] md:mr-[8%] rounded-[40px] ml-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어"
            className="bg-transparent text-white placeholder-gray-300 outline-none w-full pl-4"
          />
          <button onClick={handleSearch} className="mx-2 cursor-pointer">
            <Image src={searchIcon} alt="검색" width={36} height={36} />
          </button>
        </div>
      </div>
      <div className="row-span-7 col-span-2 bg-[#1B399C] p-4 md:p-2 lg:p-4 xl:p-6 2xl:p-8 overflow-y-auto min-h-0 rounded-b-2xl">
        <div className="grid grid-rows-3 grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3 xl:gap-4">
          {/* 필터링된 아이템들 렌더링 */}
          {filteredItems.map((item) => (
            <ItemCard key={item.id} imgSrc={item.imgSrc} name={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

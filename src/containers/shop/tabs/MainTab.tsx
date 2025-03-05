"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

import ItemCard from "../../../components/ItemCard/ItemCard";
import { Item } from "../../../types/item";

import searchIcon from "@/assets/images/search.png";

interface MainTabProps {
  data: Item[];
}

export default function MainTab({ data }: MainTabProps) {
  const [query, setQuery] = useState("");
  const categories = Object.keys(data);

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

  return (
    <div className="grid grid-rows-8 grid-cols-2 w-full h-full">
      <div className="row-span-1 col-span-2 bg-[var(--color-main)]/90 flex items-center justify-end rounded-tr-md">
        <div className="flex items-center bg-[var(--color-second)] opacity-50 border border-black drop-shadow-custom w-[40%] md:w-[30%] h-[50%] mr-[6%] md:mr-[4%] rounded-[40px] ml-auto">
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
        <div className="grid grid-rows-3 grid-cols-1 row-span-6 md:grid-cols-2 gap-2 lg:gap-3 xl:gap-4">
          <div className="grid row-span-1 items-center justify-center col-span-1 md:col-span-2 w-full bg-[#d3d3d3]">
            <span>베너</span>
          </div>
          {/* 전체 아이템을 렌더링 */}
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <ItemCard
                key={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
              />
            </React.Fragment>
          ))}
          {/* {categories.map((category) => (
            <React.Fragment key={category}>
              {data[category].map((item) => (
                <ItemCard
                  key={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                />
              ))}
            </React.Fragment>
          ))} */}
        </div>
      </div>
    </div>
  );
}

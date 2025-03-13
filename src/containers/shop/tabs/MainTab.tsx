"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

import ItemCard from "../../../components/ItemCard/ItemCard";
import { Item } from "../../../types/item";

import searchIcon from "@/assets/images/search.png";
import bannerImg from "@/assets/images/banner.png";
import { defaultFetch } from "../../../service/api/defaultFetch";

interface MainTabProps {
  data: Item[];
  fetchUserPoints: () => void;
}

export default function MainTab({ data, fetchUserPoints }: MainTabProps) {
  const [query, setQuery] = useState("");

  // 검색어에 맞는 아이템 필터링
  const filteredData = query
    ? data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : data;

  const handleSearch = () => {
    if (query.trim() === "") return;
    console.log("검색어: ", query);
  };

  const checkAttendance = async () => {
    try {
      const response = await defaultFetch<{
        isSuccess: boolean;
        message: string;
        data: string;
      }>("/event/points", {
        method: "POST",
      });

      if (response.isSuccess && response.data) {
        console.log("클릭 이벤트 성공: ", response.data);
        await fetchUserPoints();
      } else {
        console.error("클릭 이벤트 실패: ", response.message);
      }
    } catch (error) {
      // 409 에러 처리
      if (error instanceof Error && error.message.includes("409")) {
        console.log("하루에 한번만 가능합니다. ", error.message);
        return;
      }
      console.error("클릭 이벤트 오류: ", error);
    }
  };

  return (
    <div className="grid grid-rows-8 grid-cols-2 w-full h-full">
      <div className="row-span-1 col-span-2 bg-[var(--color-main)]/90 flex items-center justify-end rounded-tr-md">
        <div className="flex items-center  bg-[var(--color-second)] opacity-50 border border-black drop-shadow-custom w-[50%] md:w-[40%] h-[50%] mr-[6%] md:mr-[4%] rounded-[40px] ml-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력해주세요."
            className="bg-transparent text-white placeholder-gray-300 outline-none w-full pl-4"
          />
          <button onClick={handleSearch} className="mx-2 ml-2 cursor-pointer">
            <Image src={searchIcon} alt="검색" width={36} height={36} />
          </button>
        </div>
      </div>
      <div className="row-span-7 col-span-2 bg-[#1B399C] p-4 md:p-2 lg:p-4 xl:p-6 2xl:p-8 overflow-y-auto min-h-0 rounded-b-2xl relative">
        <div className="grid grid-rows-3 grid-cols-1 row-span-6 md:grid-cols-2 gap-2 lg:gap-3 xl:gap-4">
          {!query && (
            <div
              className="grid row-span-1 items-center justify-center col-span-1 md:col-span-2 w-full bg-[#DAEBFA] cursor-pointer"
              onClick={checkAttendance}
            >
              <Image src={bannerImg} alt="" className="min-h-[130px]" />
            </div>
          )}
          {/* 아이템 렌더링 */}
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <React.Fragment key={item.id}>
                <ItemCard
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                />
              </React.Fragment>
            ))
          ) : (
            <div className="absolute inset-0 flex justify-center items-center w-full h-full text-white">
              해당하는 아이템이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

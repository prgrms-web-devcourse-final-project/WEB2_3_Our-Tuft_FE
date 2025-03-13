"use client";

import { useEffect, useState, useMemo } from "react";

import { defaultFetch } from "../../service/api/defaultFetch";
import { Item } from "../../types/item";

import ItemTab from "./tabs/ItemTab";
import MainTab from "./tabs/MainTab";
import ShopProfile from "../../components/ShopProfile/ShopProfile";
import { ShopUserData } from "../../types/shopUser";

interface ShopData {
  content: Item[];
  hasNext: boolean;
  numberOfElements: number;
  empty: boolean;
  first: boolean;
  last: boolean;
}

export default function ShopContainer() {
  const [selectedTab, setSelectedTab] = useState("main");
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [userData, setUserData] = useState<ShopUserData | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [wishlist, setWishlist] = useState<Item[] | null>(null);

  const fetchShopData = async () => {
    try {
      const response = await defaultFetch<{
        isSuccess: boolean;
        message: string;
        data: ShopData;
      }>("/items", {
        method: "GET",
      });

      if (response.isSuccess && response.data) {
        setShopData(response.data);
        console.log("상점 데이터: ", response.data);
      } else {
        console.error("상점 데이터 불러오기 실패: ", response.message);
      }
    } catch (error) {
      console.error("상점 데이터 불러오기 오류: ", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await defaultFetch<{
        isSuccess: boolean;
        message: string;
        data: ShopUserData;
      }>("/myInfo", {
        method: "GET",
      });

      if (response.isSuccess && response.data) {
        setUserData(response.data);
        console.log("유저 정보: ", response.data);
      } else {
        console.error("유저 데이터 불러오기 실패: ", response.message);
      }
    } catch (error) {
      console.error("유저 데이터 불러오기 오류: ", error);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await defaultFetch<{
        isSuccess: boolean;
        message: string;
        data: { points: number };
      }>("/myInfo/points", {
        method: "GET",
      });

      if (response.isSuccess && response.data) {
        setUserPoints(response.data.points);
        console.log("유저 포인트: ", response.data.points);
      } else {
        console.error("유저 데이터 불러오기 실패: ", response.message);
      }
    } catch (error) {
      console.error("유저 데이터 불러오기 오류: ", error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await defaultFetch<{
        isSuccess: boolean;
        message: string;
        data: ShopData;
      }>("/wishlist", { method: "GET" });

      if (response.isSuccess && response.data) {
        setWishlist(response.data.content);
      } else {
        console.error("위시리스트 불러오기 실패: ", response.message);
      }
    } catch (error) {
      console.error("위시리스트 불러오기 오류: ", error);
    }
  };

  useEffect(() => {
    fetchShopData();
    fetchUserProfile();
    fetchUserPoints();
    fetchWishlist();
  }, []);

  // 메인 탭에서는 ID 순으로 정렬
  const sortedData = useMemo(() => {
    if (!shopData?.content) return [];
    return [...shopData.content].sort((a, b) => a.id - b.id);
  }, [shopData]);

  // 아이템 탭에서는 카테고리별로 그룹화
  const groupedData = useMemo(() => {
    if (!shopData?.content) return {};
    return shopData.content.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as { [key: string]: Item[] });
  }, [shopData]);

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
                ? "bg-[var(--color-main)]/80"
                : "bg-[var(--color-second)]/80 hover:bg-[var(--color-second-hover)]"
            }`}
          >
            메인
          </button>

          <button
            onClick={() => setSelectedTab("item")}
            className={`rounded-t-md text-white transition-colors h-[80%] aspect-[1/1] md:aspect-[1.5/1] min-[1025px]:aspect-[2/1] transition-colors duration-200 cursor-pointer ${
              selectedTab === "item"
                ? "bg-[var(--color-main)]/80"
                : "bg-[var(--color-second)]/80 hover:bg-[var(--color-second-hover)]"
            }`}
          >
            아이템
          </button>
        </div>
        <div className="w-full h-full row-span-9">
          <ShopProfile
            points={userPoints}
            nickname={userData?.nickname || "사용자"}
            eye={
              userData?.eye || {
                itemId: 1,
                imageUrl: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/eye/eye1.png`,
              }
            }
            mouth={
              userData?.mouth || {
                itemId: 11,
                imageUrl: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/mouth/mouth1.png`,
              }
            }
            skin={
              userData?.skin || {
                itemId: 21,
                imageUrl: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/skin/skin1.png`,
              }
            }
            nickColor={
              userData?.nickColor || {
                itemId: 31,
                value: "#000000",
              }
            }
          />
        </div>
        <div className="w-full h-full row-span-8">
          {selectedTab === "main" && (
            <MainTab
              data={sortedData}
              fetchUserPoints={fetchUserPoints}
              wishlist={wishlist}
            />
          )}
          {selectedTab === "item" && (
            <ItemTab data={groupedData} wishlist={wishlist} />
          )}
        </div>
      </div>
    </div>
  );
}

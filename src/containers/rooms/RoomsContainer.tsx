"use client";

import RoomsMain from "./roomsMain";
import RoomsFooter from "./roomsFooter";
import RoomsHeader from "./roomsHeader";

import loading from "@/assets/images/loading.gif";
import { defaultFetch } from "../../service/api/defaultFetch";
import { useEffect, useState } from "react";

import { useSearchParams, useParams } from "next/navigation";
import { roomInfoData } from "../../types/roomType";
import Image from "next/image";

export default function RoomsContainer() {
  const params = useParams();

  const searchParams = useSearchParams();
  const passwordParam = searchParams.get("password");

  const [roomInfo, setRoomInfo] = useState<roomInfoData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomInfo = async (password?: string) => {
    try {
      setIsLoading(true);

      const response = await defaultFetch<roomInfoData>(
        `/lobbies/rooms/${params.id}${password ? `?password=${password}` : ""}`,
        { method: "GET" }
      );

      setRoomInfo(response);
      setIsLoading(false);
    } catch (err) {
      console.error("방 정보 로딩 실패:", err);
      setError("방 정보를 불러오는데 실패했습니다.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // URL에서 전달된 비밀번호 사용
    if (passwordParam) {
      // "true"는 공개방을 의미, 비밀번호 없이 요청
      if (passwordParam === "true") {
        fetchRoomInfo();
      } else {
        // "true"가 아닌 경우 입력된 비밀번호로 요청
        fetchRoomInfo(passwordParam);
      }
    } else {
      setError("접근 권한이 없습니다.");
      setIsLoading(false);
    }
  }, [params.id, passwordParam]);

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div
        className="w-full min-h-screen flex flex-col items-center justify-center bg-[var(--color-second)] bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <Image src={loading} alt="로딩 중" width={150} height={150} />
        <p className="text-white text-xl mt-4">
          방 정보를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  // 에러 UI
  if (error || !roomInfo) {
    return (
      <div
        className="w-full min-h-screen flex flex-col items-center justify-center bg-[var(--color-second)] bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl">
          <h2 className="text-white text-2xl mb-4">오류 발생</h2>
          <p className="text-white text-lg">
            {error || "방 정보를 불러오는데 실패했습니다."}
          </p>
        </div>
      </div>
    );
  }

  // 방 정보 표시
  return (
    <div
      className="w-full 2xl:pt-5 md:pt-5 min-h-screen flex justify-center bg-center bg-cover bg-repeat"
      style={{ backgroundImage: "url('/assets/images/bg.png')" }}
    >
      <div className="w-[90vw]">
        <RoomsHeader roomInfo={roomInfo} />
        <RoomsMain />
        <RoomsFooter roomInfo={roomInfo} />
      </div>
    </div>
  );
}

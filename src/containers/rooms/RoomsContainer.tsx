"use client";
import RoomsMain from "./roomsMain";
import RoomsFooter from "./roomsFooter";
import RoomsHeader from "./roomsHeader";
import loading from "@/assets/images/loading.gif";
import { defaultFetch } from "../../service/api/defaultFetch";
import { useEffect, useRef, useState } from "react";

import { useSearchParams, useParams } from "next/navigation";
import { roomInfoData } from "../../types/roomType";
import RoundButton from "../../components/RoundButton";
import Image from "next/image";
import { setTimeout } from "timers/promises";

export default function RoomsContainer() {
  const params = useParams();
  const searchParams = useSearchParams();
  const Param = searchParams.get("password");

  const [roomInfo, setRoomInfo] = useState<roomInfoData>();
  const password = useRef<HTMLInputElement>(null);
  const [disclosure, setDisclosure] = useState<boolean>(false);

  const userInfo = async () => {
    const response = await defaultFetch("/myInfo", { method: "GET" });
  };

  const fetchRoomInfo = async (val?: string) => {
    const response = await defaultFetch<roomInfoData>(
      `/lobbies/rooms/${params.id}${val ? `?password=${val}` : ""}`,
      {
        method: "GET",
      }
    );

    setRoomInfo(response);
    setDisclosure(true);
  };

  const passwordCheck = () => {
    if (password.current) {
      fetchRoomInfo(password.current?.value);
    }
  };

  useEffect(() => {
    // userInfo();
    if (Param === "true") {
      fetchRoomInfo();
    }
  }, []);
  return (
    <>
      {disclosure === true ? (
        <div
          className="w-full 2xl:pt-5 md:pt-5 min-h-screen flex justify-center bg-center bg-cover bg-repeat"
          style={{ backgroundImage: "url('/assets/images/bg.png')" }}
        >
          <div className="w-[90vw]">
            {roomInfo ? (
              <>
                <RoomsHeader roomInfo={roomInfo} />
                <RoomsMain />
                <RoomsFooter roomInfo={roomInfo} />
              </>
            ) : (
              <div>
                <Image src={loading} alt="로딩" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="w-full 2xl:pt-5 md:pt-5 min-h-screen  bg-center bg-cover bg-repeat flex flex-col items-center justify-center bg-[var(--color-second)]"
          style={{ backgroundImage: "url('/assets/images/bg.png')" }}
        >
          <Image src={loading} alt="로딩" />
          <div className="flex flex-col gap-4 bg-[var(--color-second)] py-15 px-30 rounded-2xl">
            <div className="axl:text-4xl text-2xl text-white mb-4">
              비밀번호를 입력하세요
            </div>
            <input
              ref={password}
              className="px-4 py-2 rounded border border-gray-300"
              type="password"
            />
            <RoundButton
              width={"w-full"}
              height={"h-10"}
              bgColor={"bg-[var(--color-lightRed)]"}
              text={"확인"}
              onClick={passwordCheck}
            />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { defaultFetch } from "../../service/api/defaultFetch";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";

import RoomsMain from "./roomsMain";
import RoomsFooter from "./roomsFooter";
import RoomsHeader from "./roomsHeader";
import { roomInfoData } from "../../types/roomType";
import { useConnectionStore } from "../../store/store";
import { socketConnection } from "../../service/api/socketConnection";

export default function RoomsContainer() {
  const { isLoading } = useConnectionStore();

  const params = useParams();
  const searchParams = useSearchParams();
  const Param = searchParams.get("password");

  const password = useRef<HTMLInputElement>(null);
  const [roomInfo, setRoomInfo] = useState<roomInfoData>();
  const [disclosure, setDisclosure] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  function useSocketConnection() {
    return async (token?: string) => {
      setLoading(true);
      try {
        await socketConnection(token);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50000);
      }
    };
  }

  useEffect(() => {
    if (Param === "true") {
      fetchRoomInfo();
    }
    useSocketConnection();
  }, []);
  return (
    <>
      <div
        className="w-full 2xl:pt-5 md:pt-5 min-h-screen flex justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        {/* {loading && <LoadingSpinner />} */}
        <div className="w-[90vw]">
          {roomInfo && (
            <>
              <RoomsHeader roomInfo={roomInfo} />
              <RoomsMain />
              <RoomsFooter roomInfo={roomInfo} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import MobileLayout from "./_components/MobileLayout";
import DesktopLayout from "./_components/DesktopLayout";
import TabletLayout from "./_components/TabletLayout";
import {
  socketConnection,
  subscribeToTopic,
  unsubscribeFromTopic,
  publishMessage,
  useSocketConnection,
} from "../../service/api/socketConnection";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { useConnectionStore, useLoginStore } from "../../store/store";
import { defaultFetch } from "../../service/api/defaultFetch";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

// Room 인터페이스 정의
interface Room {
  roomId: number;
  roomName: string;
  round: number;
  hostId: number;
  disclosure: boolean;
  gameType: "SPEED" | "OX";
  time?: number;
  maxUsers?: number;
  currentPlayer?: number;
}

// 메시지 인터페이스 정의
interface WebSocketRoomMessage {
  type: "ROOM_LIST" | "ROOM_CREATED" | "ROOM_UPDATED" | "ROOM_DELETED";
  data: Room | Room[] | number;
}

export default function Lobby() {
  const { isLoading } = useConnectionStore();
  const { token, setUserId } = useLoginStore();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    console.log("소켓 연결 시도...");

    socketConnection(token ?? undefined).catch((error) => {
      console.error("소켓 연결 실패:", error);
    });

    // 메시지 핸들러
    const handleLobbyMessage = (message: WebSocketRoomMessage) => {
      console.log("로비 메시지 수신:", message);

      switch (message.type) {
        case "ROOM_LIST":
          if (Array.isArray(message.data)) {
            console.log("방 목록 업데이트:", message.data);
            setRooms(message.data as Room[]);
          }
          break;
        case "ROOM_CREATED":
          if (!Array.isArray(message.data)) {
            console.log("새 방 생성:", message.data);
            setRooms((prevRooms) => [...prevRooms, message.data as Room]);
          }
          break;
        case "ROOM_UPDATED":
          if (!Array.isArray(message.data)) {
            const updatedRoom = message.data as Room;
            console.log("방 업데이트:", updatedRoom);
            setRooms((prevRooms) =>
              prevRooms.map((room) =>
                room.roomId === updatedRoom.roomId ? updatedRoom : room
              )
            );
          }
          break;
        case "ROOM_DELETED":
          const roomId = message.data as number;
          console.log("방 삭제:", roomId);
          setRooms((prevRooms) =>
            prevRooms.filter((room) => room.roomId !== roomId)
          );
          break;
      }
    };

    // 로비 구독
    subscribeToTopic("/topic/room/lobby", handleLobbyMessage);

    const fetchInitialRooms = async () => {
      try {
        const data = await defaultFetch<{ isSuccess: boolean; data: Room[] }>(
          "/lobbies/rooms"
        );
        if (data.isSuccess && data.data.length > 0) {
          console.log("API로 초기 방 목록 로드:", data.data);
          setRooms(data.data);
        }
      } catch (error) {
        console.error("초기 방 목록 로드 실패:", error);
      }
    };

    fetchInitialRooms();

    // 초기 방 목록 요청 (CONNECT 이후 시간차를 두고 요청)
    setTimeout(() => {
      try {
        publishMessage("/app/lobby/rooms", { type: "GET_ROOMS" });
        console.log("초기 방 목록 요청 완료");
      } catch (err) {
        console.error("초기 방 목록 요청 실패:", err);
      }
    }, 1000);

    return () => {
      // clearInterval(intervalId);
      unsubscribeFromTopic("/topic/room/lobby");
    };
  }, [token]);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");

    if (!storedUserId) {
      const fetchUserId = async () => {
        try {
          const res = await defaultFetch<{
            isSuccess: boolean;
            message: string;
            data: { userId: number | null };
          }>("/myInfo", {
            method: "GET",
          });

          if (res.isSuccess && res.data && res.data.userId !== null) {
            setUserId(res.data.userId.toString());
            console.log("유저 아이디 정보: ", res.data.userId);
          } else {
            console.log("유저 데이터 불러오기 실패: ", res.message);
          }
        } catch (error) {
          console.log("유저 데이터 불러오기 오류: ", error);
        }
      };

      fetchUserId();
    }
  });

  const connect = useSocketConnection();
  useEffect(() => {
    connect();
  }, []);

  return (
    <ProtectedRoute>
      <div
        className="w-screen h-screen bg-center"
        style={{
          backgroundImage: "url('/assets/images/bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        {isLoading && <LoadingSpinner />}

        {/* roomsData를 props로 전달 */}
        <MobileLayout roomsData={rooms} />
        <TabletLayout roomsData={rooms} />
        <DesktopLayout roomsData={rooms} />
      </div>
    </ProtectedRoute>
  );
}

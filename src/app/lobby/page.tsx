"use client";
import { useEffect, useState } from "react";
import MobileLayout from "./_components/MobileLayout";
import DesktopLayout from "./_components/DesktopLayout";
import TabletLayout from "./_components/TabletLayout";
import {
  socketConnection,
  getClient,
  subscribeToTopic,
  unsubscribeFromTopic,
  publishMessage,
  isConnected,
} from "../../service/api/socketConnection";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { useLoginStore } from "../../store/store";
import { defaultFetch } from "../../service/api/defaultFetch";

// Room 인터페이스 정의
interface Room {
  roomId: number;
  roomName: string;
  round: number;
  hostId: number;
  disclosure: boolean;
  gameType: "SPEED" | "CATCHMIND" | "OX";
  time?: number;
  maxUsers?: number;
  currentUsers?: number;
}

// 메시지 인터페이스 정의
interface WebSocketRoomMessage {
  type: "ROOM_LIST" | "ROOM_CREATED" | "ROOM_UPDATED" | "ROOM_DELETED";
  data: Room | Room[] | number;
}

export default function Lobby() {
  const { token } = useLoginStore();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);

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

    // 소켓 연결 상태 확인
    // const checkConnection = () => {
    //   if (isConnected()) {
    //     setSocketConnected(true);
    //     console.log("소켓 연결됨");
    //   } else {
    //     setSocketConnected(false);
    //     console.log("소켓 연결 안됨");
    //   }
    // };

    // // 초기 및 주기적 상태 확인
    // const intervalId = setInterval(checkConnection, 3000);

    // API를 통해 초기 방 목록 로드 (백업)
    const fetchInitialRooms = async () => {
      try {
        const data = await defaultFetch<{ isSuccess: boolean; data: Room[] }>(
          "/lobbies/rooms"
        );
        if (data.isSuccess && data.data.length > 0 && rooms.length === 0) {
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
        {/* 소켓 연결 상태 표시 */}
        {!socketConnected && (
          <div className="fixed top-5 right-5 bg-red-500 text-white p-2 rounded-lg z-50">
            서버 연결 중...
          </div>
        )}
        {/* roomsData를 props로 전달 */}
        <MobileLayout roomsData={rooms} />
        <TabletLayout roomsData={rooms} />
        <DesktopLayout roomsData={rooms} />
      </div>
    </ProtectedRoute>
  );
}

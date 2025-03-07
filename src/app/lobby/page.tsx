"use client";
import { useEffect } from "react";
import MobileLayout from "./_components/MobileLayout";
import DesktopLayout from "./_components/DesktopLayout";
import TabletLayout from "./_components/TabletLayout";
import {
  socketConnection,
  subscribeToTopic,
  unsubscribeFromTopic,
} from "../../service/api/socketConnection";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

export default function Lobby() {
  useEffect(() => {
    let isSubscribed = true;

    // 소켓 연결
    socketConnection();

    // 로비 구독 설정
    const subscription = subscribeToTopic("/topic/lobby", (msg) => {
      console.log("구독:", msg);
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      isSubscribed = false;
      unsubscribeFromTopic("/topic/lobby");
    };
  }, []); // 의존성 배열에 addMessage 추가

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
        {/* 모바일 레이아웃 */}
        <MobileLayout />
        {/* 태블릿 레이아웃 */}
        <TabletLayout />
        {/* 데스크톱 레이아웃 */}
        <DesktopLayout />
      </div>
    </ProtectedRoute>
  );
}

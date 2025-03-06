"use client";
import MobileLayout from "./_components/MobileLayout";
import DesktopLayout from "./_components/DesktopLayout";
import TabletLayout from "./_components/TabletLayout";
import {
  socketConnection,
  subscribeToTopic,
} from "../../service/api/socketConnection";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

export default function Lobby() {
  /*
   * 로비 구독 (/topic/lobby)
   * 채팅, 변경사항 실시간으로 받기
   */
  socketConnection();
  subscribeToTopic("/topic/lobby", (msg) => {
    console.log("구독:", msg);
  });

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

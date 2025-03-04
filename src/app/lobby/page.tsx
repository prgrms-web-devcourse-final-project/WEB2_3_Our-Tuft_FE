"use client";
import MobileLayout from "./_components/MobileLayout";
import DesktopLayout from "./_components/DesktopLayout";
import TabletLayout from "./_components/TabletLayout";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

export default function Lobby() {
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

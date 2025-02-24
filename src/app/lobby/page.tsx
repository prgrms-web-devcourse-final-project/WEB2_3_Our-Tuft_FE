"use client";
import MobileLayout from "./_components/MobileLayout";
import DesktopLayout from "./_components/DesktopLayout";

export default function Lobby() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/bg.png')" }}
    >
      {/* 모바일 레이아웃 */}
      <MobileLayout />
      {/* 데스크톱 레이아웃 */}
      <DesktopLayout />
    </div>
  );
}

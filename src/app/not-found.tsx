"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoToLobby = () => {
    router.push("/lobby");
  };

  return (
    <div
      className="w-screen h-screen bg-center relative"
      style={{
        backgroundImage: "url('/assets/images/404.png')",
        backgroundSize: "auto",
      }}
    >
      {/* 우측 하단 버튼 */}
      <div className="absolute bottom-8 right-8">
        <button
          onClick={handleGoToLobby}
          className="
            bg-[var(--color-point)] hover:bg-[var(--color-point)]/80
            text-white font-bold
            py-3 px-6
            rounded-xl drop-shadow-custom
            transition-all duration-300
          "
        >
          로비로 돌아가기
        </button>
      </div>
    </div>
  );
}

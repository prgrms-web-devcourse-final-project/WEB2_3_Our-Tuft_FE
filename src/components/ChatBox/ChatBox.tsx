"use client";

import React from "react";

interface ChatBoxProps {
  chatMessages: { id: string; text: string }[];
  currentMessage: string;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChatBox({
  chatMessages,
  currentMessage,
  chatContainerRef,
  handleInputChange,
  handleKeyDown,
}: ChatBoxProps) {
  return (
    <>
      {/* 채팅 메세지 출력 */}
      <div
        ref={chatContainerRef}
        className="bg-[var(--color-point)]/90 w-full h-full flex flex-col rounded-lg px-1.5 md:px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 py-3.5 mb-3.5 overflow-y-auto"
      >
        {chatMessages.length > 0 ? (
          chatMessages.map((msg, index) => (
            <p
              key={index}
              className="mb-1.5 lg:mb-2 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
            >
              {/* 임시 ( msg.id === users[0].name ) */}
              {msg.id}: {msg.text}
            </p>
          ))
        ) : (
          <span className="text-[#FFFF1B] text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
            아직 채팅이 없습니다.
          </span>
        )}
      </div>
      {/* 채팅 입력란 */}
      <input
        type="text"
        placeholder="채팅을 입력하세요"
        value={currentMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-[#FFFFFF]/50 w-full h-12 flex items-center justify-center rounded-xl lg:rounded-2xl px-4 text-sm lg:text-base placeholder-gray-300 outline-none"
      />
    </>
  );
}

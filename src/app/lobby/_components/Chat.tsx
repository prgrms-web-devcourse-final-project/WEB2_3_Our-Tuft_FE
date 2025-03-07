"use client";

import { useEffect, useRef, useState } from "react";
import {
  sendMessage,
  subscribeToTopic,
  unsubscribeFromTopic,
} from "../../../service/api/socketConnection";

interface ChatMessage {
  message: string;
  sender: string;
  timestamp?: number;
  type?: "normal" | "system";
}

export default function Chat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 채팅창 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // 로비 입장 시 채팅 구독
  useEffect(() => {
    const handleNewMessage = (msg: any) => {
      console.log("수신된 메시지:", msg);
      setChatMessages((prev) => [...prev, msg]);
      console.log("메세지:", chatMessages);
    };

    // 로비 채팅방 구독
    unsubscribeFromTopic("/topic/room/lobby");
    subscribeToTopic("/topic/room/lobby", handleNewMessage);

    return () => {
      unsubscribeFromTopic("/topic/room/lobby");
    };
  }, []);

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // 객체 형태로 전송
    const messageData = {
      message: inputMessage,
      sender: sessionStorage.getItem("nickName") || "익명",
      timestamp: Date.now(),
    };

    console.log("메시지 전송: ", messageData);
    sendMessage("/topic/room/lobby", messageData);

    setInputMessage("");
  };

  // 엔터키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* 채팅 영역 */}
      <div className="w-full h-[805px] bg-[var(--color-point)] text-white rounded-lg md:rounded-xl p-4 overflow-auto">
        {chatMessages.map((msg, index) => (
          <div key={index} className="mb-2">
            {typeof msg === "string" ? (
              // 텍스트 메시지 표시
              <span>{msg}</span>
            ) : msg.type === "system" ? (
              // 시스템 메시지 표시
              <span className="text-sm text-[var(--color-amberOrange)]">
                {msg.message}
              </span>
            ) : (
              // 객체 메시지 표시
              <>
                <span className="font-bold">{msg.sender}: </span>
                <span>{msg.message}</span>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="w-full sm:h-[20%] md:h-[49px] bg-white/50 rounded-lg">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className="w-full h-full px-4 rounded-lg md:rounded-2xl outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

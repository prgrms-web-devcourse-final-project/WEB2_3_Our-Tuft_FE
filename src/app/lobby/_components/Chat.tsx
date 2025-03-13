"use client";

import { useEffect, useRef, useState } from "react";
import {
  unsubscribeFromTopic,
  subscribeToTopic,
  sendMessage,
} from "../../../service/api/socketConnection";

// 채팅 메시지를 위한 인터페이스 추가
interface ChatMessage {
  message: string;
  sender: string;
}

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const subscribedRef = useRef<boolean>(false); // 구독 상태 추적용 ref

  const [chatList, setChatList] = useState<ChatMessage[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === "Enter") {
      if (inputRef.current && inputRef.current.value.trim() !== "") {
        console.log("전송");
        sendMessage("/app/room/lobby", inputRef.current.value);
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  useEffect(() => {
    // 이미 구독 중인 경우 재구독하지 않음
    if (subscribedRef.current) {
      return;
    }

    // any 타입 대신 구체적인 타입 사용
    const handleNewMessage = (msg: unknown) => {
      if (
        typeof msg === "object" &&
        msg !== null &&
        "message" in msg &&
        "sender" in msg &&
        typeof (msg as ChatMessage).message === "string" &&
        typeof (msg as ChatMessage).sender === "string"
      ) {
        console.log("새 메시지 수신:", msg);
        const chatMsg = msg as ChatMessage;

        // 시스템 메시지 필터링 (sender가 "SYSTEM"인 경우)
        if (chatMsg.sender !== "SYSTEM") {
          setChatList((prevMessages) => [...prevMessages, chatMsg]);
        } else {
          console.log("시스템 메시지:", chatMsg.message);
        }
      } else {
        console.warn("Unexpected message format:", msg);
      }
    };

    // 구독 전에 먼저 구독 상태 확인
    unsubscribeFromTopic("/topic/room/lobby");

    // 구독 및 상태 업데이트
    subscribeToTopic("/topic/room/lobby", handleNewMessage);
    subscribedRef.current = true;

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      console.log("Chat 컴포넌트 언마운트: 구독 해제");
      unsubscribeFromTopic("/topic/room/lobby");
      subscribedRef.current = false;
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* 채팅 영역 */}
      <div className="w-full h-[805px] bg-[var(--color-point)] text-white rounded-lg md:rounded-xl p-4 overflow-auto">
        {chatList.map((item, index) => (
          <div
            key={index}
            className="mb-2"
            ref={index === chatList.length - 1 ? lastMessageRef : null}
          >
            <span className="font-bold">{item.sender}: </span>
            <span>{item.message}</span>
          </div>
        ))}
        <div ref={lastMessageRef} />
      </div>

      {/* 입력 영역 */}
      <div className="w-full sm:h-[20%] md:h-[49px] bg-white/50 rounded-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder="메시지를 입력하세요..."
          className="w-full h-full px-4 rounded-lg md:rounded-2xl outline-none"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

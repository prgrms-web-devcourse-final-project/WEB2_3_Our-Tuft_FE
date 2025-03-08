"use client";

import { useEffect, useRef, useState } from "react";
import {
  unsubscribeFromTopic,
  subscribeToTopic,
  sendMessage,
} from "../../../service/api/socketConnection";

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const [chatList, setChatList] = useState<
    { message: string; sender: string }[]
  >([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current) {
        console.log("전송");
        sendMessage("/topic/room/lobby", inputRef.current.value);
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  useEffect(() => {
    unsubscribeFromTopic("/topic/room/lobby");
    const handleNewMessage = (msg: any) => {
      if (
        typeof msg === "object" &&
        msg !== null &&
        "message" in msg &&
        "sender" in msg
      ) {
        console.log(msg);
        setChatList((prevMessages) => [...prevMessages, msg]);
      } else {
        console.warn("Unexpected message format:", msg);
      }
    };
    subscribeToTopic("/topic/room/lobby", handleNewMessage);

    return () => {
      unsubscribeFromTopic("/topic/room/lobby");
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

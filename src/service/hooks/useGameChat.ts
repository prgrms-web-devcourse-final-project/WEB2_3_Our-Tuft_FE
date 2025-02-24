"use client";

import { useChatStore } from "../../store/useChatStore";
import { useEffect, useRef } from "react";

export function useGameChat(userName: string) {
  // 채팅 상태 관리
  const { chatMessages, currentMessage, setChatMessages, setCurrentMessage } =
    useChatStore();
  // 채팅 메세지 창 ref
  const chatContainerRef = useRef<HTMLDivElement>(null!);

  // 채팅 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() === "") return;

    const newMessage = {
      id: userName,
      text: currentMessage,
    };

    setChatMessages([...chatMessages, newMessage]);
    setCurrentMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // 채팅 스크롤을 맨 아래로 자동 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return {
    chatMessages,
    currentMessage,
    chatContainerRef,
    handleInputChange,
    handleSendMessage,
    handleKeyDown,
  };
}

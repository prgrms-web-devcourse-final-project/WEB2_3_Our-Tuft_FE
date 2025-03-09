"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  unsubscribeFromTopic,
  subscribeToTopic,
  sendMessage,
  socketConnection,
} from "../../../../service/api/socketConnection";
import { useParams } from "next/navigation";
import { roomUserListData } from "../../../../types/roomType";
import { defaultFetch } from "../../../../service/api/defaultFetch";
import { useIsRoomStore } from "../../../../store/roomStore";
import { useLoginStore } from "../../../../store/store";

export default function Chat({
  setUserList,
}: {
  setUserList: Dispatch<SetStateAction<roomUserListData | undefined>>;
}) {
  const params = useParams();

  const { setIsQuizisReady } = useIsRoomStore();
  const { token } = useLoginStore();

  const isFirstRender = useRef<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLInputElement>(null);

  const [chatList, setChatList] = useState<
    { message: string; sender: string; event?: string }[]
  >([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current) {
        console.log("전송");
        sendMessage(`/topic/room/${params.id}`, inputRef.current.value);
        inputRef.current.value = "";
      }
    }
  };

  const fetchUserList = async () => {
    const response = await defaultFetch<roomUserListData>(
      `/room/${params.id}/players`,
      {
        method: "GET",
      }
    );
    setUserList(response);
    console.log(response);
  };

  /*
   * 해당 방 구독 - 채팅 보내기 (/topic/room/${roomId})
   * 채팅 받기 (/topic/room/${roomId})
   */
  useEffect(() => {
    const handleNewMessage = async (msg: any) => {
      if (
        (typeof msg === "object" &&
          msg !== null &&
          "message" in msg &&
          "sender" in msg) ||
        msg.event === "퀴즈가 등록되지 않았습니다."
      ) {
        console.log(msg);
        if (msg.event === "퀴즈가 등록되지 않았습니다.") {
          setIsQuizisReady(false);
        }
        if (msg.message === "퀴즈 선택이 완료되었습니다") {
          setIsQuizisReady(true);
        }
        setChatList((prevMessages) => [...new Set([...prevMessages]), msg]);
      } else {
        console.warn("Unexpected message format:", msg);
      }

      if (msg.event) {
        fetchUserList();
      }
    };
    subscribeToTopic(`/topic/room/${params.id}`, handleNewMessage);
    fetchUserList();

    return () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        console.log("위", isFirstRender);
      } else {
        console.log("아래?", isFirstRender);
        unsubscribeFromTopic(`/topic/room/${params.id}`);
      }
    };
  }, []);

  useEffect(() => {
    socketConnection(token ?? undefined).catch((error) => {
      console.error("소켓 연결 실패:", error);
    });
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  return (
    <div
      className="
        
        flex flex-col bg-[var(--color-point)] 
        xl:h-full md:h-full h-[180px]
        xl:rounded-[32px] rounded-[20px] 
        xl:p-6 p-3 md:px-2 xl:pb-4 md:pb-4 "
    >
      <div className="w-full h-[700px] overflow-auto">
        {chatList.map((item, index) => (
          <p
            className={`${item.event && "text-red-600 font-bold text-xl"} pb-1`}
            key={index}
            ref={index === chatList.length - 1 ? lastMessageRef : null}
          >
            <span className="font-bold">
              {item.sender ? `${item.sender} :` : ""}{" "}
            </span>
            {item.message || item.event}
          </p>
        ))}
      </div>
      <input
        ref={inputRef}
        className="
          w-full text-black bg-[#d9d9d9]  
          xl:rounded-[20px] rounded-[16px]  
          xl:pl-6 pl-3 xl:pb-0 md:pb-2 xl:h-14 h-11  
          xl:placeholder:text-[20px] placeholder:text-[14px] placeholder:text-gray-500  
          "
        placeholder="메시지를 입력하세요..."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

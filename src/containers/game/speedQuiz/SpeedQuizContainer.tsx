"use client";

import { useSearchParams } from "next/navigation";
import QuizBoard from "../../../components/QuizBoard";
import SpeedOXFooter from "../../../components/SpeedOXFooter";
import QuizMain from "./quizMain";
import { useEffect, useState } from "react";
import {
  sendMessage,
  subscribeToTopic,
  unsubscribeFromTopic,
} from "../../../service/api/socketConnection";

export default function SpeedQuizContainer() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [chatList, setChatList] = useState<
    { id: string; chat: string; chatId: string }[]
  >([]);

  const [quize, setQuize] = useState<string>("");
  const [round, setRound] = useState<string>("");

  useEffect(() => {
    const handleNewMessage = async (msg: any) => {
      console.log(msg);
      if (msg.event === "ALL_CONNECTED") {
        sendMessage(`/app/room/${id}/event`, " GAME_STARTED");
      }
      if (msg.question) {
        setQuize(msg.question);
      }
      if (msg.message) {
        setRound(msg.message.slice(0, 2));
      }
    };
    subscribeToTopic(`/topic/game/${id}`, handleNewMessage);
    return () => {
      unsubscribeFromTopic(`/topic/game/${id}`);
    };
  }, []);
  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen items-center justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="w-[90vw]">
          <QuizBoard quize={quize} round={round} />
          <QuizMain chat={chatList} />
          <SpeedOXFooter chat={setChatList} />
        </div>
      </div>
    </>
  );
}

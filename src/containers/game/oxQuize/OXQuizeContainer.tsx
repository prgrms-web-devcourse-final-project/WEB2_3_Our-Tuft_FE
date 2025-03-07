"use client";

import { useState } from "react";
import QuizBoard from "../../../components/QuizBoard";
import SpeedOXFooter from "../../../components/SpeedOXFooter";
import OXMain from "./OXMain";
import OXButtons from "./OXMain/oxButtons";

export default function OXQuizeContainer() {
  const [chatList, setChatList] = useState<
    { id: string; chat: string; chatId: string }[]
  >([]);
  const [oxAnswer, setoxAnswer] = useState<boolean | null>(null);

  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen items-center justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="relative w-[90vw]">
          <QuizBoard oxAnswer={setoxAnswer} />
          <OXMain chat={chatList} oxAnswer={oxAnswer} />
          <OXButtons oxAnswer={oxAnswer} />
          <SpeedOXFooter chat={setChatList} />
        </div>
      </div>
    </>
  );
}

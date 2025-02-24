"use client";

import { useRouter } from "next/navigation";
import { useGameUsers } from "../../../service/hooks/useGameUsers";
import { useGameChat } from "../../../service/hooks/useGameChat";

import Settings from "../../../components/Settings/Settings";
import ChatBox from "../../../components/ChatBox/ChatBox";
import Canvas from "../../../components/Canvas/Canvas";
import WordTimeCount from "../../../components/WordTimeCount/WordTimeCount";
import UserList from "../../../components/UserList/UserList";

export default function DesktopContainer() {
  const { users, paddedUsers, correctUsers, handleCorrectAnswer } =
    useGameUsers();
  const {
    chatMessages,
    currentMessage,
    chatContainerRef,
    handleInputChange,
    handleSendMessage,
    handleKeyDown,
  } = useGameChat(users[0]?.name); // 임시

  const router = useRouter();

  return (
    <div
      style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      className="w-full min-h-screen flex items-center justify-center bg-center bg-cover bg-repeat"
    >
      <div className="grid grid-rows-[repeat(11,_1fr)] grid-cols-[1fr_3fr_1fr] gap-x-6 gap-y-3 w-[90vw] h-[90vh] aspect-w-1 aspect-h-1 overflow-y-auto min-h-[600px]">
        {/* 첫 번째 그리드 영역 (row-span-11) */}
        <div className="grid grid-rows-[repeat(11,_1fr)] row-span-11 rounded-xl gap-x-4 gap-y-4">
          {/* 단어, 남은 시간 표시 */}
          <WordTimeCount />
          {/* 참여 유저 렌더링 */}
          <UserList paddedUsers={paddedUsers} correctUsers={correctUsers} />
        </div>
        {/* 두 번째 그리드 영역 (row-span-11) */}
        {/* 캔버스(그림판) 영역 */}
        <Canvas />

        {/* 세 번째 그리드 영역 */}
        {/* 설정 버튼 영역 */}
        <div className="text-white grid grid-cols-3 justify-between gap-x-2">
          <Settings />
        </div>
        {/* 채팅 박스 */}
        <div className="bg-[var(--color-second)]/90 text-white flex flex-col items-center justify-center row-span-10 rounded-xl lg:rounded-2xl p-2.5">
          <ChatBox
            chatMessages={chatMessages}
            currentMessage={currentMessage}
            chatContainerRef={chatContainerRef}
            handleInputChange={handleInputChange}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}

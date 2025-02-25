"use client";

import { useGameUsers } from "../../../service/hooks/useGameUsers";
import { useGameChat } from "../../../service/hooks/useGameChat";

import Settings from "../../../components/Settings/Settings";
import ChatBox from "../../../components/ChatBox/ChatBox";
import Canvas from "../../../components/Canvas/Canvas";
import WordTimeCount from "../../../components/WordTimeCount/WordTimeCount";
import UserList from "../../../components/UserList/UserList";

export default function MobileContainer() {
  // const { users, paddedUsers, correctUsers, handleCorrectAnswer } =
  const { users, paddedUsers, correctUsers } = useGameUsers();
  const {
    chatMessages,
    currentMessage,
    chatContainerRef,
    handleInputChange,
    handleSendMessage,
    handleKeyDown,
  } = useGameChat(users[0]?.name); // 임시

  return (
    <div
      style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-center bg-cover bg-repeat"
    >
      {/* 설정 버튼 영역 */}
      <div className="w-[90vw] flex justify-end gap-x-2 mb-2">
        <Settings />
      </div>
      <div className="grid grid-rows-[repeat(13,_1fr)] grid-cols-[1fr_3fr] gap-x-4 gap-y-2 w-[90vw] h-[90vh] aspect-w-1 aspect-h-1 overflow-y-auto min-h-[600px]">
        {/* 첫 번째 그리드 영역 (row-span-10) */}
        <div className="grid grid-rows-[repeat(10,_1fr)] row-span-10 rounded-xl gap-x-4 gap-y-2">
          {/* 단어, 남은 시간 표시 */}
          <WordTimeCount />
          {/* 참여 유저 렌더링 */}
          <UserList paddedUsers={paddedUsers} correctUsers={correctUsers} />
        </div>

        {/* 두 번째 그리드 영역 (row-span-10) */}
        {/* 캔버스(그림판) 영역 */}
        <Canvas />

        {/* 채팅 박스 */}
        <div className="bg-[var(--color-second)]/90 text-white flex flex-col items-center justify-center row-span-3 col-span-2 rounded-xl p-2.5">
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

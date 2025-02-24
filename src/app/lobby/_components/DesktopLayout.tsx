import Chat from "./Chat";
import GameDescription from "./GameDescription";
import ButtonGroup from "./ButtonGroup";
import UserProfile from "./UserProfile";
import GameBanner from "./GameBanner";
import GameRoomList from "./GameRoomList";

export default function DesktopLayout() {
  return (
    <div className="hidden lg:flex w-full h-full min-h-screen items-center justify-center px-[35px] py-[52px]">
      <div className="w-full h-full min-w-[800px] max-w-[1850px] min-h-[600px] max-h-[975px] aspect-[1850/975] flex flex-col">
        <div className="flex flex-row gap-[20px] h-full">
          {/* 왼쪽 영역 */}
          <div className="flex flex-col gap-6 w-[23.78%] h-full">
            {/* 게임 배너 영역 */}
            <div className="flex-[35] bg-[var(--color-second)]/90 rounded-2xl drop-shadow-custom p-[0px]">
              <GameBanner />
            </div>
            {/* 게임 설명 영역 */}
            <div className="flex-[33] bg-[var(--color-second)]/90 rounded-lg drop-shadow-custom p-[10px]">
              <GameDescription />
            </div>
            {/* 유저 프로필 영역 */}
            <div className="flex-[25] bg-[var(--color-second)]/90 rounded-2xl drop-shadow-custom p-[10px]">
              <UserProfile />
            </div>
          </div>

          {/* 중앙 방 목록 영역 */}
          <div className="w-[54.97%] h-full bg-[var(--color-second)]/90 rounded-2xl drop-shadow-custom p-[10px]">
            <GameRoomList />
          </div>

          {/* 오른쪽 영역 */}
          <div className="w-[19.13%] h-full flex flex-col gap-[7px]">
            {/* 상단 버튼 영역 */}
            <ButtonGroup />
            {/* 채팅 영역 */}
            <div className="h-[91.79%] bg-[var(--color-second)]/90 rounded-2xl drop-shadow-custom p-[10px]">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

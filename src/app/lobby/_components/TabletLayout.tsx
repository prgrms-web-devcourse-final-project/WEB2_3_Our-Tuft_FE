import Chat from "./Chat";
import ButtonGroup from "./ButtonGroup";
import UserProfile from "./UserProfile";
import GameBanner from "./GameBanner";
import GameRoomList from "./GameRoomList";

export default function TabletLayout() {
  return (
    <div className="hidden md:flex xl:hidden w-full h-full min-h-screen items-center justify-center px-[0.625rem] py-[2.5rem]">
      <div
        className="w-full h-full aspect-[1024/1366] 
          max-w-[64rem] mx-auto
          flex gap-4 overflow-auto"
      >
        {/* 왼쪽 게임룸 리스트 영역 (2/3) */}
        <div className="w-[70%] bg-[var(--color-second)]/90 rounded-2xl drop-shadow-custom p-[0.625rem]">
          <GameRoomList />
        </div>

        {/* 오른쪽 영역 (1/3) */}
        <div className="w-[30%] grid grid-rows-[5%_17.8%_13%_60.3%] gap-4">
          {/* 버튼 그룹 영역 */}
          <div className="w-full">
            <ButtonGroup />
          </div>

          {/* 게임 배너 영역 */}
          <div className="w-full bg-[var(--color-second)]/90 rounded-2xl drop-shadow-custom p-[0.625rem]">
            <GameBanner />
          </div>

          {/* 유저 프로필 영역 */}
          <div className="w-full bg-[var(--color-second)]/90 rounded-2xl drop-shadow-custom p-[0.625rem]">
            <UserProfile />
          </div>

          {/* 채팅 영역 */}
          <div className="w-full bg-[var(--color-second)]/90 rounded-2xl drop-shadow-custom p-[0.625rem]">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

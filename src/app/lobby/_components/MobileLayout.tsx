import Chat from "./Chat";
import MobileProfile from "./MobileProfile";
import MobileRoomList from "./MobileRoomList";

export default function MobileLayout() {
  return (
    <div className="block md:hidden w-full h-full min-w-[375px] min-h-[812px] flex flex-col gap-1 p-3">
      {/* 방 목록 */}
      <div className="bg-[var(--color-second)]/90 rounded-2xl p-2 h-[55%]">
        <MobileRoomList />
      </div>
      {/* 프로필 및 버튼그룹 */}
      <div className="bg-[var(--color-second)]/90 rounded-xl p-2 h-[10%]">
        <MobileProfile />
      </div>
      {/* 채팅 */}
      <div className="bg-[var(--color-second)]/90 rounded-2xl p-2 h-[35%]">
        <Chat />
      </div>
    </div>
  );
}

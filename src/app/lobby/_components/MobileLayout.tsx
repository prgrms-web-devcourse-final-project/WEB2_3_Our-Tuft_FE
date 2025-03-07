import Chat from "./Chat";
import MobileProfile from "./MobileProfile";
import MobileRoomList from "./MobileRoomList";
import { Room } from "../../../types/Room";

interface MobileLayoutProps {
  roomsData?: Room[];
}

export default function MobileLayout({ roomsData }: MobileLayoutProps) {
  return (
    <div className="block md:hidden w-full h-full min-h-screen flex flex-col gap-1 p-3 overflow-auto">
      <div className="w-full h-full aspect-[375/812] max-w-[500px] mx-auto flex flex-col gap-1">
        {/* 방 목록 */}
        <div className="bg-[var(--color-second)]/90 rounded-2xl p-2 h-[55%]">
          <MobileRoomList roomsData={roomsData} /> {/* roomsData prop 전달 */}
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
    </div>
  );
}

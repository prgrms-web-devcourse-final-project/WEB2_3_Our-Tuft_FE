import RoomActionButtons from "./info/RoomActionButtons";
import RoomsInfo from "./info/RoomsInfo";

export default function RoomsBottom() {
  return (
    <div className="flex gap-9 w-full items-center drop-shadow-custom">
      <div className="flex-3 min-w-0 bg-[var(--color-second)] py-6 lg:rounded-[20px]  md:rounded-[12px]">
        <RoomsInfo />
      </div>
      <div className="flex-1">
        <RoomActionButtons />
      </div>
    </div>
  );
}

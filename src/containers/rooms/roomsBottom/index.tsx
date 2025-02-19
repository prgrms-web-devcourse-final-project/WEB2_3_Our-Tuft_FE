import RoomActionButtons from "./info/RoomActionButtons";
import RoomsInfo from "./info/RoomsInfo";

export default function RoomsBottom() {
  return (
    <div className="flex gap-9 w-full h-32 items-center drop-shadow-custom">
      <div className="flex-3 bg-[var(--color-second)] py-6 rounded-[20px]">
        <RoomsInfo />
      </div>
      <div className="flex-1">
        <RoomActionButtons />
      </div>
    </div>
  );
}

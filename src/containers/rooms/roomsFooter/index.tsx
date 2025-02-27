import RoomActionButtons from "./info/RoomActionButtons";
import RoomsInfo from "./info/RoomsInfo";

export default function RoomsFooter() {
  return (
    <div
      className="
      flex w-full items-center drop-shadow-custom rounded-xl mt-2
      xl:gap-9 md:gap-9  
      xl:bg-transparent md:bg-transparent bg-[var(--color-second)]"
    >
      <div
        className="
          xl:flex-3 md:flex-3 flex-8 min-w-0 bg-[var(--color-second)] 
          xl:py-4 md:py-4 py-2 
          xl:rounded-[20px] rounded-[12px]
          "
      >
        <RoomsInfo />
      </div>
      <div className="flex-1">
        <RoomActionButtons />
      </div>
    </div>
  );
}

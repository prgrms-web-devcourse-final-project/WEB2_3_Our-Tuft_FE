import GameControlButtons from "../GameControlButtons";
import WideChat from "../WideChat";

export default function SpeedOXFooter() {
  return (
    <div
      className="
        flex w-full items-center drop-shadow-custom 
        2xl:gap-5 md:gap-3 gap-2 
        mt-3 p-3 bg-[var(--color-point)] rounded-xl"
    >
      <div className="flex-3 min-w-0 bg-[#D9D9D9] py-2 md:py-4 2xl:py-4 2xl:rounded-[20px] rounded-[12px]">
        <WideChat />
      </div>
      <div className="flex-1">
        <GameControlButtons />
      </div>
    </div>
  );
}

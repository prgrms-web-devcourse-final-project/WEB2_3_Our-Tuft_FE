import GameControlButtons from "../GameControlButtons";
import WideChat from "../WideChat";

export default function SpeedOXFooter() {
  return (
    <div className="flex 2xl:gap-5 gap-3 w-full items-center drop-shadow-custom mt-3 bg-[var(--color-point)] p-3 rounded-xl">
      <div className="flex-5 min-w-0 bg-[#D9D9D9] py-5 2xl:py-6 2xl:rounded-[20px] rounded-[12px]">
        <WideChat />
      </div>
      <div className="flex-1">
        <GameControlButtons />
      </div>
    </div>
  );
}

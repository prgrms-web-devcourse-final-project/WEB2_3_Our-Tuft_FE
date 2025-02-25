import WideChat from "../../../../components/WideChat";
import GameControlButtons from "../../../../components/GameControlButtons";

export default function OXFooter() {
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:gap-3 2xl:items-center 2xl:pt-10">
      <div className="flex-5 order-2 fixed w-[90%] 2xl:static bottom-3 z-10 2xl:order-1 min-w-0 bg-[#D9D9D9] py-6 rounded-[20px]">
        <WideChat />
      </div>

      <div className="flex-1 order-1 2xl:order-2 bg-[var(--color-second)] rounded-4xl p-4 2xl:bg-transparent 2xl:rounded-none 2xl:p-0 2xl:mb-0 mb-25">
        <GameControlButtons />
      </div>
    </div>
  );
}

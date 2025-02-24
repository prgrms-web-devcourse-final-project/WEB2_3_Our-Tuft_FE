import WideChat from "../../../../components/WideChat";
import GameControlButtons from "../../../../components/GameControlButtons";

export default function OXFooter() {
  return (
    <div className="flex gap-9 w-[97%] items-center drop-shadow-custom">
      <div className="flex-5 min-w-0 bg-[#D9D9D9] py-6 lg:rounded-[20px]">
        <WideChat />
      </div>
      <div className="flex-1">
        <GameControlButtons />
      </div>
    </div>
  );
}

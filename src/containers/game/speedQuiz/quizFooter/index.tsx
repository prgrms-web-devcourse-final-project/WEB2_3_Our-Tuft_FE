import GameControlButtons from "../../../../components/GameControlButtons";
import WideChat from "../../../../components/WideChat";

export default function QuizFooter() {
  return (
    <div className="flex gap-9 w-full items-center drop-shadow-custom">
      <div className="flex-5 min-w-0 bg-[#D9D9D9] py-6 2xl:rounded-[20px]">
        <WideChat />
      </div>
      <div className="flex-1">
        <GameControlButtons />
      </div>
    </div>
  );
}

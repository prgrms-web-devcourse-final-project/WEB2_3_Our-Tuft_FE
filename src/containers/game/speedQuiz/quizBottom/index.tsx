import Chat from "./chat";
import Button from "./button";

export default function QuizBottom() {
  return (
    <div className="flex gap-9 w-full items-center drop-shadow-custom">
      <div className="flex-5 min-w-0 bg-[#D9D9D9] py-6 lg:rounded-[20px]">
        <Chat />
      </div>
      <div className="flex-1">
        <Button />
      </div>
    </div>
  );
}

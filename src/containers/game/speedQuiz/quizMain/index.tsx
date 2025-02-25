import ChatBubble from "../../../../components/ChatBubble";
import UserCard from "../../../../components/UserCard";

export default function QuizMain() {
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:gap-10 gap-3 mb-2 2xl:bg-transparent 2xl:rounded-none 2xl:p-0 bg-[var(--color-second)] rounded-4xl p-5">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i, index) => (
        <div key={index}>
          <div className="flex flex-col">
            <div className="hidden 2xl:flex flex-col justify-end h-[200px]">
              {[0, 1, 2].map((i, index) => (
                <ChatBubble key={index} />
              ))}
            </div>
            <UserCard
              bgColor={"bg-[#ffd377]"}
              imageSize={"h-40"}
              textSize2={"2xl:text-[18px] text-[28px]"}
              padding={"p-3"}
            >
              <div
                className="absolute 2xl:static justify-center 2xl:pt-2 text-3xl"
                style={{
                  fontFamily: "PressStart2P, sans-serif",
                  color: "white",
                }}
              >
                <span className="2xl:[-webkit-text-stroke:1px_black]">250</span>
              </div>
            </UserCard>
          </div>
        </div>
      ))}
    </div>
  );
}

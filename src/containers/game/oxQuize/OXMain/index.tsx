import OXList from "./oxList";
import ChatBubble from "../../../../components/ChatBubble";
import UserCard from "../../../../components/UserCard";

export default function OXMain() {
  return (
    <div
      className="
        relative flex flex-col 2xl:flex-row gap-3 2xl:gap-10 mb-2
        bg-[var(--color-second)] p-5 rounded-4xl 
        h-[450px] overflow-y-scroll 
        2xl:bg-transparent 2xl:p-0 2xl:rounded-none
        md:h-auto md:overflow-visible 
        xl:h-auto xl:overflow-visible
      "
    >
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
              textSize2={"2xl:text-[18px] md:text-[28px] sm:text-[20px]"}
              padding={"p-3"}
            >
              <OXList />
              <div
                className="absolute 2xl:static justify-center 2xl:pt-2 md:text-3xl sm:text-xl"
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

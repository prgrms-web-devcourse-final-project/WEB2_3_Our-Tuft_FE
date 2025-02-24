import OXButtons from "./oxButtons";
import OXList from "./oxList";
import ChatBubble from "../../../../components/ChatBubble";
import UserCard from "../../../../components/UserCard";

export default function OXMain() {
  return (
    <div className="flex w-[97%] gap-5">
      <OXButtons />
      {[0, 1, 2, 3].map((i, index) => (
        <div key={index}>
          <div className="flex flex-col ">
            <div className="flex flex-col justify-end h-[200px]">
              {[0, 1, 2].map((i, index) => (
                <ChatBubble key={index} />
              ))}
            </div>
            <UserCard
              bgColor={"bg-[#ffd377]"}
              imageSize={"h-40"}
              textSize2={"text-[18px]"}
            >
              <OXList />
              <div className="justify-center pt-2 text-2xl font-bold">250</div>
            </UserCard>
          </div>
        </div>
      ))}
    </div>
  );
}

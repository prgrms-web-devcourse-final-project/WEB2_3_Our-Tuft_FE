import ChatBubble from "../../../../components/ChatBubble";
import UserCard from "../../../../components/UserCard";
import { quizeMessage } from "../../../../store/quizeStore";
import { quizeUserList } from "../../../../types/quize";

export default function OXMain({
  chat,
  userList,
  correctUser,
  userCount,
}: {
  chat: quizeMessage[];
  userList: quizeUserList;
  correctUser: number[];
  userCount: { userId: number; count: number }[];
}) {
  type GroupedData = { [key: string]: (typeof chat)[0][] };
  const groupedById = chat.reduce((acc: GroupedData, item) => {
    if (!acc[item.sender]) {
      acc[item.sender] = [];
    }
    acc[item.sender].push(item);
    return acc;
  }, {});

  return (
    <div
      className="
        relative flex flex-col 2xl:flex-row gap-3 2xl:gap-10 
        bg-[var(--color-second)] p-5 mb-2
        2xl:bg-transparent 2xl:p-0 2xl:rounded-none rounded-4xl 
        xl:h-auto md:h-[940px] h-[50vh] 
        md:overflow-visible overflow-y-scroll 
        xl:overflow-visible
      "
    >
      {userList &&
        userList.data.map((i, index) => {
          const isCorrectUser = correctUser.includes(Number(i.userId));

          const userScore =
            userCount.find((user) => user.userId === Number(i.userId))?.count ||
            0;
          return (
            <div key={index}>
              <div className="flex flex-col">
                <div className="hidden 2xl:flex flex-col justify-end h-[200px]">
                  {Object.entries(groupedById)
                    .filter(([id]) => id === i.username)
                    .flatMap(([_, messages]) =>
                      messages.map((msg, index) => (
                        <ChatBubble msg={msg} key={index} />
                      ))
                    )}
                </div>
                <UserCard
                  bgColor={`${
                    isCorrectUser
                      ? "bg-[var(--color-amberOrange)]"
                      : "bg-[#ffd377]"
                  }`}
                  imageSize={"h-40"}
                  textSize2={"2xl:text-[18px] md:text-[28px] sm:text-[20px]"}
                  padding={"p-3"}
                  nickname={i.username}
                  key={index}
                >
                  <div
                    className="absolute 2xl:static justify-center 2xl:pt-2 md:text-3xl sm:text-xl"
                    style={{
                      fontFamily: "PressStart2P, sans-serif",
                      color: "white",
                    }}
                  >
                    <span className="2xl:[-webkit-text-stroke:1px_black]">
                      {userScore}
                    </span>
                  </div>
                </UserCard>
              </div>
            </div>
          );
        })}
    </div>
  );
}

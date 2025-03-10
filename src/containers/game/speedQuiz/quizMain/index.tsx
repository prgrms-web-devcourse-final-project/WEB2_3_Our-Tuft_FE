import ChatBubble from "../../../../components/ChatBubble";
import UserCard from "../../../../components/UserCard";
import { useState } from "react";
import { quizeMsg, quizeUserList } from "../../../../types/quize";
export default function quizMain({
  chat,
  userList,
  answer,
}: {
  chat: quizeMsg[];
  userList: quizeUserList;
  answer: string;
}) {
  // const [answer, setAnswer] = useState<{ user: string; answer: boolean }[]>([]);
  const [userox, setUserox] = useState<{ id: string; answer?: boolean }[]>([]);

  type GroupedData = { [key: string]: (typeof chat)[0][] };
  const groupedById = [...chat].reduce((acc: GroupedData, item) => {
    if (!acc[item.sender]) {
      acc[item.sender] = [];
    }
    acc[item.sender].push(item);
    return acc;
  }, {});

  // useEffect(() => {

  //   // 기존에 있는 값들은 그대로 두고 answer만 null로 초기화
  //   const initializedUser = uniqueIds.map((chat) => ({
  //     id: chat.id,
  //     answer: null,
  //   }));

  //   setUser(initializedUser);
  // }, [chat]);

  // useEffect(() => {
  //   socket.on("answer", (msg: { id: string; answer: boolean }) => {
  //     setUser((prev) => {
  //       const updatedUser = prev.map((user) =>
  //         user.id === msg.id ? { ...user, answer: msg.answer } : user
  //       );

  //       return updatedUser;
  //     });
  //   });
  // }, []);

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
        userList.data.map((i, index) => (
          <div key={index}>
            <div className="flex flex-col">
              <div className="hidden 2xl:flex flex-col justify-end h-[200px]">
                {Object.entries(groupedById)
                  .filter(([id]) => id === i.username)
                  .flatMap(([_, messages]) =>
                    messages.map((msg, index) => (
                      <ChatBubble msg={msg} key={msg.message + index} />
                    ))
                  )}
              </div>
              <UserCard
                bgColor={`${
                  answer === i.username
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
                    250
                  </span>
                </div>
              </UserCard>
            </div>
          </div>
        ))}
    </div>
  );
}

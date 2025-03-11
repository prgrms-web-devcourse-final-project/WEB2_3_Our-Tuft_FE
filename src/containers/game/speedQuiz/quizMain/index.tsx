import { useEffect, useState } from "react";
import UserCard from "../../../../components/UserCard";
import ChatBubble from "../../../../components/ChatBubble";
import { quizeMsg, quizeUserList } from "../../../../types/quize";

export default function QuizMain({
  chat,
  userList,
}: {
  chat: quizeMsg[];
  userList: quizeUserList;
}) {
  type GroupedData = { [key: string]: (typeof chat)[0][] };

  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [gameRound, setGameRound] = useState<string>("");

  const groupedById = [...chat].reduce((acc: GroupedData, item) => {
    if (!acc[item.sender]) {
      acc[item.sender] = [];
    }
    acc[item.sender].push(item);
    return acc;
  }, {});
  useEffect(() => {
    let round = chat
      .filter((i) => i.message.includes("라운드"))
      .pop()
      ?.message.slice(0, 2);
    round && setGameRound(round);

    let answerUser =
      chat
        .filter((i) => i.message.includes("정답"))
        .pop()
        ?.message.split("님")[0] || "빈값";
    gameRound === round
      ? setUserAnswer((pre) => [...pre, answerUser])
      : setUserAnswer([]);
    console.log("userAnswer", userAnswer, gameRound, round);
  }, [chat, gameRound]);

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
                  .flatMap(([i, messages]) =>
                    messages.map((msg, index) => (
                      <ChatBubble msg={msg} key={msg.message + index} />
                    ))
                  )}
              </div>
              <UserCard
                bgColor={`${
                  userAnswer.includes(i.username)
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

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import {
  sendMessage,
  socketConnection,
  subscribeToTopic,
  unsubscribeFromTopic,
} from "../../../service/api/socketConnection";

import Modal from "../../../components/Modal";
import QuizMain from "./quizMain";
import QuizBoard from "../../../components/QuizBoard";
import SpeedOXFooter from "../../../components/SpeedOXFooter";
import { useIsRoomStore } from "../../../store/roomStore";
import { useInitializeGame } from "../../../service/hooks/useInitializeGame";
import { useLoginStore } from "../../../store/store";
import { QuizeMsgType, quizeUserList } from "../../../types/quize";

export default function SpeedQuizContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const { token } = useLoginStore();
  const { isHost } = useIsRoomStore();
  const isFirstRender = useRef<boolean>(true);
  const [chatList, setChatList] = useState<
    { message: string; sender: string; event?: string }[]
  >([]);
  const [quize, setQuize] = useState<string>("");
  const [midAnswer, setMidAnswer] = useState<string>("");
  // const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const { user, scoreList, isOpen, setIsOpen, fetchUserList, fetchScoreList } =
    useInitializeGame(id);

  const time = new Date();
  const { seconds, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => {},
  });

  useEffect(() => {
    const handleNewMessage = async (msg: QuizeMsgType) => {
      if (msg.event === "ALL_CONNECTED" && isHost) {
        sendMessage(`/app/room/${id}/event`, "GAME_STARTED");
      }
      if (
        (typeof msg === "object" &&
          msg !== null &&
          "message" in msg &&
          "sender" in msg) ||
        "question" in msg
      ) {
        if (msg.question && "question" in msg) {
          setQuize(msg.question);
        }

        if ("message" in msg && "sender" in msg) {
          if (msg.message?.includes("정답")) {
            setMidAnswer(chatList.pop()?.message!);
          } else {
            setChatList((prevMessages) => [...prevMessages, msg]);
          }
        }

        if (msg.message === "게임이 종료되었습니다.") {
          setTimeout(async () => {
            await fetchScoreList();
            setIsOpen(true);
          }, 1000);
        }

        if (msg.message?.includes("라운드")) {
          await fetchScoreList();
          console.log("scoreList", scoreList);
        }
      } else {
        console.warn("Unexpected message format:", msg);
      }

      if (msg.event?.includes("NEW_ROOM_CREATED_")) {
        const match = msg.event.match(/\d+$/);
        time.setSeconds(time.getSeconds() + 10);

        setTimeout(() => {
          router.push(`/lobby/rooms/${match}?password=true`);
        }, 9000);
      }
      if (msg.event === "PLAYER_ADDED") {
        fetchUserList();
      }
    };

    subscribeToTopic(`/topic/game/${id}`, handleNewMessage);

    return () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else {
        unsubscribeFromTopic(`/topic/game/${id}`);
      }
    };
  }, []);

  useEffect(() => {
    if (scoreList) {
      const newTime = new Date();
      newTime.setSeconds(newTime.getSeconds() + 10);
      restart(newTime);
    }
  }, [scoreList, restart]);

  useEffect(() => {
    socketConnection(token ?? undefined).catch((error) => {
      console.error("소켓 연결 실패:", error);
    });
  }, [token]);

  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen items-center justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="w-[90vw]">
          <QuizBoard quize={quize} chat={chatList} midAnswer={midAnswer} />
          <QuizMain chat={chatList} userList={user!} scoreList={scoreList!} />
          <SpeedOXFooter chat={chatList} />
        </div>
      </div>

      {isOpen && scoreList && (
        <Modal
          title={"🏆최종 점수🏆"}
          width={"xl:w-[788px] md:w-[60%] w-[80%]"}
          height={""}
          showCancelButton={"hidden"}
          showCompleteButton={"hidden"}
          setIsComplete={() => setIsOpen(false)}
        >
          <div
            className="
          flex items-center justify-center bg-[var(--color-point)] rounded-xl text-white 
          xl:text-xl text-md xl:w-[707px] w-[80%] mt-23"
          >
            <div className="flex flex-col gap-3 py-5">
              {scoreList &&
                scoreList.data
                  .sort((a, b) => Number(b.score) - Number(a.score))
                  .map((item, key) => (
                    <p key={key}>
                      {key + 1}등 {item.username} : {parseInt(item.score ?? "")}
                      점
                    </p>
                  ))}
            </div>
          </div>
          <div className="text-red-600 text-2xl font-bold py-5">
            {seconds}초 후 방으로 이동합니다.
          </div>
        </Modal>
      )}
    </>
  );
}

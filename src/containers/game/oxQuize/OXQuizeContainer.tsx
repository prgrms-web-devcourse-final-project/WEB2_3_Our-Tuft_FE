"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useTimer } from "react-timer-hook";

import QuizBoard from "../../../components/QuizBoard";
import OXFooter from "../../../components/OXFooter";
import OXMain from "./OXMain";
import OXButtons from "./OXMain/oxButtons";
import Modal from "../../../components/Modal";
import {
  sendMessage,
  socketConnection,
  subscribeToTopic,
  unsubscribeFromTopic,
} from "../../../service/api/socketConnection";
import { quizeUserList } from "../../../types/quize";
import { UserScoreList } from "../../../store/quizeStore";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { useLoginStore } from "../../../store/store";
import { useIsRoomStore } from "../../../store/roomStore";

export default function OXQuizeContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { token } = useLoginStore();
  const { isHost } = useIsRoomStore();
  const isFirstRender = useRef<boolean>(true);
  const [chatList, setChatList] = useState<
    { message: string; sender: string; event?: string }[]
  >([]);
  const [quize, setQuize] = useState<string>("");
  const [user, setUserList] = useState<quizeUserList | null>(null);
  const [correctUser, setCorrectUser] = useState<number[]>([]);
  const [userCount, setUserCount] = useState<
    { userId: number; count: number }[]
  >([]);
  const [scoreList, setScoreList] = useState<UserScoreList | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const time = new Date();
  const { seconds, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => {},
  });

  const fetchUserList = async () => {
    const response = await defaultFetch<quizeUserList>(
      `/room/${id}/game/players`,
      {
        method: "GET",
      }
    );
    if (response) {
      setUserList(response);
    }
  };

  const fetchScoreList = async () => {
    const response = await defaultFetch<UserScoreList>(
      `/game/api/v1/game/${id}/scores`,
      {
        method: "GET",
      }
    );
    if (response) {
      setScoreList(response);
      setIsOpen(true);
    }
    console.log(response);
  };

  useEffect(() => {
    const handleNewMessage = async (msg: any) => {
      console.log(msg);
      console.log("msg.event: ", msg.event);
      if (msg.event === "ALL_CONNECTED" && isHost) {
        sendMessage(`/app/room/${id}/event`, " GAME_STARTED");
      }

      if (msg.event) {
        const parts = msg.event.split("_");
        if (
          parts.length === 3 &&
          parts[0] === "PLAYER" &&
          parts[2] === "CORRECTED"
        ) {
          const playerNumber = parseInt(parts[1], 10);
          setCorrectUser((prev) => [...prev, playerNumber]);
          setUserCount((prev) => {
            const userExists = prev.find(
              (user) => user.userId === playerNumber
            );
            if (userExists) {
              // 기존 유저가 있으면 카운트를 증가
              return prev.map((user) =>
                user.userId === playerNumber
                  ? { ...user, count: user.count + 1 }
                  : user
              );
            } else {
              // 새로운 유저면 새로 추가
              return [...prev, { userId: playerNumber, count: 1 }];
            }
          });
        }
      }

      if (
        (typeof msg === "object" &&
          msg !== null &&
          "message" in msg &&
          "sender" in msg) ||
        "question" in msg
      ) {
        if ("question" in msg) {
          setCorrectUser([]);
          setQuize(msg.question);
        }

        if ("message" in msg && "sender" in msg) {
          setChatList((prevMessages) => [...prevMessages, msg]);
        }

        if (msg.message === "게임이 종료되었습니다.") {
          setTimeout(async () => {
            await fetchScoreList();
          }, 5000);
        }
      } else {
        console.warn("Unexpected message format:", msg);
      }

      if (msg.event?.includes("NEW_ROOM_CREATED_")) {
        const match = msg.event.match(/\d+$/);
        time.setSeconds(time.getSeconds() + 10);

        setTimeout(() => {
          router.push(`/lobby/rooms/${match}?password=true`);
        }, 5000);
      }
      if (msg.event === "PLAYER_ADDED") {
        fetchUserList();
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
      newTime.setSeconds(newTime.getSeconds() + 5);
      restart(newTime);
    }
  }, [scoreList]);

  useEffect(() => {
    socketConnection(token ?? undefined).catch((error) => {
      console.error("소켓 연결 실패:", error);
    });
  }, []);

  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen items-center justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="relative w-[90vw]">
          <QuizBoard quize={quize} chat={chatList} />
          <OXMain
            chat={chatList}
            userList={user!}
            correctUser={correctUser}
            userCount={userCount}
          />
          <OXButtons />
          <OXFooter chat={chatList} />
        </div>
      </div>
      {isOpen && scoreList && (
        <Modal
          title={"🏆최종 점수🏆"}
          width={"xl:w-[788px] md:w-[60%] w-[80%]"}
          height={"h-[268px]"}
          showCancelButton={"hidden"}
          showCompleteButton={"hidden"}
          setIsComplete={() => setIsOpen(false)}
        >
          <div
            className="
          flex items-center justify-center bg-[var(--color-point)] rounded-xl text-white 
          xl:text-xl text-md w-[707px] w-[80%] h-[96px] mt-23"
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

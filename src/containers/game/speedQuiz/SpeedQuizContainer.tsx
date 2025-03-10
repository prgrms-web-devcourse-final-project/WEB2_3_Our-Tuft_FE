"use client";

import { useSearchParams, useRouter } from "next/navigation";
import QuizBoard from "../../../components/QuizBoard";
import SpeedOXFooter from "../../../components/SpeedOXFooter";
import QuizMain from "./quizMain";
import { useEffect, useRef, useState } from "react";
import {
  sendMessage,
  subscribeToTopic,
  unsubscribeFromTopic,
} from "../../../service/api/socketConnection";
import { quizeUserList } from "../../../types/quize";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { UserScoreList } from "../../../store/quizeStore";
import Modal from "../../../components/Modal";

export default function SpeedQuizContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isFirstRender = useRef<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatList, setChatList] = useState<
    { message: string; sender: string; event?: string }[]
  >([]);
  const [quize, setQuize] = useState<string>("");
  const [round, setRound] = useState<string>("");
  const [user, setUserList] = useState<quizeUserList | null>(null);
  const [answerUser, setAnswerUser] = useState<string>("");
  const [scoreList, setScoreList] = useState<UserScoreList | null>(null);

  interface CreateRoomResponse {
    isSuccess: boolean;
    message?: string;
    data: {
      roomId: number;
      roomName?: string;
      round?: number;
      hostId?: number;
      disclosure?: boolean;
      gameType?: "SPEED" | "CATCHMIND" | "OX";
      time?: number;
      maxUsers?: number;
    };
  }

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

  const fetchCreat = async () => {
    const response = await defaultFetch<CreateRoomResponse>(`/lobbies/rooms`, {
      method: "POST",
      body: JSON.stringify({
        roomName: "방 생성",
        disclosure: false,
        round: 5,
        gameType: "SPEED",
        time: 60,
        maxUsers: 8,
      }),
    });
    console.log(response);
  };

  useEffect(() => {
    const handleNewMessage = async (msg: any) => {
      if (msg.event === "ALL_CONNECTED") {
        sendMessage(`/app/room/${id}/event`, "GAME_STARTED");
      }

      if (
        (typeof msg === "object" &&
          msg !== null &&
          "message" in msg &&
          "sender" in msg) ||
        "question" in msg
      ) {
        if ("question" in msg) {
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

  // useEffect(() => {
  //   const handleNewMessage = (msg: any) => {
  //     if (msg.event === "ALL_CONNECTED") {
  //       sendMessage(`/app/room/${id}/event`, " GAME_STARTED");
  //     }
  //     if (msg.event === "PLAYER_ADDED") {
  //       fetchUserList();
  //     }
  //     if ("question" in msg) {
  //       setQuize(msg.question);
  //     } else {
  //       if ("message" in msg && "sender" in msg) {
  //         setChatList((prevMessages) => [...prevMessages, msg]);
  //       }
  //       // if ("message" in msg && msg.message.includes("라운드")) {
  //       //   setAnswerUser("빈값");
  //       //   const result = msg.message.split("라운드")[0];
  //       //   setRound(result);
  //       // }
  //     }

  //     if (msg.message === "게임이 종료되었습니다.") {
  //       setTimeout(async () => {
  //         await fetchScoreList();
  //       }, 5000);
  //     }
  //     if (msg.event?.includes("NEW_ROOM_CREATED_")) {
  //     }
  //   };

  //   subscribeToTopic(`/topic/game/${id}`, handleNewMessage);

  //   return () => {
  //     if (isFirstRender.current) {
  //       isFirstRender.current = false;
  //     } else {
  //       unsubscribeFromTopic(`/topic/room/${id}`);
  //     }
  //   };
  // }, [id]);

  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen items-center justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="w-[90vw]">
          <QuizBoard quize={quize} chat={chatList} />
          <QuizMain chat={chatList} userList={user!} answer={answerUser} />
          <SpeedOXFooter chat={chatList} />
        </div>
      </div>
      {isOpen && scoreList && (
        <Modal
          title={"최종 점수"}
          width={"xl:w-[788px] md:w-[60%] w-[80%]"}
          height={"h-[268px]"}
          showCancelButton={"hidden"}
          setIsComplete={() => setIsOpen(false)}
        >
          <div
            className="
          flex items-center justify-center bg-[var(--color-point)] rounded-xl text-white 
          xl:text-xl text-md 
          xl:w-[707px] w-[80%] h-[96px] "
          >
            <div>
              {" "}
              {scoreList.data
                .sort((a, b) => Number(b.score) - Number(a.score))
                .map((item, key) => (
                  <p key={key}>
                    {item.username} : {parseInt(item.score)}점
                  </p>
                ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

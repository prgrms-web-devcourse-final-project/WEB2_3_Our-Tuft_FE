import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

import { topic, topicModal } from "../../../types/modal";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { useIsRoomStore } from "../../../store/roomStore";
import Modal from "../../../components/Modal/index";

export default function TopicModal({
  setIsClose,
  setTopic,
  topic,
}: {
  setIsClose: (val: boolean) => void;
  setTopic: (topic: topic) => void;
  topic: topic;
}) {
  const params = useParams();
  const { infoRoom } = useIsRoomStore();

  const [quizCategories, setQuizCategories] = useState<topicModal>();

  // useCallback을 사용해 topicData를 메모이제이션
  const topicData = useCallback(async () => {
    const response = await defaultFetch<topicModal>(`/quizzes/${infoRoom}`, {
      method: "GET",
    });
    setQuizCategories(response);
  }, [infoRoom]); // 의존성 배열에 infoRoom 추가

  const quizsetData = async () => {
    setIsClose(false);
    await defaultFetch<{
      isSuccess: true;
      code: "string";
      message: "string";
      data: "string";
    }>(`/room/${params.id}/quizzes/${topic?.quizSetId}`, {
      method: "PUT",
    });
  };

  useEffect(() => {
    topicData();
  }, [topicData]); // topicData가 변경될 때만 실행

  return (
    <Modal
      title={"주제 설정"}
      width={"xl:w-[20%] md:w-[40%] w-[70%]"}
      height={"h-[604px]"}
      setIsClose={setIsClose}
      setIsComplete={() => quizsetData()}
    >
      <div className="flex flex-col text-xl items-center bg-[var(--color-point)] xl:w-[80%] w-[85%] h-[440px] rounded-xl overflow-auto">
        {quizCategories && quizCategories.data.length > 0
          ? quizCategories.data.map((i, index) => (
              <label
                className="text-center w-full cursor-pointer hover:bg-[var(--color-second-hover)]"
                key={index}
              >
                <input
                  type="radio"
                  name="quiz-category"
                  id={`category-${index}`}
                  className="hidden peer"
                  value={i.quizSetName}
                  onChange={() => setTopic(i)}
                />
                <div
                  className={`peer-checked:bg-[var(--color-secondPoint)] text-white w-full py-6 ${
                    topic?.quizSetName.trim() === i.quizSetName.trim()
                      ? "bg-[var(--color-secondPoint)]"
                      : ""
                  }`}
                >
                  {i.quizSetName}
                </div>
              </label>
            ))
          : null}
      </div>
    </Modal>
  );
}

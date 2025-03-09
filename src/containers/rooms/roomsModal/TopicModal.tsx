"use client";

import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/index";
import { topic, topicModal } from "../../../types/modalType";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { useParams } from "next/navigation";

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

  const [quizCategories, setQuizCategories] = useState<topicModal>();
  const topicData = async () => {
    const response = await defaultFetch<topicModal>("/quizzes/SPEED", {
      method: "GET",
    });
    setQuizCategories(response);
  };

  const quizsetData = async () => {
    setIsClose(false);
    const response = await defaultFetch<{
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
  }, []);

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

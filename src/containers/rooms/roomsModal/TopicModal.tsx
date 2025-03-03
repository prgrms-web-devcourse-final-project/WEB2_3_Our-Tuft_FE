import { useState } from "react";
import Modal from "../../../components/Modal/index";

export default function TopicModal({
  setIsClose,
  setTopic,
}: {
  setIsClose: (val: boolean) => void;
  setTopic: (topic: string) => void;
}) {
  const quizCategories = [
    {
      quizCategoryId: 1,
      quizCategoryName: "과학",
    },
    {
      quizCategoryId: 2,
      quizCategoryName: "역사",
    },
    {
      quizCategoryId: 3,
      quizCategoryName: "문학",
    },
    {
      quizCategoryId: 4,
      quizCategoryName: "영화",
    },
  ];

  const [topicItem, setTopicItem] = useState<string | "">("");

  return (
    <Modal
      title={"주제 설정"}
      width={"xl:w-[20%] md:w-[40%] w-[70%]"}
      height={"h-[604px]"}
      setIsClose={setIsClose}
      setIsComplete={() => {
        setTopic?.(topicItem);
        setIsClose(false);
      }}
    >
      <div className="flex flex-col text-xl items-center bg-[var(--color-point)] xl:w-[80%] w-[85%] h-[440px] rounded-xl overflow-auto">
        {quizCategories.map((i, index) => (
          <label
            className="text-center w-full cursor-pointer hover:bg-[var(--color-second-hover)]"
            key={index}
          >
            <input
              type="radio"
              name="quiz-category"
              id={`category-${index}`}
              className="hidden peer"
              value={i.quizCategoryName}
              onChange={() => setTopicItem(i.quizCategoryName)}
            />
            <div className="peer-checked:bg-[var(--color-secondPoint)] text-white w-full py-6">
              {i.quizCategoryName}
            </div>
          </label>
        ))}
      </div>
    </Modal>
  );
}

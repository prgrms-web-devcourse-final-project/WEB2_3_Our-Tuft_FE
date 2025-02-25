import Timer from "./Timer";

export default function QuizBoard() {
  return (
    <div className="flex justify-center items-center h-66 mt-14 mb-2 2xl:h-84 bg-[var(--color-point)] drop-shadow-custom 2xl:rounded-[12px] rounded-[32px] p-3 2xl:p-6 drop-shadow-custom">
      <div className="flex flex-col gap-6 h-56 2xl:h-72 w-[97%] 2xl:w-full bg-[var(--color-second)] 2xl:rounded-[12px] rounded-[32px] 2xl:p-8 p-6 drop-shadow-custom relative">
        <div className="2xl:text-4xl text-3xl">문제 12</div>
        <div className="2xl:text-3xl text-2xl whitespace-normal">
          보험금을 노리고 퇴원하지 않는 ( ) 때문에 골치를 앓고 있다. 에서 ( ) 에
          해당하는 단어는?
        </div>
        <div className="absolute 2xl:bottom-7 bottom-5 2xl:right-7 right-5">
          <Timer />
        </div>
      </div>
    </div>
  );
}

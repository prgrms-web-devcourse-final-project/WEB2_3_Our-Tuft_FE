import Timer from "./Timer";

export default function QuizBoard() {
  return (
    <div
      className="
        flex justify-center items-center relative 
        p-3 2xl:p-6
        h-66 mt-5 mb-2 2xl:h-84 
        bg-[var(--color-point)] drop-shadow-custom 
        rounded-[32px] 2xl:rounded-[12px] 
        "
    >
      <div
        className="
          flex flex-col gap-6 
          p-6 2xl:p-8
          h-56 2xl:h-72 w-[97%] 2xl:w-full 
          bg-[var(--color-second)] drop-shadow-custom 
          rounded-[32px] 2xl:rounded-[12px] text-white 
          "
      >
        <div className="text-2xl md:text-3xl 2xl:text-4xl">문제 12</div>
        <div className="text-xl md:text-2xl 2xl:text-3xl whitespace-normal">
          보험금을 노리고 퇴원하지 않는 ( ) 때문에 골치를 앓고 있다. 에서 ( ) 에
          해당하는 단어는?
        </div>
        <div className="absolute bottom-5 2xl:bottom-7 right-5 2xl:right-7">
          <Timer />
        </div>
      </div>
    </div>
  );
}

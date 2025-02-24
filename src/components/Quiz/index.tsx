import Timer from "./Timer";

export default function Quiz() {
  return (
    <div className="flex w-[90%] h-84 bg-[var(--color-point)] drop-shadow-custom rounded-[12px] p-6 drop-shadow-custom">
      <div className="flex flex-col gap-6 h-72 w-full bg-[var(--color-second)] rounded-[12px] p-8 drop-shadow-custom relative">
        <div className="text-4xl">문제 12</div>
        <div className="text-3xl whitespace-normal">
          보험금을 노리고 퇴원하지 않는 ( ) 때문에 골치를 앓고 있다. 에서 ( ) 에
          해당하는 단어는?
        </div>
        <div className="absolute bottom-7 right-7">
          <Timer />
        </div>
      </div>
    </div>
  );
}

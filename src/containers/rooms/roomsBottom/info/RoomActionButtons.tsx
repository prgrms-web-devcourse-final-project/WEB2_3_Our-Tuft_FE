import RoundButton from "../../../../components/RoundButton";

export default function RoomActionButtons() {
  return (
    <div className="flex md:text-md lg:text-4xl cursor-pointer">
      <button className="flex-1 bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] lg:py-12 md:py-7 lg:rounded-l-[20px] md:rounded-l-[12px]">
        대기 중
      </button>
      <button className="flex-1 bg-[var(--color-amberOrange)] hover:bg-[var(--color-amberOrange-hover)] lg:rounded-r-[20px] md:rounded-r-[12px] cursor-pointer">
        준비 완료
      </button>
    </div>
  );
}

export default function RoomActionButtons() {
  return (
    <div className="flex md:text-md 2xl:text-3xl cursor-pointer">
      <button className="flex-1 bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] 2xl:py-10 md:py-7 2xl:rounded-l-[20px] md:rounded-l-[12px]">
        대기 중
      </button>
      <button className="flex-1 bg-[var(--color-amberOrange)] hover:bg-[var(--color-amberOrange-hover)] 2xl:rounded-r-[20px] md:rounded-r-[12px] cursor-pointer">
        준비 완료
      </button>
    </div>
  );
}

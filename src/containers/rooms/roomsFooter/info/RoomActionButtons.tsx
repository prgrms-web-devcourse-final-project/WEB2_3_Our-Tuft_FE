export default function RoomActionButtons() {
  return (
    <div className="flex md:text-xl xl:text-3xl text-[10px] cursor-pointer break-keep">
      <button
        className="
          hidden xl:block md:block flex-1 
          bg-[var(--color-second)] hover:bg-[var(--color-second-hover)]
          xl:py-8 py-5
          xl:rounded-l-[20px] rounded-l-[12px]"
      >
        대기 중
      </button>

      <button
        className="
          flex-1 
          bg-[var(--color-amberOrange)] hover:bg-[var(--color-amberOrange-hover)]
          xl:rounded-r-[20px] md:rounded-r-[12px] rounded-[8px]
          cursor-pointer p-2 mr-3"
      >
        준비
      </button>
    </div>
  );
}

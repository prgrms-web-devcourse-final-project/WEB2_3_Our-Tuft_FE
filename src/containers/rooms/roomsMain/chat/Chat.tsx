export default function Chat() {
  return (
    <div className="flex flex-col bg-[var(--color-point)] h-full 2xl:rounded-[32px]  md:rounded-[20px] 2xl:p-5 md:px-2 md:pb-4">
      <div className="w-full h-full "></div>
      <input
        className="w-full text-black 2xl:rounded-[20px] md:pl-3 2xl:pl-6 md:pb-2 2xl:pb-0 md:rounded-[16px] 2xl:h-14 md:h-9 bg-[#d9d9d9] placeholder:text-gray-500  md:placeholder:text-[10px] 2xl:placeholder:text-[20px]"
        placeholder="메시지를 입력하세요..."
      />
    </div>
  );
}

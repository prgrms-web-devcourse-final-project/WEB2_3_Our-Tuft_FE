export default function Chat() {
  return (
    <div
      className="
        flex flex-col bg-[var(--color-point)] 
        xl:h-full md:h-full h-[180px]
        xl:rounded-[32px] rounded-[20px] 
        xl:p-5 p-3 md:px-2 xl:pb-4 md:pb-4 "
    >
      <div className="w-full h-full "></div>
      <input
        className="
          w-full text-black bg-[#d9d9d9]  
          xl:rounded-[20px] rounded-[16px]  
          xl:pl-6 pl-3 xl:pb-0 md:pb-2 xl:h-14 h-11  
          xl:placeholder:text-[20px] placeholder:text-[14px] placeholder:text-gray-500  
          "
        placeholder="메시지를 입력하세요..."
      />
    </div>
  );
}

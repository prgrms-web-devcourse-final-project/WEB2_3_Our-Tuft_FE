export default function ChatBubble() {
  return (
    <div className="flex items-center justify-center p-4 h-34">
      <div className="relative bg-gray-200 text-black font-bold text-center break-words px-6 py-4 max-w-xs border-4 border-black shadow-[4px_4px_0px_#000] self-end">
        픽셀픽셀 스타일 말풍선 꼬리픽셀 스타일
        <div className="absolute -bottom-5 left-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-black"></div>
        <div className="absolute -bottom-3 left-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-gray-200"></div>
      </div>
    </div>
  );
}

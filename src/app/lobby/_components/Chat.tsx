export default function Chat() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* 채팅 영역 */}
      <div className="w-full h-[805px] bg-[var(--color-point)] rounded-lg"></div>

      {/* 입력 영역 */}
      <div className="w-full h-[49px] bg-white/50 rounded-lg">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className="w-full h-full px-4 rounded-2xl outline-none"
        />
      </div>
    </div>
  );
}

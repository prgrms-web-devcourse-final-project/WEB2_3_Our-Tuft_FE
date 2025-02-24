import Link from "next/link";

export default function MobileLayout() {
  return (
    <div className="lg:hidden w-full h-full min-h-screen flex flex-col gap-4 p-4">
      {/* 상단 버튼 영역 */}
      <div className="flex gap-2 justify-end">
        <button className="w-[50px] h-[50px] bg-[var(--color-second)]/90 rounded-lg">
          <img
            src="/assets/images/setting.png"
            alt="setting"
            className="w-full p-2"
          />
        </button>
        <Link
          href="/shop"
          className="w-[50px] h-[50px] bg-[var(--color-second)]/90 rounded-lg"
        >
          <img
            src="/assets/images/shop.png"
            alt="shop"
            className="w-full p-2"
          />
        </Link>
        <Link
          href="/login"
          className="w-[50px] h-[50px] bg-[var(--color-ligthRed)]/90 rounded-lg"
        >
          <img
            src="/assets/images/exit.png"
            alt="exit"
            className="w-full p-2"
          />
        </Link>
      </div>
      {/* 게임 배너 */}
      <div className="bg-[var(--color-second)]/90 rounded-xl p-4 h-[200px]"></div>
      {/* 방 목록 */}
      <div className="bg-[var(--color-second)]/90 rounded-xl p-4 flex-grow"></div>
      {/* 채팅 */}
      <div className="bg-[var(--color-second)]/90 rounded-xl p-4 h-[200px]"></div>
    </div>
  );
}

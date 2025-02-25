import Link from "next/link";
import Image from "next/image";

export default function MobileLayout() {
  return (
    <div className="block md:hidden w-full h-full min-h-screen flex flex-col gap-4 p-4">
      {/* 상단 버튼 영역 */}
      <div className="flex gap-2 justify-end">
        <button className="w-[50px] h-[50px] bg-[var(--color-second)]/90 rounded-lg">
          <Image
            src="/assets/images/setting.png"
            alt="setting"
            width={50}
            height={50}
            className="w-full p-2"
          />
        </button>
        <Link
          href="/shop"
          className="w-[50px] h-[50px] bg-[var(--color-second)]/90 rounded-lg"
        >
          <Image
            src="/assets/images/shop.png"
            alt="shop"
            width={50}
            height={50}
            className="w-full p-2"
          />
        </Link>
        <Link
          href="/login"
          className="w-[50px] h-[50px] bg-[var(--color-lightRed)]/90 rounded-lg"
        >
          <Image
            src="/assets/images/exit.png"
            alt="exit"
            width={50}
            height={50}
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

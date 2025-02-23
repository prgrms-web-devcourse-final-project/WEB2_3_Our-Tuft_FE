import Link from "next/link";

export default function ButtonGroup() {
  return (
    <div className="h-[8.21%] flex gap-2">
      {/* 설정 버튼 */}
      <button className="w-[112px] h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-2xl drop-shadow-custom flex items-center justify-center cursor-pointer transition-all">
        <img
          src="/assets/images/setting.png"
          alt="setting"
          className="w-[40px] h-[40px]"
        />
      </button>
      {/* 상점 버튼 */}
      <Link
        href="/shop"
        className="w-[112px] h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-2xl drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
      >
        <img
          src="/assets/images/shop.png"
          alt="shop"
          className="w-[40px] h-[40px]"
        />
      </Link>
      {/* 로그아웃 버튼 */}
      <Link
        href="/login"
        className="w-[112px] h-full bg-[var(--color-ligthRed)]/90 hover:bg-[var(--color-ligthRed-hover)]/90 rounded-2xl drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
      >
        <img
          src="/assets/images/exit.png"
          alt="exit"
          className="w-[40px] h-[40px]"
        />
      </Link>
    </div>
  );
}

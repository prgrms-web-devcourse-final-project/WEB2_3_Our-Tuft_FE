import Link from "next/link";
import Image from "next/image";

export default function ButtonGroup() {
  return (
    <div className="h-[8.21%] flex gap-2">
      {/* 설정 버튼 */}
      <button className="w-[112px] md:w-[84px] lg:w-[112px] h-full md:h-[70px] lg:h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-2xl drop-shadow-custom flex items-center justify-center cursor-pointer transition-all">
        <Image
          src="/assets/images/setting.png"
          alt="setting"
          width={40}
          height={40}
          className="w-[40px] h-[40px] md:w-[30px] md:h-[30px] lg:w-[40px] lg:h-[40px]"
        />
      </button>
      {/* 상점 버튼 */}
      <Link
        href="/shop"
        className="w-[112px] md:w-[84px] lg:w-[112px] h-full md:h-[70px] lg:h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-2xl drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
      >
        <Image
          src="/assets/images/shop.png"
          alt="shop"
          width={40}
          height={40}
          className="w-[40px] h-[40px] md:w-[30px] md:h-[30px] lg:w-[40px] lg:h-[40px]"
        />
      </Link>
      {/* 로그아웃 버튼 */}
      <Link
        href="/login"
        className="w-[112px] md:w-[84px] lg:w-[112px] h-full md:h-[70px] lg:h-full bg-[var(--color-lightRed)]/90 hover:bg-[var(--color-lightRed-hover)]/90 rounded-2xl drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
      >
        <Image
          src="/assets/images/exit.png"
          alt="exit"
          width={40}
          height={40}
          className="w-[40px] h-[40px] md:w-[30px] md:h-[30px] lg:w-[40px] lg:h-[40px]"
        />
      </Link>
    </div>
  );
}

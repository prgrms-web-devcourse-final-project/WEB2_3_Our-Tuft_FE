import Link from "next/link";
import Image from "next/image";

export default function ButtonGroup() {
  return (
    <div className="h-full w-full flex gap-2">
      {/* 설정 버튼 */}
      <button className="flex-1 h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all">
        <Image
          src="/assets/images/setting.png"
          alt="setting"
          width={40}
          height={40}
          className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]"
        />
      </button>
      {/* 상점 버튼 */}
      <Link
        href="/shop"
        className="flex-1 h-full bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
      >
        <Image
          src="/assets/images/shop.png"
          alt="shop"
          width={40}
          height={40}
          className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]"
        />
      </Link>
      {/* 로그아웃 버튼 */}
      <Link
        href="/login"
        className="flex-1 h-full bg-[var(--color-lightRed)]/90 hover:bg-[var(--color-lightRed-hover)]/90 rounded-lg sm:rounded-xl md:rounded-2xl p-2 drop-shadow-custom flex items-center justify-center cursor-pointer transition-all"
      >
        <Image
          src="/assets/images/exit.png"
          alt="exit"
          width={40}
          height={40}
          className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]"
        />
      </Link>
    </div>
  );
}

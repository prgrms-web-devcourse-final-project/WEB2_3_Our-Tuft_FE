import Image from "next/image";
import close from "@/assets/icons/close.svg";
import Link from "next/link";

export default function CloseButton() {
  return (
    <Link
      href="/lobby"
      className="bg-[var(--color-ligthRed)] lg:p-4 md:p-2 lg:rounded-[12px] md:rounded-[8px]"
    >
      <Image
        src={close}
        alt="닫기 아이콘"
        className="lg:w-4 lg:h-4 md:w-3 md:h-3"
      />
    </Link>
  );
}

import Image from "next/image";
import close from "@/assets/icons/close.svg";
import Link from "next/link";

export default function CloseButton() {
  return (
    <Link
      href="/lobby"
      className="bg-[var(--color-ligthRed)] p-4 rounded-[10px]"
    >
      <Image src={close} alt="닫기 아이콘" className="w-5 h-5" />
    </Link>
  );
}

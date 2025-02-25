import Image from "next/image";
import close from "@/assets/icons/close.svg";
import Link from "next/link";

export default function CloseButton() {
  return (
    <Link
      href="/lobby"
<<<<<<< Updated upstream:src/components/CloseButton/CloseButton.tsx
      className="bg-[var(--color-ligthRed)] hover:bg-[var(--color-ligthRed-hover)] lg:p-4 md:p-2 lg:rounded-[12px] md:rounded-[8px]"
=======
      className="bg-[var(--color-lightRed)] lg:p-4 md:p-2 lg:rounded-[12px] md:rounded-[8px]"
>>>>>>> Stashed changes:src/components/Button/CloseButton.tsx
    >
      <Image
        src={close}
        alt="닫기 아이콘"
        className="lg:w-4 lg:h-4 md:w-3 md:h-3"
      />
    </Link>
  );
}

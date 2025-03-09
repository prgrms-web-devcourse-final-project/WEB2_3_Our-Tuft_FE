import Image from "next/image";
import close from "@/assets/icons/close.svg";
import Link from "next/link";
import { unsubscribeFromTopic } from "../../service/api/socketConnection";
import { useParams } from "next/navigation";

export default function CloseButton({ url }: { url?: string }) {
  const params = useParams();
  return (
    <Link
      // onClick={() => unsubscribeFromTopic(`/topic/room/${params.id}`)}
      href={url || ""}
      className="bg-[var(--color-lightRed)] hover:bg-[var(--color-lightRed-hover)] 2xl:p-4 p-2 2xl:rounded-[12px] rounded-[8px]"
    >
      <Image
        src={close}
        alt="닫기 아이콘"
        className="2xl:w-4 2xl:h-4 w-4 h-4"
      />
    </Link>
  );
}

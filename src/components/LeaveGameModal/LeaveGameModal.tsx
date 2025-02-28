import Image from "next/image";

import info from "@/assets/icons/info.svg";
import { useRouter } from "next/navigation";
import Modal from "../Modal";

export default function LeaveGameModal({
  setIsClose,
}: {
  setIsClose: (val: boolean) => void;
}) {
  const router = useRouter();

  return (
    <Modal
      title={"나가기"}
      width={"xl:w-[788px] md:w-[60%] w-[80%]"}
      height={"h-[268px]"}
      setIsClose={setIsClose}
      setIsComplete={() => router.push("/lobby")}
    >
      <div
        className="
          flex items-center justify-center bg-[var(--color-point)] 
          xl:text-xl text-md 
          xl:w-[707px] w-[80%] h-[96px] rounded-xl"
      >
        <Image src={info} alt="경고 아이콘" className="xl:h-32 h-16" />
        <div className="text-white">게임에서 나가시겠습니까?</div>
      </div>
    </Modal>
  );
}

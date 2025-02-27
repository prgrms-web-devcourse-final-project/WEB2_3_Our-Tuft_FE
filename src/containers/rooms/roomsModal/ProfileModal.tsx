import Modal from "../../../components/Modal";
import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";

export default function ProfileModal({
  setIsClose,
}: {
  setIsClose: (val: boolean) => void;
}) {
  return (
    <Modal
      title={"프로필"}
      width={"xl:w-[788px] md:w-[60%] w-[80%]"}
      height={"h-[450]"}
      setIsClose={setIsClose}
    >
      <div className="flex xl:px-16 xl:gap-7 gap-3 xl:w-[90%] w-[80%]">
        <Image
          src={dummy}
          alt="아이콘"
          className="xl:w-3xs w-[50%] rounded-[16px] object-cover"
        />
        <div className="flex flex-col xl:gap-5 gap-3 w-full">
          <div className="flex items-center justify-center xl:text-xl text-lg bg-[var(--color-point)] w-full h-[60px] rounded-xl">
            닉네임
          </div>
          <div className="flex items-center justify-center xl:text-xl text-lg bg-[var(--color-point)] w-full h-[180px] rounded-xl">
            자기소개
          </div>
        </div>
      </div>
    </Modal>
  );
}

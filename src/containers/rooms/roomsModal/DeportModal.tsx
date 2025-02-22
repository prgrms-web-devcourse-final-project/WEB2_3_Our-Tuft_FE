import React from "react";
import Modal from "../../../components/Modal/index";
import Image from "next/image";

import info from "@/assets/icons/info.svg";

export default function DeportModal({
  isClose,
}: {
  isClose: (val: boolean) => void;
}) {
  return (
    <Modal
      title={"알림창"}
      width={"w-[788px]"}
      height={"h-[268px]"}
      isClose={isClose}
    >
      <div className="flex items-center justify-center text-2xl bg-[var(--color-point)] w-[707px] h-[96px] rounded-xl">
        <Image src={info} alt="경고 아이콘" className="lg:h-32" />
        <div>유저 님을 강퇴 하시겠습니까 ?</div>
      </div>
    </Modal>
  );
}

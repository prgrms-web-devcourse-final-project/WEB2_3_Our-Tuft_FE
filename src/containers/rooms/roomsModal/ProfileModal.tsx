import React from "react";
import Modal from "../../../components/Modal/Modal";
import Image from "next/image";
import dummy from "@/assets/images/dummy.svg";

export default function ProfileModal() {
  return (
    <Modal title={"프로필"} width={"w-[788px]"} height={"h-[450]"}>
      <div className="flex px-16 gap-7">
        <Image
          src={dummy}
          alt="아이콘"
          className="w-3xs rounded-[16px] object-cover"
        />
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center text-2xl bg-[var(--color-point)] w-[400px] h-[60px] rounded-xl">
            닉네임
          </div>
          <div className="flex items-center justify-center text-2xl bg-[var(--color-point)] w-[400px] h-[180px] rounded-xl">
            자기소개
          </div>
        </div>
      </div>
    </Modal>
  );
}

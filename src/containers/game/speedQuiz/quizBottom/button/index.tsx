"use client";
import { useState } from "react";
import LeaveGameModal from "../../quizModal/LeaveGameModal";
import RoundButton from "../../../../../components/RoundButton";

export default function Button() {
  const [isOpen, setOpenLeave] = useState<boolean>(false);
  return (
    <div className="flex gap-7 text-2xl items-center">
      <RoundButton
        width={"w-[207px]"}
        height={"h-[71px]"}
        bgColor={"bg-[var(--color-point)]"}
        text={"설정"}
        className={"hover:bg-[var(--color-point-hover)]"}
      />
      <RoundButton
        width={"w-[207px]"}
        height={"h-[71px]"}
        bgColor={"bg-[var(--color-ligthRed)]"}
        text={"나가기"}
        className={"hover:bg-[var(--color-ligthRed-hover)]"}
        onClick={() => setOpenLeave(true)}
      />
      {isOpen && <LeaveGameModal setIsClose={setOpenLeave} />}
    </div>
  );
}

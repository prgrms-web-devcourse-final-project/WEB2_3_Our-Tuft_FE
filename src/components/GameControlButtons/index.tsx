"use client";
import { useState } from "react";
import RoundButton from "../../components/RoundButton";
import LeaveGameModal from "../LeaveGameModal/LeaveGameModal";

export default function GameControlButtons() {
  const [isOpen, setOpenLeave] = useState<boolean>(false);
  return (
    <div className="flex 2xl:gap-3 gap-1 text-2xl items-center">
      <RoundButton
        width={"w-full"}
        height={"xl:h-[70px] md:h-[55px] h-[50px]"}
        bgColor={"bg-[var(--color-second)]"}
        text={"설정"}
        className={"hover:bg-[var(--color-point-hover)]"}
        url={"/assets/icons/setting.svg"}
      />
      <RoundButton
        width={"w-full"}
        height={"xl:h-[70px] md:h-[55px] h-[50px]"}
        bgColor={"bg-[var(--color-lightRed)]"}
        text={"나가기"}
        className={"hover:bg-[var(--color-ligthRed-hover)]"}
        url={"/assets/icons/exit.svg"}
        onClick={() => setOpenLeave(true)}
      />
      {isOpen && <LeaveGameModal setIsClose={setOpenLeave} />}
    </div>
  );
}

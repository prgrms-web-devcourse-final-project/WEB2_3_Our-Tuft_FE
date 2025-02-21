"use client";
import RoomsMain from "./roomsMain";
import RoomsBottom from "./roomsBottom";
import RoomsHeader from "./roomsHeader";
import { useModalStore } from "../../store/modalStore";
import DeportModal from "./roomsModal/DeportModal";
import ProfileModal from "./roomsModal/ProfileModal";
import TopicModal from "./roomsModal/TopicModal";
import MenuModal from "./roomsModal/MenuModal";

export default function RoomsContainer() {
  const { modal } = useModalStore();
  return (
    <>
      <div
        className="flex flex-col w-full min-h-screen h-full items-center justify-center px-14 bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <RoomsHeader />
        <RoomsMain />
        <RoomsBottom />
      </div>
      {modal === "deport" ? <DeportModal /> : null}
      {modal === "profile" ? <ProfileModal /> : null}
      {modal === "topic" ? <TopicModal /> : null}
      {modal === "menu" ? <MenuModal /> : null}
    </>
  );
}

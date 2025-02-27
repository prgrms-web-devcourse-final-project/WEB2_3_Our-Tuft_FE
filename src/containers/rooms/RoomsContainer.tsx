"use client";
import RoomsMain from "./roomsMain";
import RoomsFooter from "./roomsFooter";
import RoomsHeader from "./roomsHeader";
import Chat from "./roomsMain/chat/Chat";

export default function RoomsContainer() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-center bg-cover bg-repeat"
      style={{ backgroundImage: "url('/assets/images/bg.png')" }}
    >
      <div className="w-[90vw]">
        <RoomsHeader />
        <RoomsMain />
        <RoomsFooter />
        <div className="xl:hidden md:hidden block mt-2">
          <Chat />
        </div>
      </div>
    </div>
  );
}

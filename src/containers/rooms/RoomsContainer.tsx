"use client";
import RoomsMain from "./roomsMain";
import RoomsFooter from "./roomsFooter";
import RoomsHeader from "./roomsHeader";

export default function RoomsContainer() {
  return (
    <>
      <div
        className="flex flex-col w-full min-h-screen h-full items-center justify-center px-14 bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <RoomsHeader />
        <RoomsMain />
        <RoomsFooter />
      </div>
    </>
  );
}

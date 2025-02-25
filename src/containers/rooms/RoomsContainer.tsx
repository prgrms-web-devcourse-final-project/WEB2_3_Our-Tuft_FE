"use client";
import RoomsMain from "./roomsMain";
import RoomsFooter from "./roomsFooter";
import RoomsHeader from "./roomsHeader";

export default function RoomsContainer() {
  return (
    <>
      <div
        className="w-full min-h-screen flex items-center justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="w-[90vw] h-[90vh]">
          <RoomsHeader />
          <RoomsMain />
          <RoomsFooter />
        </div>
      </div>
    </>
  );
}

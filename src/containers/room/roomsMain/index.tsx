import React from "react";
import UserList from "./user/UserList";
import Chat from "./chat/Chat";

export default function RoomsMain() {
  return (
    <div className="flex lg:gap-9 md:gap-5 py-7 w-full drop-shadow-custom">
      <div className="flex-3">
        <UserList />
      </div>
      <div className="flex-1">
        <Chat />
      </div>
    </div>
  );
}

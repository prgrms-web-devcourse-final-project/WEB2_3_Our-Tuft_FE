import UserList from "./user/UserList";
import Chat from "./chat/Chat";
import { Dispatch, SetStateAction, useState } from "react";
import { roomUserListData } from "../../../types/roomType";

export default function RoomsMain() {
  const [userList, setUserList] = useState<roomUserListData>();

  return (
    <div className="relative flex xl:gap-9 md:gap-5 pt-3  xl:pb-3 md:pb-3 w-full drop-shadow-custom">
      <div className="flex-3 h-full">
        {userList && <UserList userList={userList} />}
      </div>
      <div
        className="
          -bottom-60 w-full
          flex-1 xl:static md:static absolute 
          xl:block md:block"
      >
        {setUserList && userList && (
          <Chat setUserList={setUserList} userList={userList} />
        )}
      </div>
    </div>
  );
}

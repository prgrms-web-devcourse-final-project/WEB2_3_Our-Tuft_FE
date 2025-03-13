import UserList from "./user/UserList";
import Chat from "./chat/Chat";
import { useState } from "react";
import {
  playerData,
  roomInfoData,
  roomPlayListData,
  roomUserListData,
} from "../../../types/Room";

export default function RoomsMain({ roomInfo }: { roomInfo: roomInfoData }) {
  const [userList, setUserList] = useState<roomUserListData>();
  const [playList, setPlayList] = useState<playerData>();

  return (
    <div className="relative flex xl:gap-9 md:gap-5 pt-3  xl:pb-3 md:pb-3 w-full drop-shadow-custom">
      <div className="flex-3 h-full">
        {userList && playList && (
          <UserList userList={userList} playList={playList} />
        )}
      </div>
      <div
        className="
          -bottom-60 w-full
          flex-1 xl:static md:static absolute 
          xl:block md:block"
      >
        <Chat
          setUserList={setUserList}
          setPlayList={setPlayList}
          roomInfo={roomInfo.data.gameType}
        />
      </div>
    </div>
  );
}

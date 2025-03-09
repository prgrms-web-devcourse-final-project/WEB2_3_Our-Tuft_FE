"use client";

import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import DeportModal from "../../roomsModal/DeportModal";
import MenuModal from "../../roomsModal/MenuModal";
import ProfileModal from "../../roomsModal/ProfileModal";
import { roomUserList, roomUserListData } from "../../../../types/roomType";
import { defaultFetch } from "../../../../service/api/defaultFetch";
import { useIsRoomStore } from "../../../../store/roomStore";

export default function UserList({ userList }: { userList: roomUserListData }) {
  const { setIsHost, isHost, setAsAllReady, isAllReady } = useIsRoomStore();

  const [user, setUser] = useState<roomUserList>();
  const [isOpenDeport, setOpenDeport] = useState<boolean>(false);
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
  const [isOpenProfile, setOpenProfile] = useState<boolean | undefined>(
    undefined
  );
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    setOpenMenu(true);
  };

  const deportUser = (userId: string) => {
    defaultFetch(`/rooms/${userId}/deport`, { method: "PUT" });
  };

  const handleHostModal = (userInfo: roomUserList) => {
    setUser(userInfo);
    if (isHost && userInfo.userId !== userList?.data.hostId + "") {
      setOpenDeport(true);
    }
  };

  const storedUserId = sessionStorage.getItem("userId");
  useEffect(() => {
    setIsHost(Number(userList.data.hostId) === Number(storedUserId));
    console.log(
      "host",
      isHost,
      Number(userList.data.hostId),
      Number(storedUserId)
    );
  }, []);

  useEffect(() => {
    const hasNoReadyUsers = userList?.data.dto.some(
      (user) => user.isReady === "false"
    );
    setAsAllReady(!hasNoReadyUsers);
  }, [userList]);
  return (
    <div
      className="
        xl:grid md:grid xl:grid-cols-4 md:grid-cols-3 flex flex-col 
        xl:gap-8 md:gap-2 gap-3 
        bg-[var(--color-second)] 
        xl:p-6 md:p-6 p-3
        xl:h-[800px] md:h-[940px] h-[50vh] 
        xl:overflow-visible md:overflow-visible overflow-y-scroll         
        xl:rounded-[32px] rounded-[20px] 
        "
    >
      {userList?.data.dto.map((i, index) => (
        <div
          className="h-auto max-h-fit"
          onClick={() => handleHostModal(i)}
          onContextMenu={handleContextMenu}
          key={index}
        >
          <UserCard
            nickName={i.username}
            isReady={i.isReady}
            host={Number(i.userId) === Number(userList?.data.hostId)}
          >
            <div
              className={`absolute xl:static md:static
                ${i.isReady === "true" ? "text-[#993000]" : "text-white"}  
                ${
                  Number(i.userId) === Number(userList?.data.hostId)
                    ? "bg-[var(--color-main)]"
                    : i.isReady === "true"
                    ? "bg-[var(--color-amberOrange)]"
                    : "bg-[var(--color-point)]"
                }  
                xl:text-2xl md:text-xl 
                xl:py-5 md:py-3 py-0 
                md:w-full md:text-center`}
            >
              {i.userId === userList?.data.hostId + ""
                ? "방장"
                : i.isReady === "true"
                ? "준비완료"
                : "대기중"}
            </div>
          </UserCard>
        </div>
      ))}

      {isOpenDeport && user && (
        <DeportModal
          nickName={user.username}
          setIsClose={setOpenDeport}
          setIsComplete={() => deportUser(user?.userId)}
        />
      )}
      {isOpenMenu && (
        <MenuModal
          setIsClose={setOpenMenu}
          position={position}
          openProfileModal={setOpenProfile}
        />
      )}
      {isOpenProfile && <ProfileModal setIsClose={setOpenProfile} />}
    </div>
  );
}

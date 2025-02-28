"use client";

import { useState } from "react";
import DeportModal from "../../roomsModal/DeportModal";
import MenuModal from "../../roomsModal/MenuModal";
import ProfileModal from "../../roomsModal/ProfileModal";
import UserCard from "./UserCard";

export default function UserList() {
  const [nickName, setNicKName] = useState<string>("");
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

  const data = {
    players: [
      "호랑이",
      "독수리",
      "고양이",
      "늑대",
      "여우",
      "판다",
      "드래곤",
      "사자",
    ],
  };

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
      {data.players.map((i, index) => (
        <div
          className="h-auto max-h-fit"
          onClick={() => {
            setOpenDeport(true);
            setNicKName(i);
          }}
          onContextMenu={handleContextMenu}
          key={index}
        >
          <UserCard nickName={i}>
            <div
              className="
                absolute xl:static md:static 
                text-[#993000] 
                bg-[var(--color-amberOrange)]  
                xl:text-2xl md:text-xl 
                xl:py-5 md:py-3 py-0 
                md:w-full md:text-center"
            >
              준비완료
            </div>
          </UserCard>
        </div>
      ))}

      {isOpenDeport && (
        <DeportModal nickName={nickName} setIsClose={setOpenDeport} />
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

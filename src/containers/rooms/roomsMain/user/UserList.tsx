"use client";

import { useState } from "react";
import DeportModal from "../../roomsModal/DeportModal";
import MenuModal from "../../roomsModal/MenuModal";
import ProfileModal from "../../roomsModal/ProfileModal";
import UserCard from "./UserCard";

export default function UserList() {
  const [isOpenDeport, setOpenDeport] = useState<boolean>(false);
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
  const [isOpenProfile, setOpenProfile] = useState<boolean>(false);

  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    setOpenMenu(true);
  };

  return (
    <div
      className="
        grid xl:grid-cols-4 md:grid-cols-3 grid-row 
        bg-[var(--color-second)] p-3
        xl:gap-8 md:gap-2 gap-3 
        xl:rounded-[32px] rounded-[20px] 
        h-[50vh] overflow-y-scroll 
        md:h-auto md:overflow-visible 
        xl:h-auto xl:overflow-visible
        "
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
        <div
          onClick={() => setOpenDeport(true)}
          onContextMenu={handleContextMenu}
          key={index}
        >
          <UserCard>
            <div
              className="
                absolute xl:static md:static 
                xl:text-2xl md:text-xl 
                xl:py-5 md:py-3 py-0 
                text-[#993000] 
                bg-[var(--color-amberOrange)]  
                md:w-full md:text-center"
            >
              준비완료
            </div>
          </UserCard>
        </div>
      ))}

      {isOpenDeport && <DeportModal setIsClose={setOpenDeport} />}
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

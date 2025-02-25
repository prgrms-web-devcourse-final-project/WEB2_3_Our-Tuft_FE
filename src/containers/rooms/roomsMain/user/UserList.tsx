"use client";
import { useState } from "react";
import DeportModal from "../../roomsModal/DeportModal";
import MenuModal from "../../roomsModal/MenuModal";
import ProfileModal from "../../roomsModal/ProfileModal";
import UserCard from "../../../../components/UserCard";

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
    <div className="grid grid-cols-4 lg:gap-8 md:gap-3 lg:rounded-[32px] md:rounded-[20px] bg-[var(--color-second)] p-7">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <div
          onClick={() => setOpenDeport(true)}
          onContextMenu={handleContextMenu}
          key={index}
        >
          <UserCard>
            <div className="bg-[var(--color-amberOrange)] justify-center text-[#993000] lg:py-5 md:py-2 lg:text-2xl md:text-sm md:font-bold">
              준비 완료
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

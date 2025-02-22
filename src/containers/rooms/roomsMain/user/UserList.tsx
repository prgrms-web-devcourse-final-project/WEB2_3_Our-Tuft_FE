"use client";
import { useState } from "react";
import UserCard from "./UserCard";
import DeportModal from "../../roomsModal/DeportModal";
import MenuModal from "../../roomsModal/MenuModal";
import ProfileModal from "../../roomsModal/ProfileModal";

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
    console.log(event.clientX, event.clientY);
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
          <UserCard />
        </div>
      ))}
      {isOpenDeport && <DeportModal isClose={setOpenDeport} />}
      {isOpenMenu && (
        <MenuModal
          isClose={setOpenMenu}
          position={position}
          profileOpen={setOpenProfile}
        />
      )}
      {isOpenProfile && <ProfileModal isClose={setOpenProfile} />}
    </div>
  );
}

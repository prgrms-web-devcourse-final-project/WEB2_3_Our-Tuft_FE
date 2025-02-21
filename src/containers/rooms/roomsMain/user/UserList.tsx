import { useState } from "react";
import { useModalStore } from "../../../../store/modalStore";
import UserCard from "./UserCard";

export default function UserList() {
  const { isOpen, setPosition } = useModalStore();

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setPosition?.({ x: event.clientX, y: event.clientY });
    isOpen("menu");
  };

  return (
    <div className="grid grid-cols-4 lg:gap-8 md:gap-3 lg:rounded-[32px] md:rounded-[20px] bg-[var(--color-second)] p-7">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <div
          onClick={() => isOpen("deport")}
          onContextMenu={handleContextMenu}
          key={index}
        >
          <UserCard />
        </div>
      ))}
    </div>
  );
}

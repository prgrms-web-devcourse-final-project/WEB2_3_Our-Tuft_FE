import React from "react";

interface User {
  name: string;
}

interface UserListProps {
  paddedUsers: User[];
  correctUsers: number[];
}

export default function UserList({ paddedUsers, correctUsers }: UserListProps) {
  return (
    <>
      {paddedUsers.map((user, index) =>
        user && user.name !== "" ? (
          <div
            key={index}
            className={`${
              correctUsers.includes(index)
                ? "bg-[var(--color-amberOrange)]/90"
                : "bg-[var(--color-point)]/90"
            } text-white flex items-center justify-center rounded-xl text-xs sm:text-base md:text-lg `}
          >
            {/* 임시 (참가자 users 배열의 name) */}
            {user.name}
          </div>
        ) : (
          <div key={index} className="bg-transparent"></div> // 빈 칸으로 처리
        )
      )}
    </>
  );
}

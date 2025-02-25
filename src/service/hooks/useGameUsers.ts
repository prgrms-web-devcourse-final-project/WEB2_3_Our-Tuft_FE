"use client";

import { useState, useMemo } from "react";

export function useGameUsers() {
  const [users] = useState<{ id: string; name: string }[]>([
    { id: "user1", name: "사용자1" },
    { id: "user2", name: "사용자2" },
    { id: "user3", name: "사용자3" },
    { id: "user4", name: "사용자4" },
    { id: "user5", name: "사용자5" },
    { id: "user6", name: "사용자6" },
    { id: "user7", name: "사용자7" },
    { id: "user8", name: "사용자8" },
  ]);
  // 정답을 맞춘 유저를 관리하는 상태 (정답을 맞춘 유저의 인덱스를 저장)
  const [correctUsers, setCorrectUsers] = useState<number[]>([]);
  // const socketRef = useRef<WebSocket | null>(null);

  const handleCorrectAnswer = (index: number) => {
    setCorrectUsers((prev) => [...prev, index]);
  };

  // 유저 리스트를 메모이제이션, users 배열이 바뀔 때만 새로 계산
  const paddedUsers = useMemo(() => {
    return [...users, ...Array(8 - users.length).fill({ id: "", name: "" })];
  }, [users]);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   // WebSocket 연결 (한 번만 실행)
  //   socketRef.current = new WebSocket("ws://websocket-url");

  //   socketRef.current.onmessage = (event) => {
  //     const newUserData = JSON.parse(event.data);
  //     setUsers(newUserData);
  //   };

  //   socketRef.current.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   return () => {
  //     socketRef.current?.close(); // 컴포넌트 언마운트 시 소켓 종료
  //   };
  // }, []); // 한 번만 실행

  // // 유저가 추가되거나 변경될 때 상태 업데이트하는 함수
  // const updateUser = useCallback((newUser: string) => {
  //   setUsers((prevUsers) => [...prevUsers, newUser]);
  // }, []);

  // // 유저가 퇴장했을 때 상태 업데이트하는 함수
  // const removeUser = useCallback((userId: string) => {
  //   setUsers((prevUsers) => prevUsers.filter((user) => user !== userId));
  // }, []);

  return {
    users,
    paddedUsers,
    correctUsers,
    handleCorrectAnswer,
    // updateUser,
    // removeUser,
  };
}

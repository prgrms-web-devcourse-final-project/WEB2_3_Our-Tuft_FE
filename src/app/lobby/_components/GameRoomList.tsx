import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import GameRoomItem from "./GameRoomItem";
import CreateRoomModal from "./CreateRoomModal";
import PasswordModal from "./PasswordModal";
import { defaultFetch } from "../../../service/api/defaultFetch";
import {
  socketConnection,
  subscribeToTopic,
  unsubscribeFromTopic,
} from "../../../service/api/socketConnection";
import { useLoginStore } from "../../../store/store";
import { useRouter } from "next/navigation";

interface GameRoomListProps {
  roomsData?: Room[];
}

// 방 정보 인터페이스 정의
interface Room {
  roomId: number;
  roomName: string;
  round: number;
  hostId: number;
  disclosure: boolean;
  gameType: "SPEED" | "OX";
  time?: number; // 시간 제한
  maxUsers?: number; // 최대 인원수
  currentPlayer?: number; // 현재 인원수
  gameRunning?: boolean; // 게임 진행 중 여부
}

// API 응답 인터페이스 정의
interface ApiResponse {
  isSuccess: boolean;
  message?: string;
  data: Room[];
}

// 웹소켓 메시지 인터페이스 정의
interface WebSocketRoomMessage {
  type: "ROOM_LIST" | "ROOM_CREATED" | "ROOM_UPDATED" | "ROOM_DELETED";
  data: Room | Room[] | number; // 메시지 타입에 따라 다른 데이터 형식
}

export default function GameRoomList({ roomsData }: GameRoomListProps) {
  // 토큰 가져오기
  const { token } = useLoginStore();

  // 상태 변수 선언
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("전체");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("방 제목");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // 게임 모드와 검색 타입 배열
  const gameModes = ["전체", "스피드 퀴즈", "OX 퀴즈"];
  const searchTypes = ["방 제목", "방 번호"];

  // 드롭다운과 필터 드롭다운을 위한 ref
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);

    // 소켓 연결 초기화
    socketConnection(token ?? undefined);

    // 로비 메시지 핸들러
    const handleLobbyMessage = (message: WebSocketRoomMessage) => {
      console.log("로비 메시지 수신:", message);

      switch (message.type) {
        case "ROOM_LIST":
          // 전체 방 목록 업데이트
          if (Array.isArray(message.data)) {
            setRooms(message.data as Room[]);
            setLoading(false);
          }
          break;

        case "ROOM_CREATED":
          // 새 방 추가
          if (!Array.isArray(message.data)) {
            setRooms((prevRooms) => [...prevRooms, message.data as Room]);
          }
          break;

        case "ROOM_UPDATED":
          // 방 정보 업데이트
          if (!Array.isArray(message.data)) {
            const updatedRoom = message.data as Room;
            setRooms((prevRooms) =>
              prevRooms.map((room) =>
                room.roomId === updatedRoom.roomId ? updatedRoom : room
              )
            );
          }
          break;

        case "ROOM_DELETED":
          // 방 삭제
          const roomId = message.data as number;
          setRooms((prevRooms) =>
            prevRooms.filter((room) => room.roomId !== roomId)
          );
          break;

        default:
          console.warn("처리되지 않은 메시지 타입:", message.type);
      }
    };

    // 로비 구독
    subscribeToTopic("/topic/room/lobby", handleLobbyMessage);

    // 초기 방 목록을 요청하기 위해 서버에 직접 API 호출
    // 웹소켓에서 초기 데이터를 받기 전에 보여줄 데이터를 위함
    const fetchInitialRooms = async () => {
      try {
        const data = await defaultFetch<ApiResponse>("/lobbies/rooms");
        if (data.isSuccess) {
          setRooms(data.data);
        } else {
          throw new Error(data.message || "데이터를 불러오는데 실패했습니다");
        }
      } catch (err) {
        console.error("Error fetching initial rooms:", err);
        setError(
          err instanceof Error
            ? err.message
            : "방 목록을 불러오는데 실패했습니다"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInitialRooms();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribeFromTopic("/topic/room/lobby");
    };
  }, [token]);

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
      setLoading(false);
    }
  }, [roomsData]);

  // 클릭 시 드롭다운을 닫기 위한 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 방 목록 새로고침 함수
  const refreshRooms = async () => {
    setLoading(true);
    try {
      const data = await defaultFetch<ApiResponse>("/lobbies/rooms");
      if (data.isSuccess) {
        setRooms(data.data);
        setError(null);
      } else {
        throw new Error(data.message || "데이터를 불러오는데 실패했습니다");
      }
    } catch (err) {
      console.error("방 목록 새로고침 실패:", err);
      setError(
        err instanceof Error ? err.message : "방 목록을 불러오는데 실패했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

  // 게임 모드에 따라 필터링된 방 목록 구하기
  const getFilteredRooms = () => {
    let filteredRooms = [...rooms];

    // 게임 타입 필터링
    if (selectedMode !== "전체") {
      const modeMap: Record<string, string> = {
        "스피드 퀴즈": "SPEED",
        "OX 퀴즈": "OX",
      };
      filteredRooms = filteredRooms.filter(
        (room) => room.gameType === modeMap[selectedMode]
      );
    }

    // 검색어 필터링
    if (searchQuery) {
      if (selectedFilter === "방 제목") {
        filteredRooms = filteredRooms.filter((room) =>
          room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (selectedFilter === "방 번호") {
        filteredRooms = filteredRooms.filter((room) =>
          room.roomId.toString().includes(searchQuery)
        );
      }
    }

    return filteredRooms;
  };

  // 방 클릭 핸들러 수정
  const handleRoomClick = (room: Room, e: React.MouseEvent) => {
    e.preventDefault(); // 기본 링크 동작 방지

    // 방이 꽉 찼는지 확인
    const isFull =
      room.currentPlayer !== undefined &&
      room.maxUsers !== undefined &&
      room.currentPlayer >= room.maxUsers;

    // 게임 진행 중이거나 방이 가득 찬 경우 접근 불가
    if (room.gameRunning || isFull) {
      if (room.gameRunning) {
        console.log("게임이 이미 진행 중인 방입니다.");
      } else if (isFull) {
        console.log("방이 가득 찼습니다.");
      }
      return; // 함수 종료하여 클릭 동작 차단
    }

    // 정상적인 방 접근 처리
    if (room.disclosure) {
      // 공개방은 바로 이동
      router.push(`/lobby/rooms/${room.roomId}?password=true`);
    } else {
      // 비공개방은 비밀번호 모달 표시
      setSelectedRoom(room);
      setIsPasswordModalOpen(true);
    }
  };

  // 필터링된 방 목록
  const filteredRooms = getFilteredRooms();

  return (
    <div className="bg-[var(--color-point)] h-full w-full rounded-2xl pt-[0.7rem] pb-0 pl-[1.75rem] pr-[1rem] overflow-hidden">
      {/* 상단 버튼과 검색창 */}
      <div className="flex gap-2 items-center mb-4">
        {/* 방 생성 버튼 */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="h-[3.5rem] w-[9.5rem] xl:h-[4rem] xl:w-[10rem] bg-[var(--color-second)] border border-black text-white text-lg xl:text-xl rounded-xl cursor-pointer transition-all inline-flex items-center justify-center drop-shadow-custom hover:bg-[var(--color-second-hover)]"
        >
          방 생성
        </button>
        {/* 게임 모드 드롭다운 */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-[3.5rem] w-[9.5rem] xl:h-[4rem] xl:w-[10rem] border border-black text-white text-lg xl:text-xl rounded-xl cursor-pointer transition-all inline-flex items-center drop-shadow-custom overflow-hidden group"
          >
            <div className="flex-1 h-full flex items-center justify-center bg-[var(--color-second)] group-hover:bg-[var(--color-second-hover)] transition-all">
              <span
                className={`${
                  selectedMode === "스피드 퀴즈"
                    ? "text-md xl:text-lg"
                    : "text-lg xl:text-xl"
                }`}
              >
                {selectedMode}
              </span>
            </div>
            <div className="w-[35%] bg-[var(--color-secondPoint)] group-hover:bg-[var(--color-secondPoint-hover)] h-full flex items-center justify-center border-l border-black transition-all">
              <Image
                src="/assets/images/dropdown.png"
                alt="드롭다운"
                width={36}
                height={36}
                className={`${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-2 bg-[var(--color-second)] border border-black rounded-xl overflow-hidden drop-shadow-custom">
              {gameModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setSelectedMode(mode);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 text-white text-xl hover:bg-[var(--color-amberOrange)] transition-all flex items-center justify-center"
                >
                  {mode}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* 검색창 */}
        <div className="relative inline-flex items-center h-[3.5rem] w-[34rem] bg-transparent border-none">
          <div className="relative w-full">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={`${selectedFilter}${
                  selectedFilter === "방 제목" ? "으로" : "로"
                } 검색`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[3.5rem] pl-[11.25rem] pr-[1.5rem] bg-[var(--color-second)] text-white text-lg xl:text-xl outline-none placeholder:text-white/70 rounded-[2.5rem] drop-shadow-custom"
              />
              <div className="absolute right-[1.5rem] top-1/2 transform -translate-y-1/2">
                <Image
                  src="/assets/images/search.png"
                  alt="검색"
                  width={36}
                  height={36}
                  className="hidden xl:block"
                />
              </div>
              {/* 필터 드롭다운 */}
              <div className="absolute left-0 top-0" ref={filterDropdownRef}>
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="h-[3.5rem] w-[10.5rem] border border-black text-white text-xl rounded-[2.5rem] cursor-pointer transition-all inline-flex items-center drop-shadow-custom overflow-hidden group"
                >
                  <div className="flex-1 h-full flex items-center justify-center bg-[var(--color-second)] group-hover:bg-[var(--color-second-hover)] transition-all">
                    <span className="text-xl">{selectedFilter}</span>
                  </div>
                  <div className="w-[35%] bg-[var(--color-secondPoint)]/50 group-hover:bg-[var(--color-secondPoint)] h-full flex items-center justify-center border-l border-black transition-all">
                    <Image
                      src="/assets/images/dropdown.png"
                      alt="필터"
                      width={24}
                      height={24}
                      className={`${isFilterDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                {isFilterDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-[var(--color-second)] border border-black rounded-xl overflow-hidden drop-shadow-custom">
                    {searchTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedFilter(type);
                          setIsFilterDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-white text-xl hover:bg-[var(--color-amberOrange)] transition-all flex items-center justify-center"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 방 목록 */}
      <div className="relative h-[calc(100%-6.25rem)]">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 overflow-y-auto h-full pr-2 xl:pr-4 grid-flow-row-dense content-start">
          {loading ? (
            <div className="col-span-2 flex items-center justify-center h-32 text-white text-xl">
              방 목록을 불러오는 중...
            </div>
          ) : error ? (
            <div className="col-span-2 flex items-center justify-center h-32 text-white text-xl">
              {error}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="col-span-2 flex items-center justify-center h-32 text-white text-xl">
              검색 결과가 없습니다
            </div>
          ) : (
            filteredRooms.map((room) => (
              <div
                key={room.roomId}
                className="h-[8em] cursor-pointer"
                onClick={(e) => handleRoomClick(room, e)}
              >
                <GameRoomItem
                  roomId={room.roomId}
                  roomName={room.roomName}
                  round={room.round}
                  disclosure={room.disclosure}
                  gameType={room.gameType}
                  time={room.time}
                  maxUsers={room.maxUsers}
                  currentPlayer={room.currentPlayer}
                  gameRunning={room.gameRunning}
                />
              </div>
            ))
          )}
        </div>

        {/* 새로고침 버튼 (우측 하단에 고정) */}
        <button
          onClick={refreshRooms}
          className="absolute bottom-4 right-4 bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] w-16 h-16 rounded-full flex items-center justify-center border border-black drop-shadow-custom transition-all cursor-pointer z-50"
          aria-label="새로고침"
        >
          <Image
            src="/assets/images/refresh.png"
            alt="새로고침"
            width={30}
            height={30}
          />
        </button>
      </div>

      {/* 방 생성 모달 */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* 비밀번호 확인 모달 */}
      {selectedRoom && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          roomId={selectedRoom.roomId}
        />
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileGameRoomItem from "./MobileGameRoomItem";
import MobileRoomModal from "./MobileRoomModal";
import { Room } from "../../../types/Room";
import { defaultFetch } from "../../../service/api/defaultFetch";

interface MobileRoomListProps {
  roomsData?: Room[];
}

// API 응답 인터페이스 정의
interface ApiResponse {
  isSuccess: boolean;
  message?: string;
  data: Room[];
}

export default function MobileRoomList({ roomsData }: MobileRoomListProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("전체");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("방 제목");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchTypes = ["방 제목", "방 번호"];

  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // roomsData를 rooms 상태에 설정
  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
      setLoading(false);
    } else {
      fetchInitialRooms();
    }
  }, [roomsData]);

  // 초기 방 목록을 API로 가져오는 함수
  const fetchInitialRooms = async () => {
    setLoading(true);
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
        err instanceof Error ? err.message : "방 목록을 불러오는데 실패했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

  // 새로고침
  const refreshRooms = async () => {
    setLoading(true);
    try {
      const data = await defaultFetch<ApiResponse>("/lobbies/rooms");
      if (data.isSuccess) {
        setRooms(data.data);
        console.log("방 목록 새로고침 완료");
      } else {
        throw new Error(data.message || "새로고침에 실패했습니다");
      }
    } catch (err) {
      console.error("Error refreshing rooms:", err);
      setError(
        err instanceof Error ? err.message : "방 목록 새로고침에 실패했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

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

  // 필터링된 방 목록 구하기
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

  // 필터링된 방 목록
  const filteredRooms = getFilteredRooms();

  return (
    <div className="bg-[var(--color-point)] w-full h-full rounded-xl p-1 relative">
      {/* 상단 버튼과 검색창 */}
      <div className="flex gap-1 items-center mb-2">
        {/* 새로고침 버튼 */}
        <div className="w-[30px]">
          <button
            onClick={refreshRooms}
            className="h-[30px] w-[30px] bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] rounded-xl flex items-center justify-center border border-black drop-shadow-custom transition-all cursor-pointer"
            aria-label="새로고침"
          >
            <Image
              src="/assets/images/refresh.png"
              alt="새로고침"
              width={16}
              height={16}
            />
          </button>
        </div>

        {/* 게임 모드 드롭다운 */}
        <div className="relative flex-1" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-[30px] w-full border border-black text-white text-xs rounded-xl cursor-pointer transition-all inline-flex items-center drop-shadow-custom overflow-hidden group"
          >
            <div className="flex-1 h-full flex items-center justify-center bg-[var(--color-second)] group-hover:bg-[var(--color-second-hover)] transition-all">
              <span
                className={`${
                  selectedMode === "그림 맞추기" ||
                  selectedMode === "스피드 퀴즈"
                    ? "text-xs"
                    : "text-xs"
                }`}
              >
                {selectedMode}
              </span>
            </div>
            <div className="w-[35%] bg-[var(--color-secondPoint)] group-hover:bg-[var(--color-secondPoint-hover)] h-full flex items-center justify-center border-l border-black transition-all">
              <Image
                src="/assets/images/dropdown.png"
                alt="드롭다운"
                width={16}
                height={16}
                className={` ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
          {/* 드롭다운 내용  */}
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-2 bg-[var(--color-second)] border border-black rounded-xl overflow-hidden drop-shadow-custom">
              {["전체", "스피드 퀴즈", "OX 퀴즈"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setSelectedMode(mode);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-white text-xs hover:bg-[var(--color-amberOrange)] transition-all flex items-center justify-center"
                >
                  {mode}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 검색창 */}
        <div className="relative inline-flex items-center h-[30px] w-[60%] bg-transparent border-none">
          <div className="relative w-full">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={`${selectedFilter}${
                  selectedFilter === "방 제목" ? "으로" : "로"
                } 검색`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[30px] pl-[85px] pr-6 bg-[var(--color-second)] text-white text-xs outline-none placeholder:text-white/70 rounded-[15px] drop-shadow-custom"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/assets/images/search.png"
                  alt="검색"
                  width={16}
                  height={16}
                />
              </div>
              {/* 필터 드롭다운 */}
              <div className="absolute left-0 top-0" ref={filterDropdownRef}>
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="h-[29px] w-[80px] border border-black text-white text-xs rounded-[15px] cursor-pointer transition-all inline-flex items-center drop-shadow-custom overflow-hidden group"
                >
                  <div className="flex-1 h-full flex items-center justify-center bg-[var(--color-second)] group-hover:bg-[var(--color-second-hover)] transition-all">
                    <span className="text-xs">{selectedFilter}</span>
                  </div>
                  <div className="w-[35%] bg-[var(--color-secondPoint)]/50 group-hover:bg-[var(--color-secondPoint)] h-full flex items-center justify-center border-l border-black transition-all">
                    <Image
                      src="/assets/images/dropdown.png"
                      alt="필터"
                      width={16}
                      height={16}
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
                        className="w-full px-4 py-2 text-white text-xs hover:bg-[var(--color-amberOrange)] transition-all flex items-center justify-center"
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
      <div className="flex flex-col space-y-1 overflow-y-auto h-[calc(100%-40px)] pr-1">
        {loading ? (
          <div className="flex items-center justify-center h-20 text-white text-sm">
            방 목록을 불러오는 중...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-20 text-white text-sm">
            {error}
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-white text-sm">
            검색 결과가 없습니다
          </div>
        ) : (
          filteredRooms.map((room) => (
            <Link
              href={`/rooms/${room.roomId}`}
              key={room.roomId}
              className="block w-full"
            >
              <MobileGameRoomItem
                roomId={room.roomId}
                roomName={room.roomName}
                round={room.round}
                disclosure={room.disclosure}
                gameType={
                  room.gameType === "CATCHMIND" ? "SPEED" : room.gameType
                }
                time={room.time}
                maxUsers={room.maxUsers}
                currentUsers={room.currentUsers}
                gameRunning={room.gameRunning}
              />
            </Link>
          ))
        )}
      </div>
      {/* 방 생성 버튼 */}
      <button
        className="absolute bottom-4 right-4 w-15 h-15 bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] drop-shadow-custom rounded-full flex items-center justify-center shadow-lg z-50"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <Image
          src="/assets/images/create-room.png"
          alt="방 생성"
          width={24}
          height={24}
        />
      </button>

      {/* 모바일버전 방 생성 모달 */}
      <MobileRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

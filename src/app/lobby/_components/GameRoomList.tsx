import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import GameRoomItem from "./GameRoomItem";

export default function GameRoomList() {
  // 상태 변수 선언
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("전체");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("방 제목");

  // 게임 모드와 검색 타입 배열
  const gameModes = ["전체", "그림 맞추기", "스피드 퀴즈", "OX 퀴즈"];
  const searchTypes = ["방 제목", "방 번호"];

  // 드롭다운과 필터 드롭다운을 위한 ref
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-[var(--color-point)] h-full w-full rounded-2xl pt-[11px] pb-[0px] pl-[28px] pr-[16px] overflow-hidden">
      {/* 상단 버튼과 검색창 */}
      <div className="flex gap-2 items-center mb-4">
        {/* 방 생성 버튼 */}
        <button className="h-[70px] w-[170px] bg-[var(--color-second)] border border-black text-white text-2xl rounded-xl cursor-pointer transition-all inline-flex items-center justify-center drop-shadow-custom hover:bg-[var(--color-second-hover)]">
          방 생성
        </button>
        {/* 게임 모드 드롭다운 */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-[70px] w-[170px] border border-black text-white text-2xl rounded-xl cursor-pointer transition-all inline-flex items-center drop-shadow-custom overflow-hidden group"
          >
            <div className="flex-1 h-full flex items-center justify-center bg-[var(--color-second)] group-hover:bg-[var(--color-second-hover)] transition-all">
              <span
                className={`${
                  selectedMode === "그림 맞추기" ||
                  selectedMode === "스피드 퀴즈"
                    ? "text-xl"
                    : "text-2xl"
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
                className={` ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-[var(--color-second)] border border-black rounded-xl overflow-hidden drop-shadow-custom">
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
        <div className="relative inline-flex items-center h-[57px] w-[550px] bg-transparent border-none">
          <div className="relative w-full">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={`${selectedFilter}${
                  selectedFilter === "방 제목" ? "으로" : "로"
                } 검색`}
                className="w-full h-[57px] pl-[180px] pr-6 bg-[var(--color-second)] text-white text-xl outline-none placeholder:text-white/70 rounded-[40px] drop-shadow-custom"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/assets/images/search.png"
                  alt="검색"
                  width={36}
                  height={36}
                />
              </div>
              {/* 필터 드롭다운 */}
              <div className="absolute left-0 top-0" ref={filterDropdownRef}>
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="h-[57px] w-[170px] border border-black text-white text-2xl rounded-[40px] cursor-pointer transition-all inline-flex items-center drop-shadow-custom overflow-hidden group"
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
                  <div className="absolute z-10 w-full mt-2 bg-[var(--color-second)] border border-black rounded-xl overflow-hidden drop-shadow-custom">
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
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 overflow-y-auto h-[calc(100%-100px)] pr-4">
        {Array.from({ length: 15 }).map((_, index) => (
          <Link href="/rooms" key={index}>
            <GameRoomItem />
          </Link>
        ))}
      </div>
    </div>
  );
}

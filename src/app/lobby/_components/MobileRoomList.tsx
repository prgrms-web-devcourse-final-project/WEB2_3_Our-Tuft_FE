import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileGameRoomItem from "./MobileGameRoomItem";
import MobileRoomModal from "./MobileRoomModal";

export default function MobileRoomList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("전체");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("방 제목");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const gameModes = ["전체", "그림 맞추기", "스피드 퀴즈", "OX 퀴즈"];
  const searchTypes = ["방 제목", "방 번호"];

  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="bg-[var(--color-point)] w-full h-full rounded-xl p-1 relative">
      {/* 상단 버튼과 검색창 */}
      <div className="flex gap-1 items-center mb-2">
        {/* 게임 모드 드롭다운 */}
        <div className="relative w-1/3" ref={dropdownRef}>
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
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-[var(--color-second)] border border-black rounded-xl overflow-hidden drop-shadow-custom">
              {gameModes.map((mode) => (
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
        <div className="relative inline-flex items-center h-[30px] w-2/3 bg-transparent border-none">
          <div className="relative w-full">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={`${selectedFilter}${
                  selectedFilter === "방 제목" ? "으로" : "로"
                } 검색`}
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
                  <div className="absolute z-10 w-full mt-2 bg-[var(--color-second)] border border-black rounded-xl overflow-hidden drop-shadow-custom">
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
      <div className="grid grid-cols-1 gap-2 overflow-y-auto h-[calc(100%-40px)] pr-1">
        {Array.from({ length: 15 }).map((_, index) => (
          <Link href="/rooms" key={index}>
            <MobileGameRoomItem />
          </Link>
        ))}
      </div>
      {/* 방 생성 버튼 */}
      <button
        className="absolute bottom-4 right-4 w-15 h-15 bg-[var(--color-secondPoint)] hover:bg-[var(--color-secondPoint-hover)] drop-shadow-custom rounded-full flex items-center justify-center shadow-lg"
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

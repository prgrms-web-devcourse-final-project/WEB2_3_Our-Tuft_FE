import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { useRouter } from "next/navigation";
import { useLoginStore } from "../../../store/store";
import { publishMessage } from "../../../service/api/socketConnection";

interface MobileRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GameModeInfo {
  name: string;
  image: string;
  title: string;
  descriptions: string[];
}

// API 요청 인터페이스 추가
interface CreateRoomRequest {
  roomName: string;
  disclosure: boolean; // true=공개방, false=비공개방
  password: string;
  round: number;
  gameType: "SPEED" | "CATCHMIND" | "OX";
  time: number;
  maxUsers: number;
}

// API 응답 인터페이스 추가
interface CreateRoomResponse {
  isSuccess: boolean;
  message?: string;
  data: {
    roomId: number;
  };
}

export default function MobileRoomModal({
  isOpen,
  onClose,
}: MobileRoomModalProps) {
  const { token } = useLoginStore(); // 로그인 상태 가져오기
  const router = useRouter(); // 라우터 추가
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 추가

  // 폼 상태 변수들
  const [roomTitle, setRoomTitle] = useState("");
  const [password, setPassword] = useState("");
  const [players, setPlayers] = useState(4);
  const [rounds, setRounds] = useState(5);
  const [timeLimit, setTimeLimit] = useState(60);
  const [selectedGameMode, setSelectedGameMode] = useState(0);

  // 드롭다운 상태 관리
  const [isPlayersOpen, setIsPlayersOpen] = useState(false);
  const [isRoundsOpen, setIsRoundsOpen] = useState(false);
  const [isTimeLimitOpen, setIsTimeLimitOpen] = useState(false);

  const playerOptions = [2, 3, 4, 5, 6, 7, 8];
  const roundOptions = [1, 3, 5, 7, 10];
  const timeLimitOptions = [30, 45, 60, 90, 120];

  // 게임 모드 데이터
  const gameModes: GameModeInfo[] = [
    {
      name: "그림 맞추기",
      image: "/assets/images/skribbl.png",
      title: "그림 맞추기",
      descriptions: [
        "각 라운드마다 제시어에 맞게\n플레이어는 그림으로 표현합니다.",
        "그림을 보고, 제시어를 맞힌\n플레이어 순으로 점수를 획득합니다.",
        "가장 많은 점수를 얻은\n플레이어가 승리합니다.",
      ],
    },
    {
      name: "스피드 퀴즈",
      image: "/assets/images/speed.png",
      title: "스피드 퀴즈",
      descriptions: [
        "시간 제한 안에 주어진\n퀴즈를 맞춰야 합니다.",
        "정답을 가장 먼저 맞힌 플레어가\n점수를 획득합니다.",
        "최종적으로 가장 높은 점수를 획득한\n플레이어가 승리합니다.",
      ],
    },
    {
      name: "OX 퀴즈",
      image: "/assets/images/OX.png",
      title: "OX 퀴즈",
      descriptions: [
        "O 또는 X로 답할 수 있는\n퀴즈가 출제됩니다.",
        "제한 시간 안에 정답을\n선택해야 합니다.",
        "많은 문제를 맞힐수록\n높은 포인트를 획득합니다.",
      ],
    },
  ];

  // 게임 모드 변경 함수
  const changeGameMode = (direction: number) => {
    const newIndex =
      (selectedGameMode + direction + gameModes.length) % gameModes.length;
    setSelectedGameMode(newIndex);
  };

  // 게임 모드 이름 매핑 추가
  const gameModeToType: { [key: string]: string } = {
    "그림 맞추기": "CATCHMIND",
    "스피드 퀴즈": "SPEED",
    "OX 퀴즈": "OX",
  };

  // 방 생성 핸들러 - API 호출 로직으로 업데이트
  const handleCreateRoom = async () => {
    if (!token) {
      setErrorMessage("로그인이 필요합니다.");
      return;
    }

    // 방 제목 유효성 검증
    if (!roomTitle.trim()) {
      setErrorMessage("방 제목을 입력해주세요.");
      return;
    }
    // 비밀번호 유효성 검증
    if (
      isPrivate &&
      (!password || password.length !== 4 || !/^\d{4}$/.test(password))
    ) {
      setErrorMessage("비공개 방은 4자리 숫자 비밀번호가 필요합니다.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const requestData: CreateRoomRequest = {
        roomName: roomTitle,
        disclosure: !isPrivate,
        password: isPrivate ? password : "",
        round: rounds,
        gameType: gameModeToType[gameModes[selectedGameMode].name] as
          | "SPEED"
          | "CATCHMIND"
          | "OX",
        time: timeLimit,
        maxUsers: players,
      };

      // 방 생성 API 호출
      const data = await defaultFetch<CreateRoomResponse>("/lobbies/rooms", {
        method: "POST",
        body: JSON.stringify(requestData),
      });

      if (data.isSuccess) {
        console.log("방 생성 성공");

        // 방 생성 알림 메시지
        publishMessage("/app/lobby/rooms", { type: "GET_ROOMS" });

        // 잠시 기다린 후 방으로 이동
        setTimeout(() => {
          onClose();

          // 생성된 방으로 이동
          const roomId = data.data?.roomId;
          if (roomId) {
            router.push(`/rooms/${roomId}`);
          } else {
            throw new Error("방 ID를 찾을 수 없습니다.");
          }
        }, 300); // 300ms 기다리기
      } else {
        throw new Error(data.message || "방 생성에 실패했습니다.");
      }
    } catch (err) {
      console.error("방 생성 오류:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "방 생성에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      {/* 전체 화면 마스킹 */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      {/* 모달 컨테이너 */}
      <div
        ref={modalRef}
        className="bg-[var(--color-second)]/90 w-[90%] max-w-[500px] h-[90%] rounded-2xl drop-shadow-custom overflow-hidden flex flex-col relative z-10"
      >
        {/* 모달 헤더 */}
        <div className="p-4 flex items-center justify-center border-b border-white/10">
          <h2 className="text-white text-2xl font-bold">방 생성</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col gap-5">
            {/* 게임 모드 섹션 */}
            <div className="flex flex-col items-center">
              <h3 className="text-white text-xl mb-3">게임 모드</h3>

              {/* 게임 모드 이미지 캐러셀 */}
              <div className="flex items-center justify-center gap-4 w-full">
                <button
                  type="button"
                  onClick={() => changeGameMode(-1)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* 게임 모드 이미지 */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                  {gameModes.map((mode, index) => (
                    <div
                      key={mode.name}
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        index === selectedGameMode ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={mode.image}
                        alt={mode.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => changeGameMode(1)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform -rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              <h3 className="text-white text-xl font-bold mt-3 mb-3">
                {gameModes[selectedGameMode].title}
              </h3>

              {/* 게임 모드 설명 박스 */}
              <div className="w-full bg-[var(--color-point)] rounded-xl p-3 mb-4">
                <div className="flex flex-col gap-2">
                  {gameModes[selectedGameMode].descriptions.map(
                    (description, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="min-w-1.5 h-1.5 bg-white rounded-full"></div>
                        <p className="text-white text-xs text-center leading-tight whitespace-pre-line flex-1">
                          {description}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/20"></div>

            {/* 방 설정 섹션 */}
            <div className="flex flex-col gap-4">
              {/* 공개/비공개 전환 버튼 */}
              <div className="flex items-center justify-between">
                <span className="text-white text-base">
                  {isPrivate ? "비공개 방" : "공개 방"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[var(--color-second)] peer-focus:ring-4 peer-focus:ring-[var(--color-second)]/50 rounded-full peer border border-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-secondPoint)]"></div>
                </label>
              </div>

              {/* 방 제목 입력 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-base">방 제목</label>
                <input
                  type="text"
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                  placeholder="방 제목을 입력하세요"
                  className="w-full bg-[#D9D9D9] border border-white/50 rounded-lg p-2.5 text-black text-sm focus:outline-none"
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="flex flex-col gap-1.5 transition-opacity">
                <label
                  className={`text-base ${
                    isPrivate ? "text-white" : "text-white/50"
                  }`}
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => isPrivate && setPassword(e.target.value)}
                  placeholder={
                    isPrivate
                      ? "비밀번호를 입력하세요"
                      : "공개 방은 비밀번호가 필요하지 않습니다"
                  }
                  disabled={!isPrivate}
                  className={`w-full border border-white/50 rounded-lg p-2.5 text-sm focus:outline-none
                    ${
                      isPrivate
                        ? "bg-[#D9D9D9] text-black cursor-text"
                        : "bg-[#A0A0A0] text-black/50 cursor-not-allowed"
                    }`}
                />
              </div>

              {/* 인원 선택 드롭다운 */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-white text-base">인원</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlayersOpen(!isPlayersOpen);
                    setIsRoundsOpen(false);
                    setIsTimeLimitOpen(false);
                  }}
                  className="w-full bg-[#D9D9D9] border border-white/50 rounded-lg p-2.5 text-black text-sm text-left flex justify-between items-center"
                >
                  <span>{players}명</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${
                      isPlayersOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isPlayersOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#D9D9D9] border border-white/50 rounded-lg overflow-hidden z-10 max-h-36 overflow-y-auto">
                    {playerOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setPlayers(option);
                          setIsPlayersOpen(false);
                        }}
                        className={`w-full p-2.5 text-black text-sm text-left hover:bg-gray-300 ${
                          players === option ? "bg-gray-300" : ""
                        }`}
                      >
                        {option}명
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 라운드 선택 드롭다운 */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-white text-base">라운드</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsRoundsOpen(!isRoundsOpen);
                    setIsPlayersOpen(false);
                    setIsTimeLimitOpen(false);
                  }}
                  className="w-full bg-[#D9D9D9] border border-white/50 rounded-lg p-2.5 text-black text-sm text-left flex justify-between items-center"
                >
                  <span>{rounds}라운드</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${
                      isRoundsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isRoundsOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#D9D9D9] border border-white/50 rounded-lg overflow-hidden z-10 max-h-36 overflow-y-auto">
                    {roundOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setRounds(option);
                          setIsRoundsOpen(false);
                        }}
                        className={`w-full p-2.5 text-black text-sm text-left hover:bg-gray-300 ${
                          rounds === option ? "bg-gray-300" : ""
                        }`}
                      >
                        {option}라운드
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 진행시간 선택 드롭다운 */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-white text-base">진행시간</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimeLimitOpen(!isTimeLimitOpen);
                    setIsPlayersOpen(false);
                    setIsRoundsOpen(false);
                  }}
                  className="w-full bg-[#D9D9D9] border border-white/50 rounded-lg p-2.5 text-black text-sm text-left flex justify-between items-center"
                >
                  <span>{timeLimit}초</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${
                      isTimeLimitOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isTimeLimitOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#D9D9D9] border border-white/50 rounded-lg overflow-hidden z-10 max-h-36 overflow-y-auto">
                    {timeLimitOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setTimeLimit(option);
                          setIsTimeLimitOpen(false);
                        }}
                        className={`w-full p-2.5 text-black text-sm text-left hover:bg-gray-300 ${
                          timeLimit === option ? "bg-gray-300" : ""
                        }`}
                      >
                        {option}초
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mx-4 mb-2 text-red-500 text-sm bg-white/80 p-2 rounded-md">
            {errorMessage}
          </div>
        )}

        {/* 하단 버튼 영역 */}
        <div className="p-4 border-t border-white/10 flex justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#4E4C4C] text-white text-base rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleCreateRoom}
            className={`flex-1 py-2.5 bg-[var(--color-secondPoint)] text-white text-base rounded-lg hover:opacity-90 transition-opacity ${
              isLoading ? "opacity-70 cursor-wait" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "생성 중..." : "생성"}
          </button>
        </div>
      </div>
    </div>
  );
}

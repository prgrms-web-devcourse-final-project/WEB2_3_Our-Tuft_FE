import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { defaultFetch } from "../../../service/api/defaultFetch";
import { useParams, useRouter } from "next/navigation";
import { useLoginStore } from "../../../store/store";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: string;
  gameType?: string;
}

interface GameModeInfo {
  name: string;
  image: string;
  title: string;
  descriptions: string[];
}

interface CreateRoomRequest {
  roomName: string;
  disclosure: boolean; // true=공개방, false=비공개방
  password: string;
  round: number;
  gameType: "SPEED" | "CATCHMIND" | "OX";
  time: number;
  maxUsers: number;
}

// 방 생성 응답 인터페이스 정의
interface CreateRoomResponse {
  isSuccess: boolean;
  message?: string;
  data: {
    roomId: number;
    roomName?: string;
    round?: number;
    hostId?: number;
    disclosure?: boolean;
    gameType?: "SPEED" | "CATCHMIND" | "OX";
    time?: number;
    maxUsers?: number;
  };
}

export default function CreateRoomModal({
  isOpen,
  onClose,
  type = "방 생성",
  gameType,
}: CreateRoomModalProps) {
  const params = useParams();
  const { token } = useLoginStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 컴포넌트 마운트 상태 관리
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 모달이 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen && mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  // 폼 상태 변수
  const [roomTitle, setRoomTitle] = useState("");
  const [password, setPassword] = useState("");
  const [players, setPlayers] = useState(4);
  const [rounds, setRounds] = useState(5);
  const [timeLimit, setTimeLimit] = useState(60);
  const [selectedGameMode, setSelectedGameMode] = useState(0);

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

  // 드롭다운 상태 관리
  const [isPlayersOpen, setIsPlayersOpen] = useState(false);
  const [isRoundsOpen, setIsRoundsOpen] = useState(false);
  const [isTimeLimitOpen, setIsTimeLimitOpen] = useState(false);

  // 선택 옵션
  const playerOptions = [2, 3, 4, 5, 6, 7, 8];
  const roundOptions = [1, 3, 5, 7, 10];
  const timeLimitOptions = [30, 45, 60, 90, 120];

  // 게임 모드 변경 함수
  const changeGameMode = (direction: number) => {
    const newIndex =
      (selectedGameMode + direction + gameModes.length) % gameModes.length;
    setSelectedGameMode(newIndex);
  };

  // 게임 모드 이름 매핑
  const gameModeToType: { [key: string]: string } = {
    "그림 맞추기": "CATCHMIND",
    "스피드 퀴즈": "SPEED",
    "OX 퀴즈": "OX",
  };

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

      const data = await defaultFetch<CreateRoomResponse>(
        `/lobbies/rooms${type === "설정" ? `/${params.id}` : ""}`,
        {
          method: type === "설정" ? "PUT" : "POST",
          body: JSON.stringify(requestData),
        }
      );

      if (data.isSuccess) {
        console.log("방 생성 성공");

        onClose();

        // 생성된 방으로 즉시 이동
        const roomId = data.data?.roomId;
        if (roomId) {
          // 공개/비공개 여부에 따라 다른 URL 형식 사용
          // 비공개방은 입력한 비밀번호를, 공개방은 "true"를 전달
          const passwordQuery = isPrivate ? password : "true";
          router.push(`/lobby/rooms/${roomId}?password=${passwordQuery}`);
        } else {
          throw new Error("방 ID를 찾을 수 없습니다.");
        }
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

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      {/* 전체 화면 마스킹*/}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      <div
        ref={modalRef}
        className="bg-[var(--color-second)]/90 w-[90%] max-w-[1100px] h-[80%] max-h-[800px] rounded-2xl drop-shadow-custom overflow-hidden flex flex-col relative z-10"
      >
        <div className="p-6 flex items-center justify-center">
          <h2 className="text-white text-4xl md:text-3xl font-bold">{type}</h2>
        </div>

        {/* 공개/비공개 전환 버튼 */}
        <div className="absolute top-20 right-8 flex items-center">
          <span className="text-white text-lg mr-3">
            {isPrivate ? "비공개" : "공개"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-[var(--color-second)] peer-focus:ring-4 peer-focus:ring-[var(--color-second)]/50 rounded-full peer border border-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[var(--color-secondPoint)]"></div>
          </label>
        </div>

        {/* 모달 내용 */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="flex h-full">
            {/* 왼쪽 영역 */}
            <div className="flex-1 pr-6 flex flex-col items-center">
              <h3 className="text-white text-xl mb-6 self-center">게임 모드</h3>

              {/* 게임 모드 이미지 캐러셀 */}
              <div className="flex items-center justify-center gap-4 w-full">
                {/* 왼쪽 화살표 */}
                <button
                  type="button"
                  onClick={() => changeGameMode(-1)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 transform rotate-90"
                    fill="none"
                    viewBox="0 24 24"
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
                <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white">
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

                {/* 오른쪽 화살표 */}
                <button
                  type="button"
                  onClick={() => changeGameMode(1)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 transform -rotate-90"
                    fill="none"
                    viewBox="0 24 24"
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

              <h3 className="text-white text-2xl font-bold mt-4 mb-5">
                {gameModes[selectedGameMode].title}
              </h3>

              {/* 게임 모드 설명 박스 */}
              <div className="w-full bg-[var(--color-point)] rounded-xl p-4 mt-2">
                <div className="flex flex-col gap-3">
                  {gameModes[selectedGameMode].descriptions.map(
                    (description, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="min-w-1.5 h-1.5 bg-white rounded-full"></div>
                        <p className="text-white text-sm text-center leading-tight whitespace-pre-line flex-1">
                          {description}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="w-[2px] bg-white mx-2 h-full"></div>

            {/* 오른쪽 영역 - 설정 폼 */}
            <div className="flex-1 pl-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-white text-xl">방 제목</label>
                <input
                  type="text"
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                  placeholder="방 제목을 입력하세요"
                  className="w-full bg-[#D9D9D9] border border-white/50 rounded-xl p-3 text-black focus:outline-none md:placeholder:opacity-0 xl:placeholder:opacity-100"
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="flex flex-col gap-2 transition-opacity">
                <label
                  className={`text-xl ${
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
                  className={`w-full border border-white/50 rounded-xl p-3 focus:outline-none md:placeholder:opacity-0 xl:placeholder:opacity-100
                    ${
                      isPrivate
                        ? "bg-[#D9D9D9] text-black cursor-text"
                        : "bg-[#A0A0A0] text-black/50 cursor-not-allowed"
                    }`}
                />
              </div>

              {/* 인원 선택 드롭다운 */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-white text-xl">인원</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlayersOpen(!isPlayersOpen);
                    setIsRoundsOpen(false);
                    setIsTimeLimitOpen(false);
                  }}
                  className="w-full bg-[#D9D9D9] border border-white/50 rounded-xl p-3 text-black text-left flex justify-between items-center"
                >
                  <span>{players}명</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${
                      isPlayersOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isPlayersOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#D9D9D9] border border-white/50 rounded-xl overflow-hidden z-10">
                    {playerOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setPlayers(option);
                          setIsPlayersOpen(false);
                        }}
                        className={`w-full p-3 text-black text-left hover:bg-gray-300 ${
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
              <div className="flex flex-col gap-2 relative">
                <label className="text-white text-xl">라운드</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsRoundsOpen(!isRoundsOpen);
                    setIsPlayersOpen(false);
                    setIsTimeLimitOpen(false);
                  }}
                  className="w-full bg-[#D9D9D9] border border-white/50 rounded-xl p-3 text-black text-left flex justify-between items-center"
                >
                  <span>{rounds}라운드</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${
                      isRoundsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isRoundsOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#D9D9D9] border border-white/50 rounded-xl overflow-hidden z-10">
                    {roundOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setRounds(option);
                          setIsRoundsOpen(false);
                        }}
                        className={`w-full p-3 text-black text-left hover:bg-gray-300 ${
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
              <div className="flex flex-col gap-2 relative">
                <label className="text-white text-xl">진행시간</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimeLimitOpen(!isTimeLimitOpen);
                    setIsPlayersOpen(false);
                    setIsRoundsOpen(false);
                  }}
                  // 임시이름 바꿔야함
                  disabled={gameType !== "그림퀴즈"}
                  className="disabled:bg-[#a0a0a0] disabled:text-gray-500 disabled:border-gray-400 
                  w-full bg-[#D9D9D9] border border-white/50 rounded-xl p-3 text-black text-left flex justify-between items-center"
                >
                  <span>{timeLimit}초</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${
                      isTimeLimitOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isTimeLimitOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#D9D9D9] border border-white/50 rounded-xl overflow-hidden z-10">
                    {timeLimitOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setTimeLimit(option);
                          setIsTimeLimitOpen(false);
                        }}
                        className={`w-full p-3 text-black text-left hover:bg-gray-300 ${
                          timeLimit === option ? "bg-gray-300" : ""
                        }`}
                      >
                        {option}초
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 버튼 영역 */}
              <div className="mt-auto flex flex-col gap-2">
                {/* 에러 메시지 표시 */}
                {errorMessage && (
                  <div className="text-red-500 text-sm bg-white/80 p-2 rounded-md">
                    {errorMessage}
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 md:px-4 md:py-2 bg-[#4E4C4C] text-white text-lg md:text-base rounded-lg hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateRoom}
                    className={`px-6 py-2.5 md:px-4 md:py-2 bg-[var(--color-secondPoint)] text-white text-lg md:text-base rounded-lg hover:opacity-90 transition-opacity ${
                      isLoading ? "opacity-70 cursor-wait" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "생성 중..."
                      : type === "방 생성"
                      ? "생성"
                      : "변경"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // React Portal을 사용하여 모달을 body에 직접 렌더링
  return createPortal(modalContent, document.body);
}

import Image from "next/image";

export default function AvatarChange() {
  return (
    <div className="flex items-center justify-center w-1/2">
      <div
        className="w-[620px] h-[466px] bg-[var(--color-point)] rounded-xl flex items-center justify-center relative"
        style={{ top: "-20px" }}
      >
        <Image
          src="/assets/images/removed-profile.png"
          alt="더미프로필"
          width={350}
          height={350}
        />
        {/* pixel-left 이미지 세로로 3개 배치 */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          {[1, 2, 3].map((_, index) => (
            <button
              key={`left-${index}`}
              className="hover:scale-110 transition-transform cursor-pointer"
            >
              <Image
                src="/assets/images/pixel-left.png"
                alt="pixel-left"
                width={100}
                height={100}
              />
            </button>
          ))}
        </div>
        {/* pixel-right 이미지 세로로 3개 배치 */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          {[1, 2, 3].map((_, index) => (
            <button
              key={`right-${index}`}
              className="hover:scale-110 transition-transform cursor-pointer"
            >
              <Image
                src="/assets/images/pixel-right.png"
                alt="pixel-right"
                width={100}
                height={100}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

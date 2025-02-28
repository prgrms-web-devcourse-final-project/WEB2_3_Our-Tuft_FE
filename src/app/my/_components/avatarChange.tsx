import Image from "next/image";

export default function AvatarChange() {
  return (
    <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:mb-0">
      <div className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px] xl:w-[620px] h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] bg-[var(--color-second)]/70 rounded-xl flex flex-col items-center justify-center relative">
        {/* 중앙 프로필 이미지 */}
        <div className="w-[60%] md:w-[65%] max-w-[350px] aspect-square bg-[var(--color-secondPoint)] rounded-t-[28px] flex items-center justify-center">
          <Image
            src="/assets/images/dummy.svg"
            alt="프로필 이미지"
            width={300}
            height={300}
            className="object-cover w-[85%] h-[85%]"
          />
        </div>

        {/* 사용자 닉네임 */}
        <div className="w-[60%] md:w-[65%] max-w-[350px] mt-0 bg-white rounded-b-2xl text-lg md:text-xl lg:text-2xl py-3 md:py-4 px-2 text-black text-center drop-shadow-custom flex items-center justify-center">
          <span className="font-semibold">Jeongmin</span>
        </div>

        {/* pixel-left 이미지 세로로 4개 배치 - 크기 축소 및 위치 조정 */}
        <div className="absolute left-[3%] md:left-[1%] lg:left-[2%] xl:left-[3%] top-[52%] lg:top-[53%] xl:top-[56%] transform -translate-y-1/2 flex flex-col space-y-4 lg:space-y-6 xl:space-y-8">
          {[1, 2, 3, 4].map((_, index) => (
            <button
              key={`left-${index}`}
              className="hover:scale-110 transition-transform cursor-pointer"
            >
              <Image
                src="/assets/images/pixel-left.png"
                alt="pixel-left"
                width={80}
                height={80}
                className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
              />
            </button>
          ))}
        </div>
        {/* pixel-right 이미지 세로로 4개 배치 - 크기 축소 및 위치 조정 */}
        <div className="absolute right-[3%] md:right-[1%] lg:right-[2%] xl:right-[3%] top-[52%] lg:top-[53%] xl:top-[56%] transform -translate-y-1/2 flex flex-col space-y-4 lg:space-y-6 xl:space-y-8">
          {[1, 2, 3, 4].map((_, index) => (
            <button
              key={`right-${index}`}
              className="hover:scale-110 transition-transform cursor-pointer"
            >
              <Image
                src="/assets/images/pixel-right.png"
                alt="pixel-right"
                width={80}
                height={80}
                className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

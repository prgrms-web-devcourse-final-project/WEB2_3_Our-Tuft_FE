import Link from "next/link";

export default function InfoChange() {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-2 md:space-y-4">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
        <label
          className="block text-white text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4"
          htmlFor="nickname"
        >
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          className="w-full py-2 md:py-3 lg:py-4 px-3 rounded-lg bg-white text-black text-base md:text-lg lg:text-xl"
          placeholder="닉네임을 입력하세요"
        />
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 md:mt-4">
          <p className="text-[var(--color-lightRed)] text-xs md:text-sm mb-2 md:mb-0">
            닉네임은 2주에 한 번만 변경할 수 있습니다. 신중하게 결정해주세요!
          </p>
          <button className="w-[100px] md:w-[110px] h-[40px] md:h-[50px] bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] text-white text-lg md:text-xl rounded-lg md:rounded-xl transition-all flex items-center justify-center md:ml-4 self-end md:self-auto">
            변경
          </button>
        </div>
      </div>
      <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
        <label
          className="block text-white text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4"
          htmlFor="bio"
        >
          자기소개
        </label>
        <textarea
          id="bio"
          className="w-full py-2 md:py-3 lg:py-4 px-3 rounded-lg bg-white text-black text-base md:text-lg lg:text-xl"
          placeholder="자기소개를 입력하세요"
          rows={4}
        ></textarea>
        <div className="flex justify-end space-x-3 md:space-x-4 mt-8 md:mt-12 lg:mt-16">
          <Link href="/lobby">
            <button className="w-[90px] md:w-[100px] lg:w-[110px] h-[40px] md:h-[45px] lg:h-[50px] bg-[#4E4C4C] hover:bg-gray-600 text-white text-lg md:text-xl rounded-lg md:rounded-xl transition-all flex items-center justify-center">
              취소
            </button>
          </Link>
          <Link href="/lobby">
            <button className="w-[90px] md:w-[100px] lg:w-[110px] h-[40px] md:h-[45px] lg:h-[50px] bg-[var(--color-second)] hover:bg-[var(--color-second-hover)] text-white text-lg md:text-xl rounded-lg md:rounded-xl transition-all flex items-center justify-center">
              저장
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

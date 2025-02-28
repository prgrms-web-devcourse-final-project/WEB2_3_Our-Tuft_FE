import AvatarChange from "./_components/avatarChange";
import InfoChange from "./_components/infoChange";

export default function Page() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/images/shopbg.png')" }}
    >
      <div className="w-[90%] md:w-[85%] max-w-[1700px] h-[90%] md:h-[85%] max-h-[900px] bg-[#1B399C]/70 rounded-xl md:rounded-3xl shadow-lg flex flex-col items-center justify-start p-4 md:pt-8 lg:pt-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-4">
          프로필 편집
        </h1>
        <div className="flex flex-col md:flex-row w-full h-full overflow-auto md:overflow-hidden">
          <AvatarChange />
          {/* 구분선 - 모바일에서는 가로, 태블릿/데스크탑에서는 세로 */}
          <div className="hidden md:block w-[2px] md:w-[3px] h-[2px] md:h-[90%] bg-white my-4 md:my-0 md:mx-2 md:mt-4 md:mb-2"></div>
          <div className="block md:hidden w-full h-[2px] bg-white my-4"></div>
          <InfoChange />
        </div>
      </div>
    </div>
  );
}

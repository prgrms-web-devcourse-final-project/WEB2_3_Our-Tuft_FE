import AvatarChange from "../lobby/_components/avatarChange";
import InfoChange from "../lobby/_components/infoChange";

export default function Page() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/images/bg.png')" }}
    >
      <div className="w-[85%] max-w-[1700px] h-[85%] max-h-[900px] bg-[var(--color-second)]/90 rounded-3xl shadow-lg flex flex-col items-center justify-start pt-12">
        <h1 className="text-5xl text-white mb-4">프로필 편집</h1>
        <div className="flex w-full h-full">
          <AvatarChange />
          {/* 구분선 */}
          <div className="w-[3px] h-[90%] bg-white mt-4 mb-2"></div>
          <InfoChange />
        </div>
      </div>
    </div>
  );
}

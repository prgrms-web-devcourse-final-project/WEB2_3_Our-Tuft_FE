import QuizBoard from "../../../components/QuizBoard";
import SpeedOXFooter from "../../../components/SpeedOXFooter";
import OXMain from "./OXMain";
import OXButtons from "./OXMain/oxButtons";

export default function OXQuizeContainer() {
  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen items-center justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="relative w-[90vw]">
          <QuizBoard type={"OX"} />
          <OXMain />
          <OXButtons />
          <SpeedOXFooter />
        </div>
      </div>
    </>
  );
}

import QuizBoard from "../../../components/QuizBoard";
import SpeedOXFooter from "../../../components/SpeedOXFooter";
import OXMain from "./OXMain";

export default function OXQuizeContainer() {
  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen items-center 2xl:justify-center  bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="w-[90vw] h-[90vh]">
          <QuizBoard />
          <OXMain />
          <SpeedOXFooter />
        </div>
      </div>
    </>
  );
}

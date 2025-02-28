import QuizBoard from "../../../components/QuizBoard";
import SpeedOXFooter from "../../../components/SpeedOXFooter";
import QuizMain from "./quizMain";

export default function SpeedQuizContainer() {
  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen items-center justify-center bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="w-[90vw]">
          <QuizBoard />
          <QuizMain />
          <SpeedOXFooter />
        </div>
      </div>
    </>
  );
}

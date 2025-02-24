import Quiz from "../../../components/Quiz";
import QuizBottom from "./quizBottom";
import QuizMain from "./quizMain";

export default function SpeedQuizContainer() {
  return (
    <>
      <div
        className="flex flex-col gap-9 w-full min-h-screen h-full items-center px-14 pt-28 bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <Quiz />
        <QuizMain />
        <QuizBottom />
      </div>
    </>
  );
}

import Quize from "./quize";
import QuizeBottom from "./quizeBottom";
import QuizeMain from "./quizeMain";

export default function SpeedQuizContainer() {
  return (
    <>
      <div
        className="flex flex-col gap-9 w-full min-h-screen h-full items-center px-14 pt-28 bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <Quize />
        <QuizeMain />
        <QuizeBottom />
      </div>
    </>
  );
}

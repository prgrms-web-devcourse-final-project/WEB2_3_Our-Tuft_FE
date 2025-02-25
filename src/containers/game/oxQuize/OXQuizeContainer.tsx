import Quiz from "../../../components/Quiz";
import OXFooter from "./OXFooter";
import OXMain from "./OXMain";

export default function OXQuizeContainer() {
  return (
    <>
      <div
        className="flex flex-col gap-5 2xl:gap-5 w-full min-h-screen h-[110vh] 2xl:h-[90vh] items-center 2xl:justify-center  bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <div className="w-[90vw] h-[90vh]">
          <Quiz />
          <OXMain />
          <OXFooter />
        </div>
      </div>
    </>
  );
}

import Quiz from "../../../components/Quiz";
import OXFooter from "./OXFooter";
import OXMain from "./OXMain";

export default function OXQuizeContainer() {
  return (
    <>
      <div
        className="flex flex-col gap-5 w-full min-h-screen h-full items-center px-14 pt-28 bg-center bg-cover bg-repeat"
        style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      >
        <Quiz />
        <OXMain />
        <OXFooter />
      </div>
    </>
  );
}

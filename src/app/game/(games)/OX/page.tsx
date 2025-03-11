import OXQuizeContainer from "../../../../containers/game/oxQuize/OXQuizeContainer";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";

export const metadata = {
  title: "OX 퀴즈",
};

export default function OXQuiz() {
  return (
    <ProtectedRoute>
      <OXQuizeContainer />
    </ProtectedRoute>
  );
}

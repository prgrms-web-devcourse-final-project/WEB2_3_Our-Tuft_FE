import OXQuizeContainer from "../../../../containers/game/oxQuize/OXQuizeContainer";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";

export default function OXQuiz() {
  return (
    <ProtectedRoute>
      <OXQuizeContainer />
    </ProtectedRoute>
  );
}

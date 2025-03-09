import ResponsiveContainer from "../../../../containers/game/drawingquiz/ResponsiveContainer";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";

export default function page() {
  return (
    <ProtectedRoute>
      <ResponsiveContainer />
    </ProtectedRoute>
  );
}

import RoomsContainer from "../../containers/rooms/RoomsContainer";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

export default function Room() {
  return (
    <ProtectedRoute>
      <RoomsContainer />
    </ProtectedRoute>
  );
}

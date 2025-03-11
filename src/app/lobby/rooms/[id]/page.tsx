import RoomsContainer from "../../../../containers/rooms/RoomsContainer";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";

export const metadata = {
  title: "대기방",
};

export default async function Room() {
  return (
    <ProtectedRoute>
      <RoomsContainer />
    </ProtectedRoute>
  );
}

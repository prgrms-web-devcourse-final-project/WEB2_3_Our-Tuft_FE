import LoginContainer from "../../containers/login/LoginContainer";
import NonProtectedRoute from "../../components/NonProtectedRoute/NonProtectedRoute";

export default function page() {
  return (
    <NonProtectedRoute>
      <LoginContainer />
    </NonProtectedRoute>
  );
}

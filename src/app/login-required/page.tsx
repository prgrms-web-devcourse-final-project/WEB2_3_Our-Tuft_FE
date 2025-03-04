import LoginRequiredContainer from "../../containers/login-required/LoginRequiredContainer";
import NonProtectedRoute from "../../components/NonProtectedRoute/NonProtectedRoute";

export default function page() {
  return (
    <NonProtectedRoute>
      <LoginRequiredContainer />
    </NonProtectedRoute>
  );
}

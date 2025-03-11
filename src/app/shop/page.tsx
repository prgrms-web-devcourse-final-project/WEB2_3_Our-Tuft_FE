import ShopContainer from "../../containers/shop/ShopContainer";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

export default function Shop() {
  return (
    <ProtectedRoute>
      <ShopContainer />
    </ProtectedRoute>
  );
}

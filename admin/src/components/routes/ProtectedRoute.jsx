import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.auth);
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";

function ProtectedRoute({ children, role }) {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) return <Navigate to="/login" />;

  if (role && localStorage.getItem("role") !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

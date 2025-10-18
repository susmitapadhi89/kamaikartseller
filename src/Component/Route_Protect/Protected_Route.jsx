import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuth = localStorage.getItem("isLoggedIn") === "true";

  return isAuth ? <Outlet /> : <Navigate to="/seller/" replace />;
};

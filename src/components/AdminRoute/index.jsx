import { Navigate, Outlet } from "react-router-dom";
import authService from "../../services/auth/authService";

export function AdminRoute(props) {
  return authService.isAuthen() ? (
    authService.isAdmin() ? (
      <Outlet {...props}>{props.children}</Outlet>
    ) : (
      <Navigate to="/home" />
    )
  ) : (
    <Navigate to="/sign-in" />
  );
}

import { Navigate, Outlet } from "react-router-dom";
import authService from "../../services/auth/authService";

export function AuthenRoute(props) {
  return authService.isAuthen() ? (
    <Outlet {...props}>{props.children}</Outlet>
  ) : (
    <Navigate to="/sign-in" />
  );
}

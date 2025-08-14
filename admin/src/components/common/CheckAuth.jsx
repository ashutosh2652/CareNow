import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children, user }) {
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.includes("/login")) {
    <Navigate to={"/auth/login"} />;
  }
  if (isAuthenticated && location.pathname.includes("/login")) {
    if (user?.role === "admin") return <Navigate to={"/admin"} />;
    else {
      return <Navigate to={"/wrong-page"} />;
    }
  }
  if (isAuthenticated && user?.role !== "admin") {
    return <Navigate to={"/wrong-page"} />;
  }
  if (
    isAuthenticated &&
    user?.role === "patient" &&
    location.pathname.includes("doctor")
  ) {
    return <Navigate to={"/unauth"} />;
  }

  return <> {children}</>;
}
export default CheckAuth;

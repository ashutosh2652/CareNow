import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children, user }) {
  const location = useLocation();
  if (isAuthenticated == null || isAuthenticated == undefined)
    return <div>Loading...</div>;

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    <Navigate to={"/auth/login"} />;
  }
  if (isAuthenticated && user && !user.isEmailVerified) {
    if (location.pathname.includes("/verify-email")) return <>{children}</>;
    else {
      if (user.role === "patient") {
        <Navigate to={"/patient/resend-email"} />;
      } else if (user.role === "doctor") {
        <Navigate to={"/doctor/resend-email"} />;
      }
    }
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "patient") return <Navigate to={"/patient"} />;
    else if (user?.role === "doctor") return <Navigate to={"/doctor"} />;
    else {
      return <Navigate to={"/wrong-view"} />;
    }
  }
  if (
    isAuthenticated &&
    user?.role === "doctor" &&
    location.pathname.includes("/patient")
  ) {
    return <Navigate to={"/doctor"} />;
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

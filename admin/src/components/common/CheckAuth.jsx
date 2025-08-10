import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children, user }) {
  const location = useLocation();

  //   if (isAuthenticated && user && !user.isEmailVerified) {
  //     if (location.pathname.includes("/verify-email")) return <>{children}</>;
  //     else {
  //       if (user.role === "patient") {
  //         return <Navigate to={"/patient/verify-email/resend"} />;
  //       } else if (user.role === "doctor") {
  //         return <Navigate to={"/doctor/verify-email/resend"} />;
  //       } else {
  //         return <Navigate to={""} />;
  //       }
  //     }
  //   }
  if (!isAuthenticated && !location.pathname.includes("/login")) {
    return <Navigate to={"/auth/login"} />;
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

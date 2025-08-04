import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children, user }) {
  const location = useLocation();
  // if (location.pathname.includes("/")) {
  //   if (user.role === "patient") {
  //     return <Navigate to={"/patient"} />;
  //   } else if (user.role === "doctor") {
  //     return <Navigate to={"/doctor"} />;
  //   } else {
  //     return <Navigate to={"/patient"} replace />;
  //   }
  // }

  // if (location.pathname.includes("google")) {
  //   window.location.href = `${import.meta.url.VITE_BASE_URL}/auth/google`;
  // }
  console.log(isAuthenticated, "isAuthenticated");
  console.log(user, "user");

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    console.log("Hello1");

    return <Navigate to={"/auth/login"} />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    console.log("Hello2");

    if (user?.role === "patient") return <Navigate to={"/patient"} />;
    else if (user?.role === "doctor") return <Navigate to={"/doctor"} />;
    else {
      console.log(user, "user");

      return <Navigate to={"/wrongview"} />;
    }
  }
  if (
    isAuthenticated &&
    user?.role === "doctor" &&
    location.pathname.includes("/patient")
  ) {
    console.log("Hello3");

    return <Navigate to={"/doctor"} />;
  }
  if (
    isAuthenticated &&
    user?.role === "patient" &&
    location.pathname.includes("doctor")
  ) {
    console.log("Hello4");

    return <Navigate to={"/unauth"} />;
  }
  console.log("Hello5");

  return <> {children}</>;
}
export default CheckAuth;

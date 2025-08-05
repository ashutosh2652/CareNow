import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import { ClearError, getUser } from "./store/auth";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/Auth/Layout";
import ErrorPage from "./Error";
import Login from "./pages/auth/login";
import Loading from "./Loading";
import Register from "./pages/auth/register";
import { Skeleton } from "./components/ui/skeleton";
import NotFound from "./not-found/NotFound";
import PatientLayout from "./components/patient-view/Layout";
import Blog from "./pages/patient/blog";
import Home from "./pages/patient/home";
import Contact from "./pages/patient/contact";
import AboutUs from "./pages/patient/about";
import Appointment from "./pages/patient/appointment";
import MyAppointment from "./pages/patient/myappointment";
import Profile from "./pages/patient/profile";
import VerifyEmail from "./pages/common/verify-email";
import SendVerificationEmailForPatient from "./pages/patient/SendVerificationEmail";
import WrongView from "./pages/common/WrongView";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading, error } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      dispatch(ClearError());
    }
  }, [error]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  if (isLoading)
    return (
      <div className=" flex flex-col space-y-2 overflow-hidden h-screen p-1">
        <Skeleton className="min-h-16 w-full rounded" />
        <div className="flex-1 min-h-[1500px] overflow-hidden">
          <Skeleton className="w-full h-full rounded" />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col bg-gradient-to-br from-neutral-200 to-blue-300">
      <Routes>
        <Route
          path="/"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        />
        <Route path="/wrong-view" element={<WrongView />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
          errorElement={<ErrorPage />}
        >
          <Route
            path="login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Loading />}>
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <Register />
                </CheckAuth>
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/patient"
          element={<PatientLayout />}
          errorElement={<ErrorPage />}
        >
          <Route
            path=""
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="verify-email/resend"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <SendVerificationEmailForPatient />
              </CheckAuth>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="verify-email/:token"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <VerifyEmail />
              </CheckAuth>
            }
          />
          <Route
            path="blog"
            element={
              <Suspense fallback={<Loading />}>
                <Blog />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<Loading />}>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path="appointment"
            element={
              <Suspense fallback={<Loading />}>
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <Appointment />
                </CheckAuth>
              </Suspense>
            }
          />
          <Route
            path="my-appointment"
            element={
              <Suspense fallback={<Loading />}>
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <MyAppointment />
                </CheckAuth>
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<Loading />}>
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <Profile />
                </CheckAuth>
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

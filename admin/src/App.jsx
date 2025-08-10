import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/Layout";
import ErrorPage from "./Error";
import Loading from "./Loading";
import Login from "./pages/Login";
import { Suspense } from "react";
import NotFound from "./not-found/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "./components/ui/skeleton";
import WrongPage from "./pages/Wrong-Page";
import CheckAuth from "./components/common/CheckAuth";
import { getUser } from "./store/auth";
import AdminLayout from "./components/Admin/Layout";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patient from "./pages/Patient";
import Appointment from "./pages/Appointment";

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
        <Route path="/wrong-page" element={<WrongPage />} />
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
        </Route>
        <Route
          path="/admin"
          errorElement={<ErrorPage />}
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="doctors"
            element={
              <Suspense fallback={<Loading />}>
                <Doctors />
              </Suspense>
            }
          />
          <Route
            path="patient"
            element={
              <Suspense fallback={<Loading />}>
                <Patient />
              </Suspense>
            }
          />
          <Route
            path="appointment"
            element={
              <Suspense fallback={<Loading />}>
                <Appointment />
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

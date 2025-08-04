import { Outlet } from "react-router-dom";
import CareNowLogo from "../../assets/CareNow-logo.png";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-100 to-blue-200 p-4">
      <div className=" flex w-full max-w-md flex-col items-center gap-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-blue-200 p-6 shadow-lg sm:p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3">
            <img src={CareNowLogo} alt="CareNow Logo" className="h-12 w-auto" />
          </div>
          <h2 className="text-lg font-semibold text-gray-500">
            Welcome Back! Please sign in.
          </h2>
        </div>

        <div className="flex w-full flex-col gap-4">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => {
              window.location.href = `${
                import.meta.env.VITE_BASE_URL
              }/auth/google`;
            }}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center ">
              <span className="w-full border-t border-black/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase z-50 ">
              <span className="bg-gradient-to-br from-blue-100 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

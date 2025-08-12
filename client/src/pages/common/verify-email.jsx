import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { VerifyEmailByToken } from "../../store/auth";

function VerifyEmail() {
  const { token } = useParams();
  console.log(token, "yoken");

  const { isEmailVerifying, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token && user) {
      console.log(user, "user");

      dispatch(VerifyEmailByToken({ email: user?.email ?? null, token }));
    }
    if (user && user.isEmailVerified) {
      if (user.role === "patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }
    }
  }, [dispatch, token, user]);
  console.log(user, "user");
  if (!isEmailVerifying)
    return (
      <div className="grid gap-3">
        <h1 className="text-5xl font-extrabold mt-4">
          INVALID TOKEN OR TOKEN IS EXPIRED
        </h1>
        <Button
          onClick={() => resendverificationemail(user.email)}
          className="cursor-pointer"
        >
          Resend Email
        </Button>
      </div>
    );
  return <div>Verifying your Email Please Wait</div>;
}
export default VerifyEmail;

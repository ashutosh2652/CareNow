import { useState } from "react";
import CommonForm from "../../components/common/form";
import { registerFormControl } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, RegisterUser } from "../../store/auth";
import { useEffect } from "react";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
};
function Register() {
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(RegisterUser({ ...formData })).then((data) => {
      // console.log(data, "data");

      if (data?.payload?.success) {
        setformData(initialState);
        dispatch(getUser());
      }
    });
  }
  // console.log(user, "user");
  useEffect(() => {
    if (user && !user.isEmailVerified) {
      if (user.role === "patient") {
        navigate("/patient/verify-email/resend");
      } else if (user.role === "doctor") {
        navigate("/doctor/verify-email/resend");
      }
    }
  }, [user, dispatch]);
  return (
    <div className="w-full mx-auto grid gap-1.5">
      <h1>Create New Account</h1>
      <CommonForm
        formControls={registerFormControl}
        formData={formData}
        setformData={setformData}
        onSubmit={onSubmit}
        buttonText={"Create New Account"}
      />
      <div className="flex gap-5 mt-2">
        <h3>Already have Account </h3>
        <Link to={"/auth/login"} className="text-blue-400">
          Login
        </Link>
      </div>
    </div>
  );
}
export default Register;

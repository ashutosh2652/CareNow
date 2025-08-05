import { useState } from "react";
import CommonForm from "../../components/common/form";
import { loginFormControl } from "../../config";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, LoginUser } from "../../store/auth";

const initialFormData = {
  email: "",
  password: "",
};
function Login() {
  const [formData, setformData] = useState(initialFormData);
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(LoginUser({ ...formData })).then((data) => {
      if (data.payload.success) {
        dispatch(getUser());
        setformData(initialFormData);
      }
    });
  }
  return (
    <div className="flex flex-col gap-2">
      <CommonForm
        formData={formData}
        setformData={setformData}
        formControls={loginFormControl}
        onSubmit={onSubmit}
        buttonText={"Login"}
      />
      <div className="flex gap-1.5 ml-2">
        <p>Don't have Account</p>
        <Link to={"/auth/register"} className="text-blue-400">
          Register
        </Link>
      </div>
    </div>
  );
}
export default Login;

import { useState } from "react";
import CommonForm from "../components/common/form";
import { loginFormControl } from "../config";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, LoginUser } from "../store/auth";

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
    </div>
  );
}
export default Login;

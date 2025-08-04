import { useState } from "react";
import CommonForm from "../components/common/form";
import { registerFormControl } from "../config";
import { Link } from "react-router-dom";

const initialState = {
  fullName: "",
  email: "",
  password: "",
};
function Register() {
  const [formData, setformData] = useState(initialState);
  function onSubmit(event) {
    event.preventDefault();
  }
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

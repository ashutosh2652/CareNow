import { Outlet } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import PatientFooter from "./PatientFooter";

function PatientLayout() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-black text-white">
      <PatientHeader />
      {/* <main className="flex flex-col w-full py-16"> */}
      {/* Common Main */}
      <Outlet />
      {/* </main> */}
      <PatientFooter />
    </div>
  );
}
export default PatientLayout;

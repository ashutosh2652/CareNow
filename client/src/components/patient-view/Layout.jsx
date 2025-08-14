import { Outlet } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import PatientFooter from "./PatientFooter";

function PatientLayout() {
  return (
    <div className="flex justify-between relative min-h-screen flex-col flex-1 overflow-hidden bg-black text-white">
      <div>
        <div className="mb-20">
          <PatientHeader />
        </div>
        <Outlet />
      </div>
      {/* <main className="flex flex-col w-full py-0 ">Common Main</main> */}
      <PatientFooter />
    </div>
  );
}
export default PatientLayout;

import { Outlet } from "react-router-dom";
import PatientHeader from "./PatientHeader";

function PatientLayout() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-black text-white">
      <PatientHeader />
      <main className="flex flex-col w-full pt-16">
        {/* Common Main */}
        <Outlet />
      </main>
    </div>
  );
}
export default PatientLayout;

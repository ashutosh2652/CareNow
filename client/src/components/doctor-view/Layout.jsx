import { Outlet } from "react-router-dom";
import DoctorHeader from "./DoctorHeader";
import DoctorFooter from "./DoctorFooter";

function PatientLayout() {
	return (
		<div className='flex justify-between relative min-h-screen flex-col flex-1 overflow-hidden bg-black text-white'>
			<div>
				<div className='mb-20'>
					<DoctorHeader />
				</div>
				<Outlet />
			</div>
			<DoctorFooter />
		</div>
	);
}
export default PatientLayout;

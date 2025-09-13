import { useParams } from "react-router-dom";

function MyAppointment() {
	const { appointmentId } = useParams();
	console.log(appointmentId);

	return <div>MyAppointment</div>;
}
export default MyAppointment;

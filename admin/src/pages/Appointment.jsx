import  { useState, useMemo } from "react";
import {
	Search,
	Eye,
	Calendar,
	User,
	Stethoscope,
	CreditCard,
	Clock,
	Video,
	MapPin,
} from "lucide-react";

const AppointmentDashboard = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");

	const appointments = [
		{
			id: "APT-2024-001",
			doctor: {
				name: "Dr. Sarah Johnson",
				photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
			},
			patient: {
				name: "John Smith",
				photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
			},
			paymentStatus: "successful",
			status: "completed",
			meetingType: "online",
			date: "2024-09-15",
			time: "10:30 AM",
		},
		{
			id: "APT-2024-002",
			doctor: {
				name: "Dr. Michael Chen",
				photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
			},
			patient: {
				name: "Emma Davis",
				photo: "https://images.unsplash.com/photo-1494790108755-2616b612b3c9?w=100&h=100&fit=crop&crop=face",
			},
			paymentStatus: "pending",
			status: "scheduled",
			meetingType: "in-person",
			date: "2024-09-20",
			time: "2:15 PM",
		},
		{
			id: "APT-2024-003",
			doctor: {
				name: "Dr. Lisa Anderson",
				photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
			},
			patient: {
				name: "Robert Wilson",
				photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
			},
			paymentStatus: "failed",
			status: "cancelled_by_patient",
			meetingType: "online",
			date: "2024-09-18",
			time: "11:00 AM",
		},
		{
			id: "APT-2024-004",
			doctor: {
				name: "Dr. David Rodriguez",
				photo: "https://images.unsplash.com/photo-1643297654842-10b5cc8e7c90?w=100&h=100&fit=crop&crop=face",
			},
			patient: {
				name: "Maria Garcia",
				photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
			},
			paymentStatus: "successful",
			status: "scheduled",
			meetingType: "in-person",
			date: "2024-09-22",
			time: "9:45 AM",
		},
		{
			id: "APT-2024-005",
			doctor: {
				name: "Dr. Emily Thompson",
				photo: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=100&h=100&fit=crop&crop=face",
			},
			patient: {
				name: "James Brown",
				photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
			},
			paymentStatus: "pending",
			status: "cancelled_by_doctor",
			meetingType: "online",
			date: "2024-09-19",
			time: "3:30 PM",
		},
	];

	const filteredAppointments = useMemo(() => {
		return appointments.filter(appointment => {
			const matchesSearch =
				searchTerm === "" ||
				appointment.id
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				appointment.doctor.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				appointment.patient.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase());

			const matchesFilter =
				filterType === "all" || appointment.status === filterType;

			return matchesSearch && matchesFilter;
		});
	}, [searchTerm, filterType]);

	const getPaymentStatusColor = status => {
		switch (status) {
			case "successful":
				return "text-emerald-400 bg-emerald-400/20";
			case "pending":
				return "text-amber-400 bg-amber-400/20";
			case "failed":
				return "text-red-400 bg-red-400/20";
			default:
				return "text-gray-400 bg-gray-400/20";
		}
	};

	const getStatusColor = status => {
		switch (status) {
			case "completed":
				return "text-emerald-400 bg-emerald-400/20";
			case "scheduled":
				return "text-blue-400 bg-blue-400/20";
			case "cancelled_by_patient":
				return "text-red-400 bg-red-400/20";
			case "cancelled_by_doctor":
				return "text-orange-400 bg-orange-400/20";
			default:
				return "text-gray-400 bg-gray-400/20";
		}
	};

	const formatStatus = status => {
		return status
			.split("_")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	return (
		<div className='min-h-screen overflow-auto bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white'>
			{/* Animated background elements */}
			<div className='fixed inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute top-1/3 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
				<div className='absolute -bottom-10 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000'></div>
			</div>

			<div className='relative z-10'>
				{/* Header */}
				<header className='backdrop-blur-md bg-black/20 border-b border-purple-500/20 sticky top-0 z-20'>
					<div className='max-w-7xl mx-auto px-6 py-6'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-4'>
								<div className='p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl'>
									<Calendar className='w-8 h-8 text-white' />
								</div>
								<div>
									<h1 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
										Appointment Dashboard
									</h1>
									<p className='text-gray-400 mt-1'>
										Manage your healthcare appointments
									</p>
								</div>
							</div>

							<div className='flex items-center space-x-4'>
								<div className='text-right'>
									<p className='text-sm text-gray-400'>
										Total Appointments
									</p>
									<p className='text-2xl font-bold text-purple-400'>
										{appointments.length}
									</p>
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* Search and Filter Section */}
				<div className='max-w-7xl mx-auto px-6 py-8'>
					<div className='backdrop-blur-md bg-black/20 border border-purple-500/20 rounded-2xl p-6 mb-8'>
						<div className='flex flex-col lg:flex-row gap-6'>
							{/* Search Bar */}
							<div className='flex-1 relative'>
								<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
								<input
									type='text'
									placeholder='Search by appointment ID, patient name, or doctor name...'
									value={searchTerm}
									onChange={e =>
										setSearchTerm(e.target.value)
									}
									className='w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
								/>
							</div>

							{/* Filter Dropdown */}
							<div className='relative'>
								<select
									value={filterType}
									onChange={e =>
										setFilterType(e.target.value)
									}
									className='px-6 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer min-w-48'
								>
									<option value='all'>
										All Appointments
									</option>
									<option value='scheduled'>Scheduled</option>
									<option value='completed'>Completed</option>
									<option value='cancelled_by_patient'>
										Cancelled by Patient
									</option>
									<option value='cancelled_by_doctor'>
										Cancelled by Doctor
									</option>
								</select>
							</div>
						</div>
					</div>

					{/* Results count */}
					<div className='mb-6'>
						<p className='text-gray-400'>
							Showing{" "}
							<span className='text-purple-400 font-semibold'>
								{filteredAppointments.length}
							</span>{" "}
							of {appointments.length} appointments
						</p>
					</div>

					{/* Appointments Table */}
					<div className='backdrop-blur-md bg-black/20 border border-purple-500/20 rounded-2xl overflow-hidden'>
						<div className='overflow-x-auto overflow-y-hidden'>
							<table className='w-full'>
								<thead className='bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-b border-purple-500/20'>
									<tr>
										<th className='px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider'>
											<div className='flex items-center space-x-2'>
												<Stethoscope className='w-4 h-4' />
												<span>Doctor</span>
											</div>
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider'>
											<div className='flex items-center space-x-2'>
												<User className='w-4 h-4' />
												<span>Patient</span>
											</div>
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider'>
											ID
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider'>
											<div className='flex items-center space-x-2'>
												<CreditCard className='w-4 h-4' />
												<span>Payment</span>
											</div>
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider'>
											<div className='flex items-center space-x-2'>
												<Clock className='w-4 h-4' />
												<span>Status</span>
											</div>
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider'>
											Type
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider'>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-purple-500/10'>
									{filteredAppointments.map(
										(appointment, index) => (
											<tr
												key={appointment.id}
												className='hover:bg-purple-500/5 transition-all duration-300 animate-fade-in'
												style={{
													animationDelay: `${
														index * 100
													}ms`,
												}}
											>
												<td className='px-6 py-6'>
													<div className='flex items-center space-x-3'>
														<div className='relative'>
															<img
																src={
																	appointment
																		.doctor
																		.photo
																}
																alt={
																	appointment
																		.doctor
																		.name
																}
																className='w-12 h-12 rounded-full object-cover border-2 border-purple-400/30 transition-transform duration-300 hover:scale-110'
															/>
															<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900'></div>
														</div>
														<div>
															<p className='font-semibold text-white'>
																{
																	appointment
																		.doctor
																		.name
																}
															</p>
															<p className='text-sm text-gray-400'>
																Healthcare
																Provider
															</p>
														</div>
													</div>
												</td>
												<td className='px-6 py-6'>
													<div className='flex items-center space-x-3'>
														<img
															src={
																appointment
																	.patient
																	.photo
															}
															alt={
																appointment
																	.patient
																	.name
															}
															className='w-12 h-12 rounded-full object-cover border-2 border-blue-400/30 transition-transform duration-300 hover:scale-110'
														/>
														<div>
															<p className='font-semibold text-white'>
																{
																	appointment
																		.patient
																		.name
																}
															</p>
															<p className='text-sm text-gray-400'>
																{
																	appointment.date
																}{" "}
																at{" "}
																{
																	appointment.time
																}
															</p>
														</div>
													</div>
												</td>
												<td className='px-6 py-6'>
													<span className='text-sm font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full'>
														{appointment.id}
													</span>
												</td>
												<td className='px-6 py-6'>
													<span
														className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
															appointment.paymentStatus
														)}`}
													>
														{appointment.paymentStatus
															.charAt(0)
															.toUpperCase() +
															appointment.paymentStatus.slice(
																1
															)}
													</span>
												</td>
												<td className='px-6 py-6'>
													<span
														className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
															appointment.status
														)}`}
													>
														{formatStatus(
															appointment.status
														)}
													</span>
												</td>
												<td className='px-6 py-6'>
													<div className='flex items-center space-x-2'>
														{appointment.meetingType ===
														"online" ? (
															<Video className='w-4 h-4 text-blue-400' />
														) : (
															<MapPin className='w-4 h-4 text-green-400' />
														)}
														<span className='text-sm text-gray-300 capitalize'>
															{
																appointment.meetingType
															}
														</span>
													</div>
												</td>
												<td className='px-6 py-6'>
													<button className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'>
														<Eye className='w-4 h-4' />
														<span className='text-sm font-medium'>
															View Details
														</span>
													</button>
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>

					{/* Empty state */}
					{filteredAppointments.length === 0 && (
						<div className='text-center py-16 backdrop-blur-md bg-black/20 border border-purple-500/20 rounded-2xl'>
							<Calendar className='w-16 h-16 text-gray-400 mx-auto mb-4' />
							<h3 className='text-xl font-semibold text-gray-300 mb-2'>
								No appointments found
							</h3>
							<p className='text-gray-400'>
								Try adjusting your search criteria or filter
								settings.
							</p>
						</div>
					)}
				</div>
			</div>

			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in {
					animation: fade-in 0.6s ease-out forwards;
					opacity: 0;
				}
			`}</style>
		</div>
	);
};

export default AppointmentDashboard;

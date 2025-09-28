import { useState, useMemo, useEffect } from "react";
import {
	Search,
	Filter,
	Calendar,
	Clock,
	Video,
	MapPin,
	Eye,
	ChevronDown,
	Sparkles,
	Award,
	Heart,
	Stethoscope,
	Users,
	TrendingUp,
	UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const appointmentsData = [
	{
		id: "APT001",
		patientName: "John Smith",
		age: 45,
		gender: "Male",
		condition: "Chest Pain",
		photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
		appointmentDate: "2024-01-15",
		startTime: "09:00",
		endTime: "09:30",
		meetingType: "online",
		status: "scheduled",
		isNewPatient: false,
	},
	{
		id: "APT002",
		patientName: "Sarah Johnson",
		age: 32,
		gender: "Female",
		condition: "Follow-up Checkup",
		photo: "https://images.unsplash.com/photo-1494790108755-2616b25395c5?w=150&h=150&fit=crop&crop=face",
		appointmentDate: "2024-01-16",
		startTime: "14:30",
		endTime: "15:00",
		meetingType: "in-person",
		status: "completed",
		isNewPatient: false,
	},
	{
		id: "APT003",
		patientName: "Michael Chen",
		age: 28,
		gender: "Male",
		condition: "Skin Consultation",
		photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
		appointmentDate: "2024-01-17",
		startTime: "11:00",
		endTime: "11:30",
		meetingType: "online",
		status: "cancelled_by_patient",
		isNewPatient: true,
	},
	{
		id: "APT004",
		patientName: "Emily Davis",
		age: 55,
		gender: "Female",
		condition: "Joint Pain",
		photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
		appointmentDate: "2024-01-18",
		startTime: "16:00",
		endTime: "16:30",
		meetingType: "in-person",
		status: "cancelled_by_doctor",
		isNewPatient: false,
	},
	{
		id: "APT005",
		patientName: "Robert Wilson",
		age: 8,
		gender: "Male",
		condition: "Routine Checkup",
		photo: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=150&h=150&fit=crop&crop=face",
		appointmentDate: "2024-01-19",
		startTime: "10:30",
		endTime: "11:00",
		meetingType: "online",
		status: "scheduled",
		isNewPatient: false,
	},
	{
		id: "APT006",
		patientName: "Lisa Anderson",
		age: 42,
		gender: "Female",
		condition: "Mental Health",
		photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
		appointmentDate: "2024-01-20",
		startTime: "13:00",
		endTime: "13:30",
		meetingType: "in-person",
		status: "completed",
		isNewPatient: true,
	},
];

const statusColors = {
	scheduled:
		"bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-400/30 shadow-blue-500/20",
	completed:
		"bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-400/30 shadow-green-500/20",
	cancelled_by_patient:
		"bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 border-red-400/30 shadow-red-500/20",
	cancelled_by_doctor:
		"bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-400/30 shadow-orange-500/20",
};

const statusLabels = {
	scheduled: "Scheduled",
	completed: "Completed",
	cancelled_by_patient: "Cancelled by Patient",
	cancelled_by_doctor: "Cancelled by Doctor",
};

const statusIcons = {
	scheduled: Clock,
	completed: Award,
	cancelled_by_patient: Heart,
	cancelled_by_doctor: Stethoscope,
};

export default function DoctorAppointmentView() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterDate, setFilterDate] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [showStatusFilter, setShowStatusFilter] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	const filteredAppointments = useMemo(() => {
		return appointmentsData.filter(appointment => {
			const matchesSearch = appointment.patientName
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesDate =
				!filterDate || appointment.appointmentDate === filterDate;
			const matchesStatus =
				!filterStatus || appointment.status === filterStatus;

			return matchesSearch && matchesDate && matchesStatus;
		});
	}, [searchTerm, filterDate, filterStatus]);

	const handleViewDetails = appointmentId => {
		console.log("View details for appointment:", appointmentId);
		// navigate(`/doctor/appointment-details/${appointmentId}`); // Commented out for demo
		alert(`Viewing details for appointment ${appointmentId}`);
		return;
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-950 flex items-center justify-center'>
				<div className='text-center animate-pulse'>
					<div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 animate-spin'>
						<Sparkles className='w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
					</div>
					<p className='text-white text-xl font-semibold'>
						Loading Appointments...
					</p>
				</div>
			</div>
		);
	}

	const stats = [
		{
			label: "Total Appointments",
			value: appointmentsData.length,
			icon: Calendar,
			color: "from-blue-500 to-cyan-500",
			bgColor: "bg-blue-500/10",
		},
		{
			label: "Completed",
			value: appointmentsData.filter(apt => apt.status === "completed")
				.length,
			icon: Award,
			color: "from-green-500 to-emerald-500",
			bgColor: "bg-green-500/10",
		},
		{
			label: "Scheduled",
			value: appointmentsData.filter(apt => apt.status === "scheduled")
				.length,
			icon: Clock,
			color: "from-orange-500 to-amber-500",
			bgColor: "bg-orange-500/10",
		},
		{
			label: "New Patients",
			value: appointmentsData.filter(apt => apt.isNewPatient).length,
			icon: UserCheck,
			color: "from-purple-500 to-pink-500",
			bgColor: "bg-purple-500/10",
		},
	];

	return (
		<div className='min-h-screen bg-gray-950 text-white relative overflow-hidden'>
			{/* Animated Background */}
			<div className='absolute inset-0 opacity-30'>
				<div className='absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
				<div className='absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
				<div className='absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
			</div>

			<div className='relative z-10 p-6'>
				<div className='max-w-7xl mx-auto'>
					{/* Header */}
					<div className='mb-8 text-center animate-in slide-in-from-top duration-1000'>
						<div className='flex items-center justify-center gap-3 mb-4'>
							<div className='p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl shadow-blue-500/25 animate-bounce'>
								<Stethoscope className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent'>
								Appointments
							</h1>
						</div>
						<p className='text-gray-400 text-xl'>
							Manage and view all your patient appointments
						</p>
					</div>

					{/* Stats Cards */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
						{stats.map((stat, index) => (
							<div
								key={stat.label}
								className={`${stat.bgColor} backdrop-blur-sm border border-white/10 rounded-2xl p-6 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-in slide-in-from-bottom`}
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div className='flex items-center justify-between'>
									<div>
										<p className='text-gray-400 text-sm font-medium'>
											{stat.label}
										</p>
										<p className='text-3xl font-bold text-white mt-1'>
											{stat.value}
										</p>
									</div>
									<div
										className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}
									>
										<stat.icon className='w-6 h-6 text-white' />
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Search and Filters */}
					<div className='mb-8 space-y-4'>
						<div className='flex flex-col lg:flex-row gap-4'>
							{/* Enhanced Search Bar */}
							<div className='relative flex-1 group mt-3'>
								<div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200'></div>
								<div className='relative'>
									<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-400 transition-colors duration-300' />
									<input
										type='text'
										placeholder='Search by patient name...'
										value={searchTerm}
										onChange={e =>
											setSearchTerm(e.target.value)
										}
										className='w-full bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-gray-900/90'
									/>
								</div>
							</div>

							{/* Enhanced Date Filter */}
							<div className='flex flex-col sm:flex-row gap-2 justify-between mt-3'>
								<div className='relative group'>
									<div className='max-w-sm absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200'></div>
									<div className='relative'>
										<input
											type='date'
											value={filterDate}
											onChange={e =>
												setFilterDate(e.target.value)
											}
											className='bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 hover:bg-gray-900/90'
										/>
									</div>
								</div>

								{/* Enhanced Status Filter */}
								<div className='relative group'>
									<div className='absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200'></div>
									<div className='relative'>
										<button
											onClick={() =>
												setShowStatusFilter(
													!showStatusFilter
												)
											}
											className='bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-gray-900/90 flex items-center gap-3 min-w-52'
										>
											<Filter className='w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300' />
											<span>
												{filterStatus
													? statusLabels[filterStatus]
													: "All Status"}
											</span>
											<ChevronDown
												className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
													showStatusFilter
														? "rotate-180"
														: ""
												}`}
											/>
										</button>

										{showStatusFilter && (
											<div className='absolute top-full left-0 right-0 mt-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl z-10 animate-in fade-in slide-in-from-top duration-200'>
												<div className='p-2'>
													<button
														onClick={() => {
															setFilterStatus("");
															setShowStatusFilter(
																false
															);
														}}
														className='w-full text-left px-4 py-3 text-white hover:bg-gray-800/70 rounded-lg transition-all duration-200 flex items-center gap-3'
													>
														<Users className='w-4 h-4 text-gray-400' />
														All Status
													</button>
													{Object.entries(
														statusLabels
													).map(([value, label]) => {
														const IconComponent =
															statusIcons[value];
														return (
															<button
																key={value}
																onClick={() => {
																	setFilterStatus(
																		value
																	);
																	setShowStatusFilter(
																		false
																	);
																}}
																className='w-full text-left px-4 py-3 text-white hover:bg-gray-800/70 rounded-lg transition-all duration-200 flex items-center gap-3'
															>
																<IconComponent className='w-4 h-4 text-gray-400' />
																{label}
															</button>
														);
													})}
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Enhanced Appointments Table */}
					<div className='bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-1000 delay-400'>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead className='bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700'>
									<tr>
										<th className='px-6 py-5 text-left text-sm font-semibold text-gray-300'>
											#
										</th>
										<th className='px-6 py-5 text-left text-sm font-semibold text-gray-300'>
											Patient
										</th>
										<th className='px-6 py-5 text-left text-sm font-semibold text-gray-300'>
											Date
										</th>
										<th className='px-6 py-5 text-left text-sm font-semibold text-gray-300'>
											Time Slot
										</th>
										<th className='px-6 py-5 text-left text-sm font-semibold text-gray-300'>
											Meeting
										</th>
										<th className='px-6 py-5 text-left text-sm font-semibold text-gray-300'>
											Status
										</th>
										<th className='px-6 py-5 text-left text-sm font-semibold text-gray-300'>
											ID
										</th>
										<th className='px-6 py-5 text-center text-sm font-semibold text-gray-300'>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-800/50'>
									{filteredAppointments.map(
										(appointment, index) => {
											const StatusIcon =
												statusIcons[appointment.status];
											return (
												<tr
													key={appointment.id}
													className='hover:bg-gray-800/30 transition-all duration-500 animate-in fade-in slide-in-from-left group'
													style={{
														animationDelay: `${
															600 + index * 100
														}ms`,
													}}
												>
													<td className='px-6 py-5 text-gray-300 font-medium'>
														{index + 1}
													</td>
													<td className='px-6 py-5'>
														<div className='flex items-center gap-4'>
															<div className='relative'>
																<div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-500'></div>
																<img
																	src={
																		appointment.photo
																	}
																	alt={
																		appointment.patientName
																	}
																	className='relative w-12 h-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-400 transition-all duration-300'
																	onError={e => {
																		e.target.src = `https://ui-avatars.com/api/?name=${appointment.patientName}&background=random&color=fff&size=150`;
																	}}
																/>
																{appointment.isNewPatient && (
																	<div className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center'>
																		<UserCheck className='w-3 h-3 text-white' />
																	</div>
																)}
															</div>
															<div>
																<div className='font-semibold text-white text-lg'>
																	{
																		appointment.patientName
																	}
																</div>
																<div className='text-sm text-blue-400 font-medium'>
																	{
																		appointment.condition
																	}
																</div>
																<div className='flex items-center gap-2 mt-1'>
																	<div className='flex items-center gap-1'>
																		<span className='text-xs text-gray-400'>
																			{
																				appointment.age
																			}{" "}
																			yrs
																		</span>
																	</div>
																	<span className='text-xs text-gray-500'>
																		•
																	</span>
																	<span className='text-xs text-gray-400'>
																		{
																			appointment.gender
																		}
																	</span>
																	{appointment.isNewPatient && (
																		<>
																			<span className='text-xs text-gray-500'>
																				•
																			</span>
																			<span className='text-xs text-emerald-400 font-medium'>
																				New
																				Patient
																			</span>
																		</>
																	)}
																</div>
															</div>
														</div>
													</td>
													<td className='px-6 py-5'>
														<div className='bg-gray-800/50 rounded-xl px-3 py-2 inline-block'>
															<div className='text-white font-medium'>
																{new Date(
																	appointment.appointmentDate
																).toLocaleDateString(
																	"en-US",
																	{
																		month: "short",
																		day: "numeric",
																	}
																)}
															</div>
															<div className='text-gray-400 text-xs'>
																{new Date(
																	appointment.appointmentDate
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																	}
																)}
															</div>
														</div>
													</td>
													<td className='px-6 py-5'>
														<div className='flex items-center gap-3 bg-gray-800/50 rounded-xl px-4 py-3'>
															<Clock className='w-4 h-4 text-blue-400' />
															<div>
																<div className='text-white font-medium text-sm'>
																	{
																		appointment.startTime
																	}{" "}
																	-{" "}
																	{
																		appointment.endTime
																	}
																</div>
																<div className='text-gray-400 text-xs'>
																	30 min
																	duration
																</div>
															</div>
														</div>
													</td>
													<td className='px-6 py-5'>
														<div
															className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
																appointment.meetingType ===
																"online"
																	? "bg-blue-500/20 border border-blue-500/30"
																	: "bg-green-500/20 border border-green-500/30"
															}`}
														>
															{appointment.meetingType ===
															"online" ? (
																<Video className='w-4 h-4 text-blue-400' />
															) : (
																<MapPin className='w-4 h-4 text-green-400' />
															)}
															<span
																className={`capitalize font-medium text-sm ${
																	appointment.meetingType ===
																	"online"
																		? "text-blue-300"
																		: "text-green-300"
																}`}
															>
																{appointment.meetingType ===
																"online"
																	? "Video Call"
																	: "In-Person"}
															</span>
														</div>
													</td>
													<td className='px-6 py-5'>
														<div
															className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border shadow-lg ${
																statusColors[
																	appointment
																		.status
																]
															}`}
														>
															<StatusIcon className='w-4 h-4' />
															{
																statusLabels[
																	appointment
																		.status
																]
															}
														</div>
													</td>
													<td className='px-6 py-5'>
														<div className='bg-gray-800/50 rounded-lg px-3 py-2 font-mono text-sm text-gray-300 border border-gray-700'>
															{appointment.id}
														</div>
													</td>
													<td className='px-6 py-5 text-center'>
														<button
															onClick={() =>
																handleViewDetails(
																	appointment.id
																)
															}
															className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center gap-2 mx-auto group'
														>
															<Eye className='w-4 h-4 group-hover:animate-pulse' />
															View Details
														</button>
													</td>
												</tr>
											);
										}
									)}
								</tbody>
							</table>
						</div>

						{filteredAppointments.length === 0 && (
							<div className='text-center py-16 animate-in fade-in duration-1000 delay-800'>
								<div className='w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center'>
									<TrendingUp className='w-12 h-12 text-gray-500' />
								</div>
								<div className='text-gray-300 text-xl mb-2 font-semibold'>
									No appointments found
								</div>
								<div className='text-gray-500 text-lg'>
									Try adjusting your search or filter criteria
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes blob {
					0% {
						transform: translate(0px, 0px) scale(1);
					}
					33% {
						transform: translate(30px, -50px) scale(1.1);
					}
					66% {
						transform: translate(-20px, 20px) scale(0.9);
					}
					100% {
						transform: translate(0px, 0px) scale(1);
					}
				}
				.animate-blob {
					animation: blob 7s infinite;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</div>
	);
}

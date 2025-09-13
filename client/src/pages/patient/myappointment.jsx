import React, { useState, useEffect } from "react";
import {
	ArrowLeft,
	Calendar,
	Clock,
	MapPin,
	Video,
	User,
	CreditCard,
	FileText,
	X,
	Check,
	AlertCircle,
	Star,
	Edit2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate, useParams } from "react-router-dom";

const AppointmentDetailsPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [editingSymptoms, setEditingSymptoms] = useState(false);
	const [symptoms, setSymptoms] = useState(
		"Persistent headaches for the past week, occasional dizziness, and mild fever"
	);
	const [tempSymptoms, setTempSymptoms] = useState("");
	const navigate = useNavigate();
	const { appointmentId } = useParams();

	// Temporary data
	const appointmentData = {
		doctor: {
			name: "Dr. Sarah Mitchell",
			photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4",
			speciality: "Neurologist",
			rating: 4.8,
			reviews: 324,
		},
		appointment: {
			date: "2025-09-15",
			startTime: "10:30 AM",
			endTime: "11:00 AM",
			status: "scheduled", // scheduled, completed, cancelled_by_patient, cancelled_by_doctor
			meetingType: "online", // online, in-person
			roomNumber: "Virtual Room 5",
		},
		payment: {
			status: "successfull", // pending, successfull, failed
			amount: 1500,
		},
		prescription: false, // Set to true to enable prescription button
		timestamps: {
			bookedAt: "2025-09-10 14:30:00",
			updatedAt: "2025-09-10 14:30:00",
		},
	};

	useEffect(() => {
		setTimeout(() => setIsLoading(false), 1000);
	}, []);

	const getStatusColor = status => {
		const colors = {
			scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
			completed: "bg-green-500/20 text-green-400 border-green-500/30",
			cancelled_by_patient:
				"bg-red-500/20 text-red-400 border-red-500/30",
			cancelled_by_doctor:
				"bg-orange-500/20 text-orange-400 border-orange-500/30",
		};
		return colors[status] || colors.scheduled;
	};

	const getPaymentStatusColor = status => {
		const colors = {
			pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
			successfull: "bg-green-500/20 text-green-400 border-green-500/30",
			failed: "bg-red-500/20 text-red-400 border-red-500/30",
		};
		return colors[status] || colors.pending;
	};

	const formatStatus = status => {
		return status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
	};

	const handleSaveSymptoms = () => {
		setSymptoms(tempSymptoms);
		setEditingSymptoms(false);
	};

	const handleEditSymptoms = () => {
		setTempSymptoms(symptoms);
		setEditingSymptoms(true);
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center'>
				<div className='relative'>
					<div className='w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin'></div>
					<div
						className='absolute inset-0 w-20 h-20 border-4 border-blue-500/20 border-b-blue-500 rounded-full animate-spin'
						style={{
							animationDirection: "reverse",
							animationDuration: "1.5s",
						}}
					></div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4 md:p-8'>
			{/* Animated background orbs */}
			<div className='fixed inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
				<div
					className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse'
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse'
					style={{ animationDelay: "4s" }}
				></div>
			</div>

			<div className='relative max-w-6xl mx-auto'>
				{/* Header */}
				<div className='mb-8 animate-fadeIn'>
					<button
						onClick={() => navigate("/patient/appointment")}
						className='group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/30'
					>
						<ArrowLeft className='w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors group-hover:-translate-x-1 duration-300' />
						<span className='text-gray-300 group-hover:text-white transition-colors'>
							All Appointments
						</span>
					</button>
				</div>

				{/* Main Content Card */}
				<div className='bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-2xl animate-slideUp'>
					{/* Doctor Section */}
					<div className='mb-8 pb-8 border-b border-gray-700/50'>
						<div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
							<div className='relative group'>
								<div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
								<img
									src={appointmentData.doctor.photo}
									alt={appointmentData.doctor.name}
									className='relative w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-purple-500/30 transform transition-transform duration-300 group-hover:scale-110'
								/>
							</div>

							<div className='flex-1'>
								<h1 className='text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
									{appointmentData.doctor.name}
								</h1>
								<p className='text-purple-300 text-lg mb-3'>
									{appointmentData.doctor.speciality}
								</p>
								<div className='flex items-center gap-4'>
									<div className='flex items-center gap-1'>
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 ${
													i <
													Math.floor(
														appointmentData.doctor
															.rating
													)
														? "text-yellow-400 fill-yellow-400"
														: "text-gray-600"
												} transition-all duration-300 hover:scale-110`}
											/>
										))}
										<span className='text-gray-300 ml-2'>
											{appointmentData.doctor.rating}
										</span>
									</div>
									<span className='text-gray-500'>•</span>
									<span className='text-gray-400'>
										{appointmentData.doctor.reviews} reviews
									</span>
								</div>
							</div>

							<div
								className={`px-4 py-2 rounded-xl border ${getStatusColor(
									appointmentData.appointment.status
								)} backdrop-blur-sm animate-pulse`}
							>
								<span className='font-semibold'>
									{formatStatus(
										appointmentData.appointment.status
									)}
								</span>
							</div>
						</div>
					</div>

					{/* Appointment Details Grid */}
					<div className='grid md:grid-cols-2 gap-6 mb-8'>
						{/* Date & Time Card */}
						<div className='bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-purple-500/40'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='p-2 bg-purple-500/20 rounded-lg'>
									<Calendar className='w-5 h-5 text-purple-400' />
								</div>
								<h3 className='text-lg font-semibold text-white'>
									Appointment Schedule
								</h3>
							</div>
							<div className='space-y-3'>
								<div className='flex items-center gap-2 text-gray-300'>
									<span className='text-gray-500'>Date:</span>
									<span className='font-medium'>
										{new Date(
											appointmentData.appointment.date
										).toLocaleDateString("en-US", {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</div>
								<div className='flex items-center gap-2 text-gray-300'>
									<Clock className='w-4 h-4 text-gray-500' />
									<span>
										{appointmentData.appointment.startTime}{" "}
										- {appointmentData.appointment.endTime}
									</span>
								</div>
							</div>
						</div>

						{/* Meeting Type Card */}
						<div className='bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-blue-500/40'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='p-2 bg-blue-500/20 rounded-lg'>
									{appointmentData.appointment.meetingType ===
									"online" ? (
										<Video className='w-5 h-5 text-blue-400' />
									) : (
										<MapPin className='w-5 h-5 text-blue-400' />
									)}
								</div>
								<h3 className='text-lg font-semibold text-white'>
									Meeting Details
								</h3>
							</div>
							<div className='space-y-3'>
								<div className='flex items-center gap-2 text-gray-300'>
									<span className='text-gray-500'>Type:</span>
									<span className='font-medium capitalize'>
										{
											appointmentData.appointment
												.meetingType
										}
									</span>
								</div>
								<div className='flex items-center gap-2 text-gray-300'>
									<span className='text-gray-500'>
										Location:
									</span>
									<span className='font-medium'>
										{appointmentData.appointment.roomNumber}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Symptoms Section */}
					<div className='bg-gray-700/30 border border-gray-600/30 rounded-2xl p-6 mb-8 transform transition-all duration-300 hover:border-gray-500/50'>
						<div className='flex items-center justify-between mb-4'>
							<div className='flex items-center gap-3'>
								<div className='p-2 bg-pink-500/20 rounded-lg'>
									<AlertCircle className='w-5 h-5 text-pink-400' />
								</div>
								<h3 className='text-lg font-semibold text-white'>
									Symptoms
								</h3>
							</div>
							{!editingSymptoms && (
								<button
									onClick={handleEditSymptoms}
									className='p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group'
								>
									<Edit2 className='w-4 h-4 text-gray-400 group-hover:text-purple-400' />
								</button>
							)}
						</div>
						{editingSymptoms ? (
							<div className='space-y-3'>
								<textarea
									value={tempSymptoms}
									onChange={e =>
										setTempSymptoms(e.target.value)
									}
									className='w-full bg-gray-800/50 border border-gray-600/50 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-purple-500/50 transition-all duration-300 min-h-[100px]'
									placeholder='Describe your symptoms...'
								/>
								<div className='flex gap-2'>
									<button
										onClick={handleSaveSymptoms}
										className='px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105'
									>
										Save
									</button>
									<button
										onClick={() =>
											setEditingSymptoms(false)
										}
										className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300'
									>
										Cancel
									</button>
								</div>
							</div>
						) : (
							<p className='text-gray-300 leading-relaxed'>
								{symptoms}
							</p>
						)}
					</div>

					{/* Payment Details */}
					<div className='bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 mb-8 transform transition-all duration-300 hover:scale-105 hover:border-green-500/40'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='p-2 bg-green-500/20 rounded-lg'>
								<CreditCard className='w-5 h-5 text-green-400' />
							</div>
							<h3 className='text-lg font-semibold text-white'>
								Payment Details
							</h3>
						</div>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<div className='flex items-center gap-3'>
									<span className='text-gray-500'>
										Amount:
									</span>
									<span className='text-2xl font-bold text-white'>
										₹{appointmentData.payment.amount}
									</span>
								</div>
								<div className='flex items-center gap-3'>
									<span className='text-gray-500'>
										Status:
									</span>
									<span
										className={`px-3 py-1 rounded-lg border ${getPaymentStatusColor(
											appointmentData.payment.status
										)} font-medium`}
									>
										{appointmentData.payment.status ===
											"successfull" && (
											<Check className='inline w-4 h-4 mr-1' />
										)}
										{formatStatus(
											appointmentData.payment.status
										)}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Timestamps */}
					<div className='flex flex-col md:flex-row gap-4 text-sm text-gray-500 mb-8'>
						<div>
							Booked at:{" "}
							<span className='text-gray-400'>
								{appointmentData.timestamps.bookedAt}
							</span>
						</div>
						<div className='hidden md:block'>•</div>
						<div>
							Last updated:{" "}
							<span className='text-gray-400'>
								{appointmentData.timestamps.updatedAt}
							</span>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col md:flex-row gap-4'>
						<button
							onClick={() => setShowCancelModal(true)}
							className='flex-1 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 hover:scale-105 font-medium'
							disabled={
								appointmentData.appointment.status !==
								"scheduled"
							}
						>
							Cancel Appointment
						</button>
						<button
							className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 ${
								appointmentData.prescription
									? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
									: "bg-gray-700/50 text-gray-500 cursor-not-allowed"
							}`}
							disabled={!appointmentData.prescription}
						>
							<FileText className='w-5 h-5' />
							View Prescription
						</button>
					</div>
				</div>
			</div>

			{/* Cancel Modal */}
			{showCancelModal && (
				<div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn'>
					<div className='bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full transform transition-all duration-300 scale-100 animate-slideUp'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-xl font-bold text-white'>
								Cancel Appointment
							</h3>
							<button
								onClick={() => setShowCancelModal(false)}
								className='p-1 hover:bg-white/10 rounded-lg transition-colors'
							>
								<X className='w-5 h-5 text-gray-400' />
							</button>
						</div>
						<p className='text-gray-300 mb-6'>
							Are you sure you want to cancel this appointment?
							This action cannot be undone.
						</p>
						<div className='flex gap-3'>
							<button
								onClick={() => setShowCancelModal(false)}
								className='flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300'
							>
								Keep Appointment
							</button>
							<button
								onClick={() => {
									console.log("Appointment cancelled");
									setShowCancelModal(false);
								}}
								className='flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300'
							>
								Yes, Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fadeIn {
					animation: fadeIn 0.5s ease-out;
				}

				.animate-slideUp {
					animation: slideUp 0.6s ease-out;
				}
			`}</style>
		</div>
	);
};

export default AppointmentDetailsPage;

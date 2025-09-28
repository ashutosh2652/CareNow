import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const AvailabilitySection = ({
	data,
	isEditing,
	daysOfWeek,
	timeSlots,
	onAvailabilityChange,
}) => {
	const [showTimeModal, setShowTimeModal] = useState(false);
	const [selectedDay, setSelectedDay] = useState("");

	const handleDayClick = day => {
		if (!isEditing) return;
		setSelectedDay(day);
		setShowTimeModal(true);
	};

	const handleTimeSlotToggle = slot => {
		onAvailabilityChange(selectedDay, slot);
	};

	const closeModal = () => {
		setShowTimeModal(false);
		setSelectedDay("");
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-10'>
				<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl'>
					<span className='text-xl sm:text-2xl'>📅</span>
				</div>
				<div>
					<h2 className='text-2xl sm:text-3xl font-bold text-white'>
						Availability Schedule
					</h2>
					<p className='text-slate-400 mt-1'>
						Click on a day to set your available time slots
					</p>
				</div>
			</div>

			{/* Day Selection Grid */}
			<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10'>
				{daysOfWeek.map(day => {
					const hasSlots = data[day] && data[day].length > 0;
					return (
						<motion.button
							key={day}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => handleDayClick(day)}
							disabled={!isEditing}
							className={`relative p-4 rounded-2xl transition-all duration-300 border-2 backdrop-blur-sm ${
								hasSlots
									? "bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-400/50 text-white shadow-2xl shadow-emerald-500/25"
									: "bg-slate-800/40 border-slate-600/40 text-slate-300 hover:bg-slate-700/60 hover:border-slate-500/60"
							} ${
								!isEditing
									? "cursor-not-allowed opacity-60"
									: "cursor-pointer"
							}`}
						>
							<div className='text-center'>
								<div className='text-2xl mb-2'>
									{day === "Monday" && "📅"}
									{day === "Tuesday" && "📆"}
									{day === "Wednesday" && "🗓️"}
									{day === "Thursday" && "📋"}
									{day === "Friday" && "📊"}
									{day === "Saturday" && "🎯"}
									{day === "Sunday" && "🌟"}
								</div>
								<div className='font-semibold text-sm sm:text-base mr-0'>
									{day}
								</div>
								{hasSlots && (
									<div className='mt-2 text-xs text-emerald-300'>
										{data[day].length} slot
										{data[day].length !== 1 ? "s" : ""}
									</div>
								)}
							</div>
							{hasSlots && (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg'
								>
									<span className='text-xs text-white'>
										✓
									</span>
								</motion.div>
							)}
						</motion.button>
					);
				})}
			</div>

			{/* Time Selection Modal */}
			<AnimatePresence>
				{showTimeModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
						onClick={closeModal}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							className='bg-slate-900/95 border border-slate-600/60 rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto backdrop-blur-xl shadow-2xl'
							onClick={e => e.stopPropagation()}
						>
							<div className='flex items-center justify-between mb-8'>
								<div className='flex items-center space-x-4'>
									<div className='w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg'>
										<span className='text-xl'>⏰</span>
									</div>
									<div>
										<h3 className='text-2xl font-bold text-white'>
											Set Time Slots for {selectedDay}
										</h3>
										<p className='text-slate-400'>
											Click to select/deselect available
											time slots
										</p>
									</div>
								</div>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={closeModal}
									className='w-10 h-10 bg-slate-800/60 hover:bg-red-500/20 border border-slate-600/60 hover:border-red-400/60 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-all duration-300'
								>
									✕
								</motion.button>
							</div>

							<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8'>
								{timeSlots.map(slot => {
									const isSelected =
										data[selectedDay]?.includes(slot);
									return (
										<motion.button
											key={slot}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() =>
												handleTimeSlotToggle(slot)
											}
											className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
												isSelected
													? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/25"
													: "bg-slate-800/60 text-slate-300 border-slate-600/60 hover:bg-slate-700/60 hover:border-slate-500/60"
											}`}
										>
											{slot}
										</motion.button>
									);
								})}
							</div>

							<div className='flex justify-between items-center pt-6 border-t border-slate-600/40'>
								<div className='text-sm text-slate-400'>
									Selected: {data[selectedDay]?.length || 0}{" "}
									time slots
								</div>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={closeModal}
									className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg'
								>
									Done
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Schedule Preview */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='p-6 bg-gradient-to-r from-violet-500/10 to-purple-600/10 border border-violet-400/30 rounded-2xl backdrop-blur-sm'
			>
				<h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-2'>
					<span>👁️</span>
					<span>Schedule Preview</span>
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{daysOfWeek.map(
						day =>
							data[day] &&
							data[day].length > 0 && (
								<motion.div
									key={day}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3 }}
									className='bg-slate-800/60 border border-slate-600/60 rounded-xl p-4 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer'
									onClick={() => handleDayClick(day)}
								>
									<div className='flex items-center justify-between mb-3'>
										<h4 className='font-semibold text-white'>
											{day}
										</h4>
										{isEditing && (
											<span className='text-xs text-slate-400 hover:text-emerald-300'>
												✏️ Edit
											</span>
										)}
									</div>
									<div className='space-y-2'>
										{data[day].slice(0, 3).map(slot => (
											<div
												key={slot}
												className='text-sm text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-lg'
											>
												{slot}
											</div>
										))}
										{data[day].length > 3 && (
											<div className='text-xs text-slate-400 px-2 py-1'>
												+{data[day].length - 3} more
												slots
											</div>
										)}
									</div>
								</motion.div>
							)
					)}
				</div>
				{Object.keys(data).filter(
					day => data[day] && data[day].length > 0
				).length === 0 && (
					<div className='text-center text-slate-400 py-12'>
						<span className='text-6xl mb-4 block'>📅</span>
						<p className='text-lg mb-2'>No schedule set</p>
						<p className='text-sm'>
							Click on any day above to set your available time
							slots
						</p>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
};

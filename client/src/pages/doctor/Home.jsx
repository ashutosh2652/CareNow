import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowDown,
	Video,
	MapPin,
	Stethoscope,
	MessageSquare,
	Briefcase,
	Clock,
	TrendingUp,
	Bell,
	Star,
	Eye,
	Activity,
	Calendar,
	UserCheck,
	Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Link: ScrollLink, Element } = window.ReactScroll || {
	Link: "a",
	Element: "div",
};

const upcomingOnlineDate = new Date();
upcomingOnlineDate.setMinutes(upcomingOnlineDate.getMinutes() + 45);

const doctorData = {
	name: "Dr. Sarah Mitchell",
	specialization: "Cardiologist",
	rating: 4.9,
	totalPatients: 1247,
	todayStats: {
		appointmentsCompleted: 8,
		appointmentsRemaining: 3,
		totalRevenue: 2400,
		avgConsultationTime: "22 min",
	},
	appointments: {
		upcoming: [
			{
				id: 1,
				patientName: "Emma Thompson",
				patientAge: 34,
				time: upcomingOnlineDate,
				type: "online",
				reason: "Follow-up Consultation",
				priority: "medium",
			},
			{
				id: 2,
				patientName: "James Wilson",
				patientAge: 56,
				time: new Date(Date.now() + 3 * 60 * 60 * 1000),
				type: "in-person",
				reason: "Initial Consultation",
				priority: "high",
			},
		],
		recent: [
			{
				id: 3,
				patientName: "Michael Chen",
				patientAge: 28,
				date: "2025-09-28",
				reason: "Annual Checkup",
				duration: "25 min",
				status: "completed",
			},
			{
				id: 4,
				patientName: "Lisa Rodriguez",
				patientAge: 42,
				date: "2025-09-28",
				reason: "Heart Palpitations",
				duration: "35 min",
				status: "completed",
			},
			{
				id: 5,
				patientName: "Robert Johnson",
				patientAge: 67,
				date: "2025-09-27",
				reason: "Hypertension Follow-up",
				duration: "20 min",
				status: "completed",
			},
			{
				id: 6,
				patientName: "Anna Davis",
				patientAge: 31,
				date: "2025-09-27",
				reason: "Chest Pain Evaluation",
				duration: "40 min",
				status: "completed",
			},
		],
	},
	notifications: [
		{
			id: 1,
			message: "Lab results available for Emma Thompson",
			time: "10 min ago",
			type: "urgent",
		},
		{
			id: 2,
			message: "Patient feedback received (5 stars)",
			time: "1 hour ago",
			type: "positive",
		},
		{
			id: 3,
			message: "Appointment rescheduled by James Wilson",
			time: "2 hours ago",
			type: "info",
		},
	],
};

const WidgetCard = ({
	children,
	className = "",
	gradient = false,
	...props
}) => {
	const cardVariants = {
		hidden: { opacity: 0, y: 30, scale: 0.95 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.7,
				ease: [0.25, 0.46, 0.45, 0.94],
				staggerChildren: 0.1,
			},
		},
	};

	const baseClasses = `rounded-xl p-6 shadow-2xl flex flex-col relative overflow-hidden ${className}`;
	const backgroundClasses = gradient
		? "bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F]"
		: "bg-[#0A192F] backdrop-blur-lg";

	return (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.3 }}
			whileHover={{
				y: -5,
				scale: 1.02,
				transition: { duration: 0.3, ease: "easeOut" },
			}}
			className={`${baseClasses} ${backgroundClasses}`}
			{...props}
		>
			<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#64ffda] via-[#34D399] to-[#64ffda]' />
			{children}
		</motion.div>
	);
};

const ActionButton = ({
	children,
	icon: Icon,
	className = "",
	variant = "primary",
	...props
}) => {
	const variants = {
		primary:
			"bg-gradient-to-r from-[#64ffda] to-[#34D399] text-[#020C1B] hover:from-[#34D399] hover:to-[#64ffda]",
		secondary:
			"bg-gradient-to-r from-[#233554] to-[#2D4A6B] text-[#ccd6f6] hover:from-[#2D4A6B] hover:to-[#3A5A7D]",
		danger: "bg-gradient-to-r from-[#FF6B6B] to-[#EE5A52] text-white hover:from-[#EE5A52] hover:to-[#FF6B6B]",
	};

	return (
		<motion.button
			whileHover={{
				scale: 1.05,
				boxShadow: "0 8px 30px rgba(100, 255, 218, 0.3)",
				filter: "brightness(1.1)",
			}}
			whileTap={{ scale: 0.95 }}
			className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg ${variants[variant]} ${className}`}
			{...props}
		>
			{Icon && <Icon size={20} />}
			{children}
		</motion.button>
	);
};

const StatCard = ({ icon: Icon, value, label, trend, color = "[#64ffda]" }) => (
	<motion.div
		className='bg-[#020C1B] rounded-lg p-4 border border-[#233554] hover:border-[#64ffda]/30 transition-all duration-300'
		whileHover={{ scale: 1.05, y: -2 }}
	>
		<div className='flex items-center justify-between mb-2'>
			<Icon className={`text-${color}`} size={24} />
			{trend && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className={`flex items-center gap-1 text-sm ${
						trend > 0 ? "text-green-400" : "text-red-400"
					}`}
				>
					<TrendingUp size={16} />
					{Math.abs(trend)}%
				</motion.div>
			)}
		</div>
		<motion.p
			className='text-2xl font-bold text-white mb-1'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2 }}
		>
			{value}
		</motion.p>
		<p className='text-sm text-[#8892b0]'>{label}</p>
	</motion.div>
);

const UpcomingAppointmentWidget = ({ appointments }) => {
	const now = new Date();
	const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
	const navigate = useNavigate();

	const upcomingAppointment = appointments?.upcoming?.find(app => {
		const appTime = new Date(app.time);
		return appTime > now && appTime <= twoHoursFromNow;
	});

	const formatTime = date =>
		new Date(date).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

	const getPriorityColor = priority => {
		switch (priority) {
			case "high":
				return "text-red-400 bg-red-400/10";
			case "medium":
				return "text-yellow-400 bg-yellow-400/10";
			case "low":
				return "text-green-400 bg-green-400/10";
			default:
				return "text-[#8892b0] bg-[#8892b0]/10";
		}
	};

	return (
		<WidgetCard className='justify-between space-y-6 group' gradient>
			<div>
				<div className='flex items-center gap-3 mb-4'>
					<Clock className='text-[#64ffda]' size={24} />
					<h2 className='text-xl font-bold text-[#ccd6f6]'>
						Next Appointment
					</h2>
				</div>
				<div className='bg-[#020C1B] p-5 rounded-xl min-h-[140px] flex items-center justify-center border border-[#233554]'>
					{upcomingAppointment ? (
						<motion.div
							className='text-left w-full space-y-4'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='w-12 h-12 bg-gradient-to-br from-[#64ffda]/20 to-[#34D399]/20 rounded-full flex items-center justify-center'>
										<Stethoscope
											className='text-[#64ffda]'
											size={20}
										/>
									</div>
									<div>
										<p className='font-bold text-white text-lg'>
											{upcomingAppointment.patientName}
										</p>
										<p className='text-sm text-[#8892b0]'>
											Age:{" "}
											{upcomingAppointment.patientAge} •{" "}
											{upcomingAppointment.reason}
										</p>
									</div>
								</div>
								<span
									className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
										upcomingAppointment.priority
									)}`}
								>
									{upcomingAppointment.priority?.toUpperCase()}
								</span>
							</div>
							<div className='flex items-center gap-3 text-[#ccd6f6]'>
								{upcomingAppointment.type === "online" ? (
									<Video
										size={18}
										className='text-[#64ffda]'
									/>
								) : (
									<MapPin
										size={18}
										className='text-[#64ffda]'
									/>
								)}
								<p className='font-medium'>
									{upcomingAppointment.type === "online"
										? `Video Call at ${formatTime(
												upcomingAppointment.time
										  )}`
										: `In-Person at ${formatTime(
												upcomingAppointment.time
										  )}`}
								</p>
							</div>
						</motion.div>
					) : (
						<div className='text-center text-[#8892b0]'>
							<Activity
								className='mx-auto mb-3 opacity-50'
								size={40}
							/>
							<p>No appointments in the next 2 hours.</p>
						</div>
					)}
				</div>
			</div>
			<div className='grid grid-cols-2 gap-3'>
				<ActionButton
					icon={
						upcomingAppointment?.type === "online"
							? Video
							: Calendar
					}
					className='text-sm py-3'
					onClick={() => {
						if (upcomingAppointment?.type === "online") {
							navigate("/doctor/online-appointment");
						}
					}}
				>
					{upcomingAppointment?.type === "online"
						? "Join Call"
						: "View Schedule"}
				</ActionButton>
				<ActionButton
					icon={Phone}
					variant='secondary'
					className='text-sm py-3'
				>
					Call Patient
				</ActionButton>
			</div>
		</WidgetCard>
	);
};

const TodayStatsWidget = ({ stats }) => (
	<WidgetCard className='space-y-6' gradient>
		<div className='flex items-center gap-3'>
			<Activity className='text-[#64ffda]' size={24} />
			<h2 className='text-xl font-bold text-[#ccd6f6]'>
				Today's Overview
			</h2>
		</div>
		<div className='grid grid-cols-2 gap-4'>
			<StatCard
				icon={UserCheck}
				value={stats.appointmentsCompleted}
				label='Completed'
				trend={12}
			/>
			<StatCard
				icon={Clock}
				value={stats.appointmentsRemaining}
				label='Remaining'
				color='[#ffa726]'
			/>
			<StatCard
				icon={TrendingUp}
				value={`$${stats.totalRevenue}`}
				label='Revenue'
				trend={8}
				color='[#66bb6a]'
			/>
			<StatCard
				icon={Activity}
				value={stats.avgConsultationTime}
				label='Avg. Time'
				color='[#ab47bc]'
			/>
		</div>
	</WidgetCard>
);

const QuickActionsWidget = () => {
	const navigate = useNavigate();
	return (
		<WidgetCard className='justify-center items-center text-center space-y-6 bg-gradient-to-br from-[#0A192F] via-[#1a365d] to-[#112240]'>
			<div className='flex flex-col items-center'>
				<div className='w-16 h-16 bg-gradient-to-br from-[#64ffda]/20 to-[#34D399]/20 rounded-full flex items-center justify-center mb-4'>
					<MessageSquare className='text-[#64ffda]' size={28} />
				</div>
				<h2 className='text-xl font-bold text-[#ccd6f6] mb-2'>
					Patient Communication
				</h2>
				<p className='text-[#8892b0] mb-6 max-w-xs'>
					Connect with your patients instantly for urgent
					consultations.
				</p>
			</div>
			<div className='grid grid-cols-1 gap-3 w-full'>
				<ActionButton
					icon={MessageSquare}
					className='text-sm py-3 flex-1'
					onClick={() => {
						navigate("/doctor/chat");
					}}
				>
					Send Message
				</ActionButton>
			</div>
		</WidgetCard>
	);
};

const RecentActivityWidget = ({ appointments }) => {
	const [activeTab, setActiveTab] = useState("recent");
	const [showAll, setShowAll] = useState(false);
	const navigate = useNavigate();

	const TabButton = ({ tabName, label, count }) => (
		<motion.button
			onClick={() => setActiveTab(tabName)}
			className={`relative px-4 py-3 font-semibold transition-all duration-300 flex items-center gap-2 ${
				activeTab === tabName
					? "text-[#64ffda]"
					: "text-[#8892b0] hover:text-[#ccd6f6]"
			}`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			{label}
			{count && (
				<span
					className={`px-2 py-1 rounded-full text-xs ${
						activeTab === tabName
							? "bg-[#64ffda] text-[#020C1B]"
							: "bg-[#233554] text-[#8892b0]"
					}`}
				>
					{count}
				</span>
			)}
			{activeTab === tabName && (
				<motion.div
					className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#64ffda] to-[#34D399]'
					layoutId='underline'
				/>
			)}
		</motion.button>
	);

	const formatDate = dateString =>
		new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});

	const displayAppointments = showAll
		? appointments?.recent
		: appointments?.recent?.slice(0, 3);

	return (
		<WidgetCard className='lg:col-span-2'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-bold text-[#ccd6f6]'>
					Patient Activity
				</h2>
				<Bell className='text-[#64ffda]' size={20} />
			</div>

			<div className='flex border-b border-[#233554] mb-6'>
				<TabButton
					tabName='recent'
					label='Recent Appointments'
					count={appointments?.recent?.length}
				/>
			</div>

			<div className='space-y-3 overflow-y-auto max-h-80 pr-2 custom-scrollbar'>
				<AnimatePresence>
					{displayAppointments?.map((app, index) => (
						<motion.div
							key={app.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ delay: index * 0.1 }}
							whileHover={{
								backgroundColor: "rgba(35, 53, 84, 0.3)",
								scale: 1.02,
								x: 5,
							}}
							className='flex items-center justify-between bg-[#020C1B] p-4 rounded-xl cursor-pointer border border-transparent hover:border-[#64ffda]/30 transition-all duration-300'
						>
							<div className='flex items-center gap-4'>
								<div className='w-10 h-10 bg-gradient-to-br from-[#64ffda]/20 to-[#34D399]/20 rounded-full flex items-center justify-center'>
									<Briefcase
										className='text-[#64ffda]'
										size={18}
									/>
								</div>
								<div>
									<p className='text-white font-medium text-lg'>
										{app.patientName}
									</p>
									<p className='text-sm text-[#8892b0]'>
										{app.reason} • {app.duration}
									</p>
									<p className='text-xs text-[#64ffda] mt-1'>
										Age: {app.patientAge}
									</p>
								</div>
							</div>
							<div className='text-right'>
								<p className='text-sm text-[#8892b0] mb-1'>
									{formatDate(app.date)}
								</p>
								<span className='px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-xs font-medium'>
									COMPLETED
								</span>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			<div className='mt-6 flex gap-3'>
				<ActionButton
					icon={Eye}
					variant='secondary'
					className='flex-1 bg-transparent'
					onClick={() => {
						window.scrollTo(0, 0);
						navigate("/doctor/appointment");
					}}
				>
					View All Appointments
				</ActionButton>
			</div>
		</WidgetCard>
	);
};

const NotificationsWidget = ({ notifications }) => (
	<WidgetCard className='lg:col-span-1'>
		<div className='flex items-center gap-3 mb-6'>
			<Bell className='text-[#64ffda]' size={24} />
			<h2 className='text-xl font-bold text-[#ccd6f6]'>
				Recent Notifications
			</h2>
		</div>
		<div className='space-y-3'>
			{notifications?.map((notification, index) => {
				const getNotificationStyle = type => {
					switch (type) {
						case "urgent":
							return "border-red-400/30 bg-red-400/5";
						case "positive":
							return "border-green-400/30 bg-green-400/5";
						default:
							return "border-[#64ffda]/30 bg-[#64ffda]/5";
					}
				};

				const getIcon = type => {
					switch (type) {
						case "urgent":
							return <Bell className='text-red-400' size={16} />;
						case "positive":
							return (
								<Star className='text-yellow-400' size={16} />
							);
						default:
							return (
								<Bell className='text-[#64ffda]' size={16} />
							);
					}
				};

				return (
					<motion.div
						key={notification.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className={`p-4 rounded-lg border ${getNotificationStyle(
							notification.type
						)} hover:scale-102 transition-all duration-300`}
					>
						<div className='flex items-start gap-3'>
							{getIcon(notification.type)}
							<div className='flex-1'>
								<p className='text-white text-sm font-medium mb-1'>
									{notification.message}
								</p>
								<p className='text-xs text-[#8892b0]'>
									{notification.time}
								</p>
							</div>
						</div>
					</motion.div>
				);
			})}
		</div>
		<ActionButton icon={Eye} variant='secondary' className='mt-4'>
			View All Notifications
		</ActionButton>
	</WidgetCard>
);

export default function DoctorDashboard() {
	const message = `Welcome back, ${doctorData.name}.`;
	const sentence = {
		hidden: {},
		visible: { transition: { delay: 0.5, staggerChildren: 0.08 } },
	};
	const letter = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	const scrollToMain = () => {
		setTimeout(() => {
			document.getElementById("main-content").scrollIntoView({
				behavior: "smooth",
			});
		}, 300);
	};

	const FloatingShape = ({
		className,
		delay,
		duration,
		initial,
		animate,
	}) => (
		<motion.div
			className={className}
			initial={initial}
			animate={animate}
			transition={{
				duration,
				repeat: Infinity,
				delay,
				ease: "easeInOut",
			}}
		/>
	);

	return (
		<div>
			<div className='relative h-screen flex flex-col justify-center items-center text-center bg-[#020C1B] px-4 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center z-0'
					style={{
						backgroundImage: `url(https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop)`,
					}}
				>
					<div className='absolute inset-0 bg-gradient-to-t from-[#020C1B] via-[#020C1B]/85 to-[#020C1B]/70'></div>
				</div>

				{/* Enhanced floating elements */}
				<FloatingShape
					className='absolute top-[10%] left-[10%] w-16 h-16 bg-gradient-to-br from-[#64ffda]/20 to-transparent rounded-full blur-sm'
					delay={0}
					duration={8}
					initial={{ y: 0, opacity: 0 }}
					animate={{ y: [-20, 20, -20], opacity: [0, 0.6, 0] }}
				/>
				<FloatingShape
					className='absolute top-[15%] right-[15%] w-12 h-12 border-2 border-[#64ffda]/30 rounded-lg'
					delay={2}
					duration={10}
					initial={{ opacity: 0, rotate: 0 }}
					animate={{ opacity: [0, 0.8, 0], rotate: 360 }}
				/>
				<FloatingShape
					className='absolute bottom-[20%] left-[20%] w-20 h-20 bg-gradient-to-br from-[#34D399]/15 to-[#64ffda]/15 rounded-2xl blur-md'
					delay={4}
					duration={12}
					initial={{ y: 0, opacity: 0, scale: 0.8 }}
					animate={{
						y: [-30, 30, -30],
						opacity: [0, 0.5, 0],
						scale: [0.8, 1.2, 0.8],
					}}
				/>
				<FloatingShape
					className='absolute bottom-[25%] right-[25%] w-8 h-8 border border-[#64ffda]/20 rounded-full'
					delay={6}
					duration={7}
					initial={{ scale: 0 }}
					animate={{ scale: [0, 1.5, 0] }}
				/>

				<div className='relative z-10'>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className='mb-8'
					>
						<div className='flex items-center justify-center gap-4 mb-4'>
							<div className='w-16 h-16 bg-gradient-to-br from-[#64ffda] to-[#34D399] rounded-full flex items-center justify-center'>
								<Stethoscope
									className='text-[#020C1B]'
									size={28}
								/>
							</div>
							<div className='text-left'>
								<p className='text-[#64ffda] font-semibold'>
									{doctorData.specialization}
								</p>
								<div className='flex items-center gap-2'>
									<Star
										className='text-yellow-400 fill-current'
										size={16}
									/>
									<span className='text-[#ccd6f6] font-bold'>
										{doctorData.rating}
									</span>
									<span className='text-[#8892b0]'>
										• {doctorData.totalPatients} patients
									</span>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.h1
						variants={sentence}
						initial='hidden'
						animate='visible'
						className='text-4xl md:text-6xl lg:text-7xl font-bold text-[#ccd6f6] mb-6'
					>
						{message.split("").map((char, index) => (
							<motion.span
								key={char + "-" + index}
								variants={letter}
							>
								{char}
							</motion.span>
						))}
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2, duration: 1 }}
						className='text-lg md:text-xl text-[#8892b0] max-w-2xl mb-8'
					>
						Your comprehensive medical practice dashboard. Manage
						patients, track progress, and deliver exceptional care.
					</motion.p>

					<ScrollLink
						to='dashboard'
						smooth='true'
						duration={800}
						offset={-50}
					>
						<motion.button
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 2.5, duration: 0.5 }}
							whileHover={{
								scale: 1.05,
								boxShadow:
									"0px 0px 20px rgba(100, 255, 218, 0.6)",
							}}
							whileTap={{ scale: 0.95 }}
							onClick={scrollToMain}
							className='flex items-center gap-3 bg-gradient-to-r from-[#64ffda] to-[#34D399] text-[#020C1B] font-bold text-lg py-4 px-10 rounded-lg shadow-2xl'
						>
							View Dashboard
							<motion.div
								animate={{ y: [0, 8, 0] }}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							>
								<ArrowDown size={24} />
							</motion.div>
						</motion.button>
					</ScrollLink>
				</div>
			</div>

			<div
				id='main-content'
				className='bg-[#020C1B] text-[#8892b0] font-sans'
			>
				<style>{`.custom-scrollbar::-webkit-scrollbar{height:8px;width:8px;}.custom-scrollbar::-webkit-scrollbar-track{background:#020C1B;border-radius:10px;}.custom-scrollbar::-webkit-scrollbar-thumb{background-color:#233554;border-radius:10px;border:2px solid #020C1B;}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background-color:#8892b0;}`}</style>

				<Element name='dashboard'>
					<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className='text-center mb-16'
						>
							<h1 className='text-5xl font-bold text-[#ccd6f6] mb-4'>
								Medical Dashboard
							</h1>
							<p className='text-xl text-[#8892b0] max-w-3xl mx-auto'>
								Monitor your practice, connect with patients,
								and streamline your medical workflow
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							<UpcomingAppointmentWidget
								appointments={doctorData.appointments}
							/>
							<TodayStatsWidget stats={doctorData.todayStats} />
							<QuickActionsWidget />
							<RecentActivityWidget
								appointments={doctorData.appointments}
							/>
							<NotificationsWidget
								notifications={doctorData.notifications}
							/>
						</div>
					</main>
				</Element>
			</div>
		</div>
	);
}

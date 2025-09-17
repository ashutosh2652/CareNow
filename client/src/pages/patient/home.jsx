import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
	ArrowDown,
	Video,
	MapPin,
	Stethoscope,
	MessageSquare,
	Briefcase,
	ReceiptText,
	HeartPulse,
	Weight,
	Ruler,
	CalendarPlus,
	LineChart,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

const { Link: ScrollLink, Element } = window.ReactScroll || {
	Link: "a",
	Element: "div",
};

const upcomingOnlineDate = new Date();
upcomingOnlineDate.setMinutes(upcomingOnlineDate.getMinutes() + 90);

const patientData = {
	name: "Alex Doe",
	vitals: {
		bmi: 28.5,
		weight: "85 kg",
		height: "172 cm",
	},
	appointments: {
		upcoming: [
			{
				id: 1,
				doctorName: "Dr. Evelyn Reed",
				specialization: "Cardiologist",
				time: upcomingOnlineDate,
				type: "online",
			},
		],
		recent: [
			{
				id: 2,
				doctorName: "Dr. Ben Carter",
				date: "2025-09-12",
				reason: "Annual Checkup",
			},
			{
				id: 3,
				doctorName: "Dr. Olivia Chen",
				date: "2025-08-28",
				reason: "Follow-up",
			},
			{
				id: 4,
				doctorName: "Dr. Marcus Thorne",
				date: "2025-07-15",
				reason: "Initial Consultation",
			},
		],
	},
	transactions: [
		{
			id: "t1",
			description: "Consultation: Dr. Reed",
			amount: -75.0,
			date: "2025-09-12",
		},
		{
			id: "t2",
			description: "Pharmacy: Wellness Drugs",
			amount: -32.5,
			date: "2025-09-12",
		},
		{
			id: "t3",
			description: "Insurance Reimbursement",
			amount: 107.5,
			date: "2025-09-10",
		},
	],
	savedDoctors: [
		{
			id: "d1",
			name: "Dr. Evelyn Reed",
			specialization: "Cardiologist",
			photo: `https://i.pravatar.cc/150?img=1`,
		},
		{
			id: "d2",
			name: "Dr. Ben Carter",
			specialization: "Dermatologist",
			photo: `https://i.pravatar.cc/150?img=2`,
		},
		{
			id: "d3",
			name: "Dr. Olivia Chen",
			specialization: "Pediatrician",
			photo: `https://i.pravatar.cc/150?img=3`,
		},
		{
			id: "d4",
			name: "Dr. Marcus Thorne",
			specialization: "Neurologist",
			photo: `https://i.pravatar.cc/150?img=4`,
		},
		{
			id: "d5",
			name: "Dr. Sofia Rossi",
			specialization: "Endocrinologist",
			photo: `https://i.pravatar.cc/150?img=5`,
		},
		{
			id: "d6",
			name: "Dr. Liam Harris",
			specialization: "Orthopedist",
			photo: `https://i.pravatar.cc/150?img=6`,
		},
		{
			id: "d7",
			name: "Dr. Ava Wong",
			specialization: "Gynecologist",
			photo: `https://i.pravatar.cc/150?img=8`,
		},
		{
			id: "d8",
			name: "Dr. Noah Patel",
			specialization: "Psychiatrist",
			photo: `https://i.pravatar.cc/150?img=10`,
		},
	],
};

const WidgetCard = ({ children, className = "", ...props }) => {
	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" },
		},
	};
	return (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.3 }}
			className={`bg-[#0A192F] rounded-lg p-6 shadow-lg flex flex-col ${className}`}
			{...props}
		>
			{children}
		</motion.div>
	);
};

const ActionButton = ({ children, icon: Icon, className = "", ...props }) => (
	<motion.button
		whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
		whileTap={{ scale: 0.95 }}
		className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#64ffda] to-[#34D399] text-[#020C1B] font-bold py-3 px-4 rounded-md transition-all duration-300 ${className}`}
		{...props}
	>
		{Icon && <Icon size={20} />}
		{children}
	</motion.button>
);

const UpcomingAppointmentWidget = ({ appointments }) => {
	const now = new Date();
	const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

	const upcomingAppointment = appointments?.upcoming?.find(app => {
		const appTime = new Date(app.time);
		return appTime > now && appTime <= twoHoursFromNow;
	});

	const formatTime = date =>
		new Date(date).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

	return (
		<WidgetCard className='justify-between space-y-6'>
			<div>
				<h2 className='text-xl font-bold text-[#ccd6f6] mb-4'>
					Upcoming Appointment
				</h2>
				<div className='bg-[#020C1B] p-4 rounded-lg min-h-[120px] flex items-center justify-center'>
					{upcomingAppointment ? (
						<div className='text-left w-full space-y-3'>
							<div className='flex items-center gap-3'>
								<Stethoscope
									className='text-[#64ffda]'
									size={24}
								/>
								<div>
									<p className='font-bold text-white'>
										{upcomingAppointment.doctorName}
									</p>
									<p className='text-sm text-[#8892b0]'>
										{upcomingAppointment.specialization}
									</p>
								</div>
							</div>
							<div className='flex items-center gap-3 text-[#ccd6f6]'>
								{upcomingAppointment.type === "online" ? (
									<Video
										size={20}
										className='text-[#64ffda]'
									/>
								) : (
									<MapPin
										size={20}
										className='text-[#64ffda]'
									/>
								)}
								<p>
									{upcomingAppointment.type === "online"
										? `Online Meeting at ${formatTime(
												upcomingAppointment.time
										  )}`
										: upcomingAppointment.address}
								</p>
							</div>
						</div>
					) : (
						<p className='text-[#8892b0] text-center'>
							No appointments in the next 2 hours.
						</p>
					)}
				</div>
			</div>
			<ActionButton
				icon={
					upcomingAppointment?.type === "online"
						? Video
						: CalendarPlus
				}
			>
				{upcomingAppointment?.type === "online"
					? "Join Meeting"
					: "Book New Appointment"}
			</ActionButton>
		</WidgetCard>
	);
};

const HealthVitalsWidget = ({ vitals }) => {
	const getBmiStatus = bmi => {
		if (!bmi) return { text: "N/A", color: "text-gray-400" };
		if (bmi < 18.5)
			return { text: "Underweight", color: "text-yellow-400" };
		if (bmi >= 18.5 && bmi <= 24.9)
			return { text: "Normal", color: "text-green-400" };
		if (bmi >= 25 && bmi <= 29.9)
			return { text: "Overweight", color: "text-orange-400" };
		return { text: "Obese", color: "text-red-500" };
	};

	const bmiStatus = getBmiStatus(vitals?.bmi);
	const containerVariants = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
	};
	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 },
	};

	const VitalStat = ({ icon: Icon, value, label, status }) => (
		<motion.div variants={itemVariants} className='flex items-center gap-4'>
			<div className='bg-[#020C1B] p-3 rounded-full'>
				{" "}
				<Icon
					className={status?.color || "text-[#64ffda]"}
					size={24}
				/>{" "}
			</div>
			<div>
				<p className='text-lg font-bold text-white'>{value || "N/A"}</p>
				<p className='text-sm text-[#8892b0]'>
					{label}{" "}
					{status && (
						<span className={`font-semibold ${status.color}`}>
							({status.text})
						</span>
					)}
				</p>
			</div>
		</motion.div>
	);

	return (
		<WidgetCard className='justify-between space-y-6'>
			<div>
				<h2 className='text-xl font-bold text-[#ccd6f6] mb-4'>
					Health Vitals
				</h2>
				{vitals && Object.keys(vitals).length > 0 ? (
					<motion.div
						className='space-y-4'
						variants={containerVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
					>
						<VitalStat
							icon={HeartPulse}
							value={vitals.bmi}
							label='BMI'
							status={bmiStatus}
						/>
						<VitalStat
							icon={Weight}
							value={vitals.weight}
							label='Weight'
						/>
						<VitalStat
							icon={Ruler}
							value={vitals.height}
							label='Height'
						/>
					</motion.div>
				) : (
					<div className='text-center text-[#8892b0] min-h-[150px] flex items-center justify-center'>
						<p>Update your details to view vitals.</p>
					</div>
				)}
			</div>
			<ActionButton icon={LineChart}>View Health History</ActionButton>
		</WidgetCard>
	);
};

const QuickActionsWidget = () => (
	<WidgetCard className='justify-center items-center text-center space-y-4 bg-gradient-to-br from-[#0A192F] to-[#112240]'>
		<h2 className='text-xl font-bold text-[#ccd6f6]'>Quick Actions</h2>
		<p className='text-[#8892b0]'>
			Need help? Reach out to your provider instantly.
		</p>
		<ActionButton icon={MessageSquare} className='mt-2'>
			Chat with Your Doctor
		</ActionButton>
	</WidgetCard>
);

const RecentActivityWidget = ({ appointments, transactions }) => {
	const [activeTab, setActiveTab] = useState("appointments");
	const TabButton = ({ tabName, label }) => (
		<button
			onClick={() => setActiveTab(tabName)}
			className={`w-full relative py-2 font-semibold transition-colors duration-300 ${
				activeTab === tabName
					? "text-[#64ffda]"
					: "text-[#8892b0] hover:text-[#ccd6f6]"
			}`}
		>
			{label}
			{activeTab === tabName && (
				<motion.div
					className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#64ffda]'
					layoutId='underline'
				/>
			)}
		</button>
	);
	const formatDate = dateString =>
		new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});

	return (
		<WidgetCard className='lg:col-span-2'>
			<h2 className='text-xl font-bold text-[#ccd6f6] mb-4'>
				Recent Activity
			</h2>
			<div className='flex border-b border-[#233554] mb-4'>
				<TabButton tabName='appointments' label='Appointments' />
				<TabButton tabName='transactions' label='Transactions' />
			</div>
			<div className='space-y-3 overflow-y-auto h-48 pr-2 custom-scrollbar'>
				{activeTab === "appointments" &&
					appointments?.recent?.slice(0, 3).map(app => (
						<motion.div
							key={app.id}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							whileHover={{
								backgroundColor: "rgba(35, 53, 84, 0.5)",
								scale: 1.02,
							}}
							className='flex items-center justify-between bg-[#020C1B] p-3 rounded-md cursor-pointer'
						>
							<div className='flex items-center gap-3'>
								<Briefcase
									className='text-[#64ffda]'
									size={20}
								/>
								<div>
									<p className='text-white font-medium'>
										{app.reason}
									</p>
									<p className='text-sm text-[#8892b0]'>
										{app.doctorName}
									</p>
								</div>
							</div>
							<p className='text-sm text-[#8892b0]'>
								{formatDate(app.date)}
							</p>
						</motion.div>
					))}
				{activeTab === "transactions" &&
					transactions?.slice(0, 3).map(t => (
						<motion.div
							key={t.id}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							whileHover={{
								backgroundColor: "rgba(35, 53, 84, 0.5)",
								scale: 1.02,
							}}
							className='flex items-center justify-between bg-[#020C1B] p-3 rounded-md cursor-pointer'
						>
							<div className='flex items-center gap-3'>
								<ReceiptText
									className='text-[#64ffda]'
									size={20}
								/>
								<div>
									<p className='text-white font-medium'>
										{t.description}
									</p>
									<p className='text-sm text-[#8892b0]'>
										{formatDate(t.date)}
									</p>
								</div>
							</div>
							<p
								className={`font-semibold ${
									t.amount > 0
										? "text-green-400"
										: "text-red-400"
								}`}
							>
								{t.amount > 0 ? "+" : ""}$
								{Math.abs(t.amount).toFixed(2)}
							</p>
						</motion.div>
					))}
			</div>
		</WidgetCard>
	);
};

const MySavedDoctorsWidget = ({ doctors }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);
	const containerRef = useRef(null);

	useEffect(() => {
		const updateWidth = () => {
			if (containerRef.current) {
				setContainerWidth(containerRef.current.offsetWidth);
			}
		};
		updateWidth();
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	const cardsPerPage = useMemo(() => {
		if (containerWidth < 768) return 2;
		if (containerWidth < 1024) return 3;
		return 4;
	}, [containerWidth]);

	const totalPages = doctors ? Math.ceil(doctors.length / cardsPerPage) : 0;

	const handleNav = direction => {
		setCurrentIndex(prev => {
			const newIndex = direction === "next" ? prev + 1 : prev - 1;
			return Math.max(0, Math.min(newIndex, totalPages - 1));
		});
	};

	const cardGap = 16;
	const cardWidthStyle = {
		flex: `0 0 calc((100% - ${
			(cardsPerPage - 1) * cardGap
		}px) / ${cardsPerPage})`,
	};

	return (
		<WidgetCard className='lg:col-span-3'>
			<div className='flex flex-col sm:flex-row justify-between items-center mb-4 gap-4'>
				<h2 className='text-xl font-bold text-[#ccd6f6]'>
					My Saved Doctors
				</h2>
				<div className='flex items-center gap-2'>
					{Array.from({ length: totalPages }).map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrentIndex(i)}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								currentIndex === i
									? "bg-[#64ffda] w-4"
									: "bg-[#233554] hover:bg-[#8892b0]"
							}`}
						></button>
					))}
				</div>
			</div>
			<div className='relative'>
				<div ref={containerRef} className='overflow-hidden'>
					<motion.div
						className='flex'
						style={{ gap: `${cardGap}px` }}
						animate={{
							x: -currentIndex * (containerWidth + cardGap),
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
						}}
					>
						{doctors?.map(doctor => (
							<motion.div
								key={doctor.id}
								style={cardWidthStyle}
								className='text-center bg-[#020C1B] p-4 rounded-lg space-y-2 cursor-pointer'
							>
								<img
									src={doctor.photo}
									alt={doctor.name}
									className='w-24 h-24 rounded-full mx-auto border-2 border-[#233554] pointer-events-none'
								/>
								<div>
									<p className='text-white font-bold'>
										{doctor.name}
									</p>
									<p className='text-sm text-[#8892b0]'>
										{doctor.specialization}
									</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={() => handleNav("prev")}
					disabled={currentIndex === 0}
					className='absolute top-1/2 -translate-y-1/2 left-0 z-10 disabled:opacity-30 disabled:cursor-not-allowed bg-black/40 hover:bg-black/70 p-2 rounded-full transition-opacity'
				>
					<ChevronLeft className='text-[#64ffda]' />
				</motion.button>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={() => handleNav("next")}
					disabled={currentIndex >= totalPages - 1}
					className='absolute top-1/2 -translate-y-1/2 right-0 z-10 disabled:opacity-30 disabled:cursor-not-allowed bg-black/40 hover:bg-black/70 p-2 rounded-full transition-opacity'
				>
					<ChevronRight className='text-[#64ffda]' />
				</motion.button>
			</div>
		</WidgetCard>
	);
};

export default function Home() {
	const message = `Welcome, ${patientData.name}.`;
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
						backgroundImage: `url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop)`,
					}}
				>
					<div className='absolute inset-0 bg-gradient-to-t from-[#020C1B] via-[#020C1B]/80 to-transparent'></div>
				</div>
				<FloatingShape
					className='absolute top-[10%] left-[10%] w-12 h-12 bg-gradient-to-br from-[#64ffda]/10 to-transparent rounded-full'
					delay={0}
					duration={8}
					initial={{ y: 0, opacity: 0 }}
					animate={{ y: [-15, 15, -15], opacity: [0, 0.3, 0] }}
				/>
				<FloatingShape
					className='absolute top-[20%] right-[15%] w-8 h-8 border-2 border-[#64ffda]/20'
					delay={2}
					duration={10}
					initial={{ opacity: 0, rotate: 0 }}
					animate={{ opacity: [0, 0.5, 0], rotate: 360 }}
				/>
				<FloatingShape
					className='absolute bottom-[15%] left-[25%] w-16 h-16 bg-[#64ffda]/5 rounded-xl'
					delay={4}
					duration={12}
					initial={{ y: 0, opacity: 0 }}
					animate={{ y: [-25, 25, -25], opacity: [0, 0.4, 0] }}
				/>
				<FloatingShape
					className='absolute bottom-[20%] right-[20%] w-6 h-6 border border-[#64ffda]/10 rounded-full'
					delay={6}
					duration={7}
					initial={{ scale: 0 }}
					animate={{ scale: [0, 1.2, 0] }}
				/>

				<div className='relative z-10'>
					<motion.h1
						variants={sentence}
						initial='hidden'
						animate='visible'
						className='text-4xl md:text-6xl lg:text-7xl font-bold text-[#ccd6f6] mb-4'
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
						Your health journey, simplified and organized. Let's
						take control together.
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
									"0px 0px 12px rgba(100, 255, 218, 0.5)",
							}}
							whileTap={{ scale: 0.95 }}
							onClick={scrollToMain}
							className='flex items-center gap-3 bg-gradient-to-r from-[#64ffda] to-[#34D399] text-[#020C1B] font-bold text-lg py-3 px-8 rounded-md'
						>
							View My Dashboard
							<motion.div
								animate={{ y: [0, 5, 0] }}
								transition={{
									duration: 1.5,
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
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className='text-4xl font-bold text-center text-[#ccd6f6] mb-12'
						>
							Dashboard
						</motion.h1>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							<UpcomingAppointmentWidget
								appointments={patientData.appointments}
							/>
							<HealthVitalsWidget vitals={patientData.vitals} />
							<QuickActionsWidget />
							<RecentActivityWidget
								appointments={patientData.appointments}
								transactions={patientData.transactions}
							/>
							<MySavedDoctorsWidget
								doctors={patientData.savedDoctors}
							/>
						</div>
					</main>
				</Element>
			</div>
		</div>
	);
}

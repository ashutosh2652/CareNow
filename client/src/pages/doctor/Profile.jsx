import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalSection } from "../../components/common/PersonalSection";
import { ContactSection } from "../../components/common/ContactSection";
import { ClinicSection } from "../../components/doctor-view/ClinicSection";
import { AvailabilitySection } from "../../components/doctor-view/AvailabilitySection";
import { DocumentsSection } from "../../components/doctor-view/DocumentsSection";
import { daysOfWeek, documentTypes, timeSlots } from "../../config";

const PatientProfile = () => {
	const [patientData, setPatientData] = useState({
		personalInfo: {
			firstName: "Sarah",
			lastName: "Johnson",
			age: 42,
			gender: "Female",
			dateOfBirth: "1983-05-15",
			maritalStatus: "Married",
		},
		contactInfo: {
			phone: "(555) 123-4567",
			email: "sarah.j@example.com",
			address: "123 Main Street, Apt 4B",
			city: "New York",
			state: "NY",
			zipCode: "10001",
		},
		clinicInfo: {
			name: "Johnson Medical Center",
			address: "456 Healthcare Ave, Medical District",
			consultationFee: 150,
		},
		availability: {},
		documents: [],
	});

	const [isEditing, setIsEditing] = useState(false);
	const [activeSection, setActiveSection] = useState("personal");
	const [selectedFile, setSelectedFile] = useState(null);
	const [selectedDocumentType, setSelectedDocumentType] = useState("");

	const handleInputChange = (section, field, value) => {
		setPatientData(prev => ({
			...prev,
			[section]: { ...prev[section], [field]: value },
		}));
	};

	const handleAvailabilityChange = (day, slot) => {
		setPatientData(prev => ({
			...prev,
			availability: {
				...prev.availability,
				[day]: prev.availability[day]
					? prev.availability[day].includes(slot)
						? prev.availability[day].filter(s => s !== slot)
						: [...prev.availability[day], slot]
					: [slot],
			},
		}));
	};

	const handleFileChange = e => {
		setSelectedFile(e.target.files[0]);
	};

	const handleDocumentUpload = () => {
		if (selectedFile && selectedDocumentType) {
			const newDocument = {
				id: Date.now(),
				type: selectedDocumentType,
				fileName: selectedFile.name,
				uploadDate: new Date().toLocaleDateString(),
			};
			setPatientData(prev => ({
				...prev,
				documents: [...prev.documents, newDocument],
			}));
			setSelectedFile(null);
			setSelectedDocumentType("");
			document.getElementById("fileInput").value = "";
		}
	};

	const handleSave = () => setIsEditing(false);

	const sectionIcons = {
		personal: "👤",
		contact: "📞",
		clinic: "🏥",
		availability: "📅",
		documents: "📋",
	};

	const sectionColors = {
		personal: "from-violet-500 to-purple-600",
		contact: "from-emerald-500 to-teal-600",
		clinic: "from-rose-500 to-pink-600",
		availability: "from-amber-500 to-orange-600",
		documents: "from-cyan-500 to-blue-600",
	};

	const renderSection = () => {
		switch (activeSection) {
			case "personal":
				return (
					<PersonalSection
						data={patientData.personalInfo}
						isEditing={isEditing}
						onChange={handleInputChange}
					/>
				);
			case "contact":
				return (
					<ContactSection
						data={patientData.contactInfo}
						isEditing={isEditing}
						onChange={handleInputChange}
					/>
				);
			case "clinic":
				return (
					<ClinicSection
						data={patientData.clinicInfo}
						isEditing={isEditing}
						onChange={handleInputChange}
					/>
				);
			case "availability":
				return (
					<AvailabilitySection
						data={patientData.availability}
						isEditing={isEditing}
						daysOfWeek={daysOfWeek}
						timeSlots={timeSlots}
						onAvailabilityChange={handleAvailabilityChange}
					/>
				);
			case "documents":
				return (
					<DocumentsSection
						documents={patientData.documents}
						documentTypes={documentTypes}
						selectedDocumentType={selectedDocumentType}
						setSelectedDocumentType={setSelectedDocumentType}
						selectedFile={selectedFile}
						onFileChange={handleFileChange}
						onUpload={handleDocumentUpload}
						isEditing={isEditing}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-8 px-4 relative overflow-hidden'>
			{/* Animated background elements */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700'></div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
			</div>

			<div className='max-w-7xl mx-auto relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className='text-center mb-3 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10'
				>
					<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl mb-2 sm:mb-6 shadow-2xl'>
						<span className='text-3xl'>👩‍⚕️</span>
					</div>
					<h1 className='text-4xl sm:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-1'>
						Edit Your Profile
					</h1>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='flex justify-center sm:justify-end mb-5'
				>
					<div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4'>
						{isEditing ? (
							<>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleSave}
									className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-emerald-500/25 border border-emerald-400/20'
								>
									✓ Save Changes
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setIsEditing(false)}
									className='bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 shadow-2xl border border-slate-600/40 backdrop-blur-sm'
								>
									✕ Cancel
								</motion.button>
							</>
						) : (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsEditing(true)}
								className='bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-violet-500/25 border border-violet-400/20'
							>
								✏️ Edit Profile
							</motion.button>
						)}
					</div>
				</motion.div>

				<div className='grid grid-cols-1 xl:grid-cols-4 gap-8'>
					<div className='xl:col-span-1'>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className='bg-slate-900/60 border border-slate-700/60 rounded-3xl shadow-2xl p-6 sm:p-8 sticky top-8 backdrop-blur-xl'
						>
							<h2 className='text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center'>
								Profile Sections
							</h2>
							<div className='space-y-3'>
								{[
									{ key: "personal", label: "Personal Info" },
									{
										key: "contact",
										label: "Contact Details",
									},
									{ key: "clinic", label: "Clinic Info" },
									{
										key: "availability",
										label: "Availability",
									},
									{ key: "documents", label: "Documents" },
								].map(section => (
									<motion.button
										key={section.key}
										whileHover={{ scale: 1.02, x: 4 }}
										whileTap={{ scale: 0.98 }}
										onClick={() =>
											setActiveSection(section.key)
										}
										className={`w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
											activeSection === section.key
												? `bg-gradient-to-r ${
														sectionColors[
															section.key
														]
												  } text-white font-semibold shadow-2xl`
												: "text-slate-400 hover:bg-slate-800/60 hover:text-white"
										}`}
									>
										<div className='flex items-center space-x-3 sm:space-x-4'>
											<span className='text-xl sm:text-2xl'>
												{sectionIcons[section.key]}
											</span>
											<span className='font-medium text-sm sm:text-base'>
												{section.label}
											</span>
										</div>
										{activeSection === section.key && (
											<motion.div
												layoutId='activeSection'
												className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl'
											/>
										)}
									</motion.button>
								))}
							</div>
						</motion.div>
					</div>

					<div className='xl:col-span-3'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={activeSection}
								initial={{ opacity: 0, y: 30, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -30, scale: 0.95 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className='bg-slate-900/40 border border-slate-700/40 rounded-3xl shadow-2xl p-6 sm:p-10 backdrop-blur-xl'
							>
								{renderSection()}
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PatientProfile;

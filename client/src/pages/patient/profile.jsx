import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
		medicalInfo: {
			bloodGroup: "A+",
			allergies: ["Penicillin", "Peanuts"],
			currentMedications: [
				"Lisinopril 10mg daily",
				"Metformin 500mg twice daily",
			],
			conditions: ["Hypertension", "Type 2 Diabetes"],
		},
		emergencyContacts: [
			{
				name: "Michael Johnson",
				relationship: "Spouse",
				phone: "(555) 987-6543",
			},
			{
				name: "Jennifer Johnson",
				relationship: "Daughter",
				phone: "(555) 456-7890",
			},
		],
	});

	const [isEditing, setIsEditing] = useState(false);
	const [activeSection, setActiveSection] = useState("personal");

	const handleInputChange = (section, field, value) => {
		setPatientData(prev => ({
			...prev,
			[section]: { ...prev[section], [field]: value },
		}));
	};

	const handleEmergencyContactChange = (index, field, value) => {
		const updatedContacts = [...patientData.emergencyContacts];
		updatedContacts[index] = { ...updatedContacts[index], [field]: value };
		setPatientData(prev => ({
			...prev,
			emergencyContacts: updatedContacts,
		}));
	};

	const handleSave = () => setIsEditing(false);

	const handleAddEmergencyContact = () => {
		setPatientData(prev => ({
			...prev,
			emergencyContacts: [
				...prev.emergencyContacts,
				{ name: "", relationship: "", phone: "" },
			],
		}));
	};

	const handleRemoveEmergencyContact = index => {
		setPatientData(prev => ({
			...prev,
			emergencyContacts: prev.emergencyContacts.filter(
				(_, i) => i !== index
			),
		}));
	};

	const sectionIcons = {
		personal: "👤",
		contact: "📞",
		medical: "🏥",
		emergency: "🚨",
	};

	const sectionColors = {
		personal: "from-violet-500 to-purple-600",
		contact: "from-emerald-500 to-teal-600",
		medical: "from-rose-500 to-pink-600",
		emergency: "from-amber-500 to-orange-600",
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
			case "medical":
				return (
					<MedicalSection
						data={patientData.medicalInfo}
						isEditing={isEditing}
						onChange={handleInputChange}
					/>
				);
			case "emergency":
				return (
					<EmergencySection
						data={patientData.emergencyContacts}
						isEditing={isEditing}
						onChange={handleEmergencyContactChange}
						onAdd={handleAddEmergencyContact}
						onRemove={handleRemoveEmergencyContact}
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
					className='text-center mb-16'
				>
					<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl mb-6 shadow-2xl'>
						<span className='text-3xl'>👩‍⚕️</span>
					</div>
					<h1 className='text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4'>
						Patient Profile
					</h1>
					<p className='text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed'>
						Secure, comprehensive management of your personal and
						medical information
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='flex justify-center mb-12'
				>
					<div className='flex space-x-4'>
						{isEditing ? (
							<>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleSave}
									className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-emerald-500/25 border border-emerald-400/20'
								>
									✓ Save Changes
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setIsEditing(false)}
									className='bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl border border-slate-600/40 backdrop-blur-sm'
								>
									✕ Cancel
								</motion.button>
							</>
						) : (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsEditing(true)}
								className='bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-violet-500/25 border border-violet-400/20'
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
							className='bg-slate-900/60 border border-slate-700/60 rounded-3xl shadow-2xl p-8 sticky top-8 backdrop-blur-xl'
						>
							<h2 className='text-2xl font-bold text-white mb-8 text-center'>
								Profile Sections
							</h2>
							<div className='space-y-3'>
								{[
									{ key: "personal", label: "Personal Info" },
									{
										key: "contact",
										label: "Contact Details",
									},
									{ key: "medical", label: "Medical Info" },
									{
										key: "emergency",
										label: "Emergency Contacts",
									},
								].map(section => (
									<motion.button
										key={section.key}
										whileHover={{ scale: 1.02, x: 4 }}
										whileTap={{ scale: 0.98 }}
										onClick={() =>
											setActiveSection(section.key)
										}
										className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
											activeSection === section.key
												? `bg-gradient-to-r ${
														sectionColors[
															section.key
														]
												  } text-white font-semibold shadow-2xl`
												: "text-slate-400 hover:bg-slate-800/60 hover:text-white"
										}`}
									>
										<div className='flex items-center space-x-4'>
											<span className='text-2xl'>
												{sectionIcons[section.key]}
											</span>
											<span className='font-medium'>
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
								className='bg-slate-900/40 border border-slate-700/40 rounded-3xl shadow-2xl p-10 backdrop-blur-xl'
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

// --- Enhanced Components ---

const ProfileInput = ({ label, value, icon, ...props }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.3 }}
		className='group'
	>
		<label className='block text-sm font-semibold text-slate-300 mb-3 flex items-center space-x-2'>
			{icon && <span>{icon}</span>}
			<span>{label}</span>
		</label>
		<input
			{...props}
			value={value}
			className='w-full px-6 py-4 bg-slate-800/60 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400/50 transition-all duration-300 text-white placeholder-slate-400 disabled:bg-slate-800/40 disabled:cursor-not-allowed disabled:text-slate-400 backdrop-blur-sm shadow-lg group-hover:border-slate-500/60'
		/>
	</motion.div>
);

const ProfileSelect = ({ label, value, children, icon, ...props }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.3 }}
		className='group'
	>
		<label className='block text-sm font-semibold text-slate-300 mb-3 flex items-center space-x-2'>
			{icon && <span>{icon}</span>}
			<span>{label}</span>
		</label>
		<select
			{...props}
			value={value}
			className='w-full px-6 py-4 bg-slate-800/60 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400/50 transition-all duration-300 text-white disabled:bg-slate-800/40 disabled:cursor-not-allowed disabled:text-slate-400 backdrop-blur-sm shadow-lg group-hover:border-slate-500/60'
		>
			{children}
		</select>
	</motion.div>
);

const PersonalSection = ({ data, isEditing, onChange }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex items-center space-x-4 mb-10'>
			<div className='w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl'>
				<span className='text-2xl'>👤</span>
			</div>
			<div>
				<h2 className='text-3xl font-bold text-white'>
					Personal Information
				</h2>
				<p className='text-slate-400 mt-1'>
					Basic personal details and identification
				</p>
			</div>
		</div>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
			<ProfileInput
				label='First Name'
				icon='📝'
				value={data.firstName}
				onChange={e =>
					onChange("personalInfo", "firstName", e.target.value)
				}
				disabled={!isEditing}
				placeholder='Enter first name'
			/>
			<ProfileInput
				label='Last Name'
				icon='📝'
				value={data.lastName}
				onChange={e =>
					onChange("personalInfo", "lastName", e.target.value)
				}
				disabled={!isEditing}
				placeholder='Enter last name'
			/>
			<ProfileInput
				label='Age'
				icon='🎂'
				type='number'
				value={data.age}
				onChange={e => onChange("personalInfo", "age", e.target.value)}
				disabled={!isEditing}
				placeholder='Enter age'
			/>
			<ProfileSelect
				label='Gender'
				icon='⚧️'
				value={data.gender}
				onChange={e =>
					onChange("personalInfo", "gender", e.target.value)
				}
				disabled={!isEditing}
			>
				<option>Female</option>
				<option>Male</option>
				<option>Other</option>
				<option>Prefer not to say</option>
			</ProfileSelect>
			<div className='md:col-span-2'>
				<ProfileInput
					label='Date of Birth'
					icon='📅'
					type='date'
					value={data.dateOfBirth}
					onChange={e =>
						onChange("personalInfo", "dateOfBirth", e.target.value)
					}
					disabled={!isEditing}
				/>
			</div>
		</div>
	</motion.div>
);

const ContactSection = ({ data, isEditing, onChange }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex items-center space-x-4 mb-10'>
			<div className='w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl'>
				<span className='text-2xl'>📞</span>
			</div>
			<div>
				<h2 className='text-3xl font-bold text-white'>
					Contact Information
				</h2>
				<p className='text-slate-400 mt-1'>
					Phone, email, and address details
				</p>
			</div>
		</div>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
			<ProfileInput
				label='Phone Number'
				icon='📱'
				type='tel'
				value={data.phone}
				onChange={e => onChange("contactInfo", "phone", e.target.value)}
				disabled={!isEditing}
				placeholder='Enter phone number'
			/>
			<ProfileInput
				label='Email Address'
				icon='📧'
				type='email'
				value={data.email}
				onChange={e => onChange("contactInfo", "email", e.target.value)}
				disabled={!isEditing}
				placeholder='Enter email address'
			/>
			<div className='md:col-span-2'>
				<ProfileInput
					label='Street Address'
					icon='🏠'
					value={data.address}
					onChange={e =>
						onChange("contactInfo", "address", e.target.value)
					}
					disabled={!isEditing}
					placeholder='Enter street address'
				/>
			</div>
			<ProfileInput
				label='City'
				icon='🏙️'
				value={data.city}
				onChange={e => onChange("contactInfo", "city", e.target.value)}
				disabled={!isEditing}
				placeholder='Enter city'
			/>
			<ProfileInput
				label='State'
				icon='📍'
				value={data.state}
				onChange={e => onChange("contactInfo", "state", e.target.value)}
				disabled={!isEditing}
				placeholder='Enter state'
			/>
			<ProfileInput
				label='ZIP Code'
				icon='📮'
				value={data.zipCode}
				onChange={e =>
					onChange("contactInfo", "zipCode", e.target.value)
				}
				disabled={!isEditing}
				placeholder='Enter ZIP code'
			/>
		</div>
	</motion.div>
);

const MedicalSection = ({ data, isEditing, onChange }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex items-center space-x-4 mb-10'>
			<div className='w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl'>
				<span className='text-2xl'>🏥</span>
			</div>
			<div>
				<h2 className='text-3xl font-bold text-white'>
					Medical Information
				</h2>
				<p className='text-slate-400 mt-1'>
					Health records, medications, and conditions
				</p>
			</div>
		</div>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
			<ProfileSelect
				label='Blood Group'
				icon='🩸'
				value={data.bloodGroup}
				onChange={e =>
					onChange("medicalInfo", "bloodGroup", e.target.value)
				}
				disabled={!isEditing}
			>
				<option>A+</option>
				<option>A-</option>
				<option>B+</option>
				<option>B-</option>
				<option>AB+</option>
				<option>AB-</option>
				<option>O+</option>
				<option>O-</option>
			</ProfileSelect>
			<div className='md:col-span-2'>
				<ProfileInput
					label='Known Allergies'
					icon='⚠️'
					value={data.allergies.join(", ")}
					onChange={e =>
						onChange(
							"medicalInfo",
							"allergies",
							e.target.value.split(",").map(s => s.trim())
						)
					}
					disabled={!isEditing}
					placeholder='Enter allergies (comma-separated)'
				/>
			</div>
			<div className='md:col-span-2'>
				<ProfileInput
					label='Current Medications'
					icon='💊'
					value={data.currentMedications.join(", ")}
					onChange={e =>
						onChange(
							"medicalInfo",
							"currentMedications",
							e.target.value.split(",").map(s => s.trim())
						)
					}
					disabled={!isEditing}
					placeholder='Enter current medications (comma-separated)'
				/>
			</div>
			<div className='md:col-span-2'>
				<ProfileInput
					label='Medical Conditions'
					icon='📋'
					value={data.conditions.join(", ")}
					onChange={e =>
						onChange(
							"medicalInfo",
							"conditions",
							e.target.value.split(",").map(s => s.trim())
						)
					}
					disabled={!isEditing}
					placeholder='Enter medical conditions (comma-separated)'
				/>
			</div>
		</div>
	</motion.div>
);

const EmergencySection = ({ data, isEditing, onChange, onAdd, onRemove }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex items-center justify-between mb-10'>
			<div className='flex items-center space-x-4'>
				<div className='w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl'>
					<span className='text-2xl'>🚨</span>
				</div>
				<div>
					<h2 className='text-3xl font-bold text-white'>
						Emergency Contacts
					</h2>
					<p className='text-slate-400 mt-1'>
						Important contacts for emergency situations
					</p>
				</div>
			</div>
			{isEditing && (
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onAdd}
					className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/25 border border-emerald-400/20 flex items-center space-x-2'
				>
					<span>➕</span>
					<span>Add Contact</span>
				</motion.button>
			)}
		</div>
		<div className='space-y-8'>
			{data.map((contact, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: index * 0.1 }}
					className='border border-slate-700/60 rounded-3xl p-8 relative bg-slate-800/30 backdrop-blur-sm shadow-xl'
				>
					{isEditing && (
						<motion.button
							whileHover={{ scale: 1.1, rotate: 90 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => onRemove(index)}
							className='absolute top-6 right-6 w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 flex items-center justify-center font-bold text-xl'
						>
							✕
						</motion.button>
					)}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<ProfileInput
							label='Full Name'
							icon='👤'
							value={contact.name}
							onChange={e =>
								onChange(index, "name", e.target.value)
							}
							disabled={!isEditing}
							placeholder='Enter contact name'
						/>
						<ProfileInput
							label='Relationship'
							icon='👥'
							value={contact.relationship}
							onChange={e =>
								onChange(index, "relationship", e.target.value)
							}
							disabled={!isEditing}
							placeholder='e.g., Spouse, Parent'
						/>
						<ProfileInput
							label='Phone Number'
							icon='📞'
							type='tel'
							value={contact.phone}
							onChange={e =>
								onChange(index, "phone", e.target.value)
							}
							disabled={!isEditing}
							placeholder='Enter phone number'
						/>
					</div>
				</motion.div>
			))}
		</div>
	</motion.div>
);

export default PatientProfile;

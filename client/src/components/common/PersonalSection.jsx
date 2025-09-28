import { motion } from "framer-motion";
import { ProfileInput } from "./ProfileInput";
import { ProfileSelect } from "./ProfileSelect";

export const PersonalSection = ({ data, isEditing, onChange }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-10'>
			<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl'>
				<span className='text-xl sm:text-2xl'>👤</span>
			</div>
			<div>
				<h2 className='text-2xl sm:text-3xl font-bold text-white'>
					Personal Information
				</h2>
				<p className='text-slate-400 mt-1'>
					Basic personal details and identification
				</p>
			</div>
		</div>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
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

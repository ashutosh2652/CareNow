import { motion } from "framer-motion";
import { ProfileInput } from "./ProfileInput";

export const ContactSection = ({ data, isEditing, onChange }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-10'>
			<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl'>
				<span className='text-xl sm:text-2xl'>📞</span>
			</div>
			<div>
				<h2 className='text-2xl sm:text-3xl font-bold text-white'>
					Contact Information
				</h2>
				<p className='text-slate-400 mt-1'>
					Phone, email, and address details
				</p>
			</div>
		</div>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
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

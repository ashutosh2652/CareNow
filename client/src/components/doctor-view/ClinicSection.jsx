import { motion } from "framer-motion";
import { ProfileInput } from "../common/ProfileInput";

export const ClinicSection = ({ data, isEditing, onChange }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-10'>
			<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl'>
				<span className='text-xl sm:text-2xl'>🏥</span>
			</div>
			<div>
				<h2 className='text-2xl sm:text-3xl font-bold text-white'>
					Clinic Information
				</h2>
				<p className='text-slate-400 mt-1'>
					Clinic details and consultation fee
				</p>
			</div>
		</div>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
			<div className='md:col-span-2'>
				<ProfileInput
					label='Clinic Name'
					icon='🏥'
					value={data.name}
					onChange={e =>
						onChange("clinicInfo", "name", e.target.value)
					}
					disabled={!isEditing}
					placeholder='Enter clinic name'
				/>
			</div>
			<div className='md:col-span-2'>
				<ProfileInput
					label='Clinic Address'
					icon='📍'
					value={data.address}
					onChange={e =>
						onChange("clinicInfo", "address", e.target.value)
					}
					disabled={!isEditing}
					placeholder='Enter clinic address'
				/>
			</div>
			<ProfileInput
				label='Consultation Fee ($)'
				icon='💰'
				type='number'
				value={data.consultationFee}
				onChange={e =>
					onChange("clinicInfo", "consultationFee", e.target.value)
				}
				disabled={!isEditing}
				placeholder='Enter consultation fee'
			/>
		</div>
	</motion.div>
);

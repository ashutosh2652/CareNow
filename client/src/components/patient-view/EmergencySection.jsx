import { motion } from "framer-motion";
import { ProfileInput } from "../common/ProfileInput";

export const EmergencySection = ({
	data,
	isEditing,
	onChange,
	onAdd,
	onRemove,
}) => (
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

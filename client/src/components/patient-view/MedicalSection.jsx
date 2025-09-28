import { motion } from "framer-motion";
import { ProfileSelect } from "../common/ProfileSelect";
import { ProfileInput } from "../common/ProfileInput";

export const MedicalSection = ({ data, isEditing, onChange }) => (
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

import { motion } from "framer-motion";

export const ProfileInput = ({ label, value, icon, ...props }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.3 }}
		className='group'
	>
		<label className=' text-sm font-semibold text-slate-300 mb-3 flex items-center space-x-2'>
			{icon && <span>{icon}</span>}
			<span>{label}</span>
		</label>
		<input
			{...props}
			value={value}
			className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/60 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400/50 transition-all duration-300 text-white placeholder-slate-400 disabled:bg-slate-800/40 disabled:cursor-not-allowed disabled:text-slate-400 backdrop-blur-sm shadow-lg group-hover:border-slate-500/60'
		/>
	</motion.div>
);

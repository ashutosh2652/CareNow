import { motion } from "framer-motion";
import { ProfileSelect } from "../common/ProfileSelect";

export const DocumentsSection = ({
	documents,
	documentTypes,
	selectedDocumentType,
	setSelectedDocumentType,
	selectedFile,
	onFileChange,
	onUpload,
	isEditing,
}) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-10'>
			<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl'>
				<span className='text-xl sm:text-2xl'>📋</span>
			</div>
			<div>
				<h2 className='text-2xl sm:text-3xl font-bold text-white'>
					Documents Management
				</h2>
				<p className='text-slate-400 mt-1'>
					Upload and manage your professional documents
				</p>
			</div>
		</div>

		{/* Upload Section */}
		{isEditing && (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='mb-10 p-6 bg-slate-800/40 border border-slate-600/40 rounded-2xl backdrop-blur-sm'
			>
				<h3 className='text-xl font-semibold text-white mb-6 flex items-center space-x-2'>
					<span>📤</span>
					<span>Upload New Document</span>
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
					<ProfileSelect
						label='Document Type'
						icon='📄'
						value={selectedDocumentType}
						onChange={e => setSelectedDocumentType(e.target.value)}
					>
						<option value=''>Select document type</option>
						{documentTypes.map(type => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</ProfileSelect>
					<div className='group'>
						<label className=' text-sm font-semibold text-slate-300 mb-3 flex items-center space-x-2'>
							<span>📁</span>
							<span>Select File</span>
						</label>
						<input
							id='fileInput'
							type='file'
							onChange={onFileChange}
							className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/60 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 backdrop-blur-sm shadow-lg group-hover:border-slate-500/60'
						/>
						{selectedFile && (
							<p className='mt-2 text-sm text-cyan-300'>
								Selected: {selectedFile.name}
							</p>
						)}
					</div>
				</div>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={onUpload}
					disabled={!selectedFile || !selectedDocumentType}
					className='bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-cyan-500/25 border border-cyan-400/20 disabled:shadow-none'
				>
					<span className='flex items-center space-x-2'>
						<span>📤</span>
						<span>Upload Document</span>
					</span>
				</motion.button>
			</motion.div>
		)}

		{/* Documents List */}
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<h3 className='text-xl font-semibold text-white mb-6 flex items-center space-x-2'>
				<span>📚</span>
				<span>Uploaded Documents</span>
			</h3>
			{documents.length === 0 ? (
				<div className='text-center py-12 bg-slate-800/20 border border-slate-600/30 rounded-2xl'>
					<span className='text-6xl mb-4 block'>📄</span>
					<p className='text-slate-400 text-lg'>
						No documents uploaded yet
					</p>
					<p className='text-slate-500 text-sm mt-2'>
						Upload your professional documents to get started
					</p>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{documents.map((doc, index) => (
						<motion.div
							key={doc.id}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className='bg-slate-800/60 border border-slate-600/60 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 group'
						>
							<div className='flex items-start justify-between mb-4'>
								<div className='flex-1'>
									<h4 className='font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors'>
										{doc.type}
									</h4>
									<p
										className='text-sm text-slate-400 mb-2 truncate'
										title={doc.fileName}
									>
										{doc.fileName}
									</p>
									<p className='text-xs text-slate-500'>
										Uploaded: {doc.uploadDate}
									</p>
								</div>
								<div className='ml-4'>
									<div className='w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center'>
										<span className='text-xl'>📄</span>
									</div>
								</div>
							</div>
							<div className='flex space-x-2'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300'
								>
									👁️ View
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300'
								>
									🗑️ Delete
								</motion.button>
							</div>
						</motion.div>
					))}
				</div>
			)}
		</motion.div>
	</motion.div>
);

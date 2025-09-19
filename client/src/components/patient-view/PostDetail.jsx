import { motion } from "framer-motion";

export const PostDetail = ({ post, onGoBack }) => {
	return (
		<motion.div
			className='relative min-h-screen'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Background */}
			<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]'></div>
			</div>

			<div className='relative container mx-auto px-6 py-12 md:py-24'>
				<motion.button
					onClick={onGoBack}
					className='mb-12 group flex items-center space-x-3 text-cyan-400 hover:text-cyan-300 transition-all duration-300 bg-slate-800/40 hover:bg-slate-700/40 px-6 py-3 rounded-2xl backdrop-blur-sm border border-slate-700/40'
					whileHover={{ x: -4, scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<svg
						className='h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
							clipRule='evenodd'
						/>
					</svg>
					<span className='font-semibold'>Back to All Articles</span>
				</motion.button>

				<div className='max-w-5xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='text-center mb-12'
					>
						<div
							className={`inline-flex items-center space-x-2 bg-gradient-to-r ${
								categoryColors[post.category]
							} px-6 py-3 rounded-2xl mb-8 shadow-2xl`}
						>
							<span className='text-2xl'>
								{categoryIcons[post.category]}
							</span>
							<span className='text-white text-sm font-bold tracking-wider uppercase'>
								{post.category}
							</span>
						</div>

						<h1 className='text-4xl md:text-6xl font-extrabold  mb-8 leading-tight bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent'>
							{post.title}
						</h1>

						<div className='flex items-center justify-center space-x-8 text-slate-400 mb-8'>
							<div className='flex items-center space-x-2'>
								<span>⏱️</span>
								<span className='font-medium'>
									{post.readTime}
								</span>
							</div>
							<div className='flex items-center space-x-2'>
								<span>👁️</span>
								<span className='font-medium'>
									{post.views} views
								</span>
							</div>
							<div className='flex items-center space-x-2'>
								<span>❤️</span>
								<span className='font-medium'>
									{post.likes} likes
								</span>
							</div>
						</div>

						<div className='flex items-center justify-center mb-12'>
							<img
								src={post.authorImage}
								alt={post.author}
								className='w-16 h-16 rounded-full mr-6 object-cover ring-4 ring-cyan-400/30 shadow-2xl'
							/>
							<div className='text-left'>
								<p className='font-bold text-white text-lg'>
									{post.author}
								</p>
								<p className='text-slate-400'>{post.date}</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<img
							src={post.imageUrl}
							alt={post.title}
							className='w-full h-auto max-h-[600px] object-cover rounded-3xl mb-12 shadow-2xl border border-slate-700/40'
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/40 shadow-2xl'
					>
						<div className='prose prose-invert prose-lg max-w-none text-slate-300 prose-p:text-slate-300 prose-p:text-lg prose-p:leading-relaxed prose-headings:text-white'>
							<p className='text-xl leading-relaxed'>
								{post.fullContent}
							</p>
						</div>

						{post.tags && (
							<div className='flex flex-wrap gap-3 mt-12 pt-8 border-t border-slate-700/40'>
								{post.tags.map(tag => (
									<span
										key={tag}
										className='bg-slate-800/60 text-slate-300 px-4 py-2 rounded-full border border-slate-600/40 font-medium'
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className='mt-12 text-center'
					>
						<div className='flex items-center justify-center space-x-6'>
							<button className='flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl'>
								<span>❤️</span>
								<span className='font-semibold'>
									{post.likes} Likes
								</span>
							</button>
							<button className='flex items-center space-x-2 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 px-6 py-3 rounded-2xl transition-all duration-300 border border-slate-600/40'>
								<span>💬</span>
								<span className='font-semibold'>Comment</span>
							</button>
							<button className='flex items-center space-x-2 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 px-6 py-3 rounded-2xl transition-all duration-300 border border-slate-600/40'>
								<span>📤</span>
								<span className='font-semibold'>Share</span>
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

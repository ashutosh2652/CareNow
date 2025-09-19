import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye, Heart, Clock, ArrowLeft, Calendar } from "lucide-react";

const categoryColors = {
	Obstetrics: "from-fuchsia-500 to-rose-600",
	Cardiology: "from-red-600 to-rose-700",
	Neurology: "from-indigo-500 to-purple-600",
	Pediatrics: "from-blue-500 to-sky-600",
};

const categoryIcons = {
	Obstetrics: "🤱",
	Cardiology: "❤️",
	Neurology: "🧠",
	Pediatrics: "👶",
};

export const AdminPostDetail = ({ post, onGoBack, onDeleteClick }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteClick = async () => {
		setIsDeleting(true);
		setTimeout(() => {
			onDeleteClick(post.id);
			window.location.reload();
			setIsDeleting(false);
		}, 500);
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
			className='relative z-10'
		>
			{/* Hero Section */}
			<div className='relative h-[70vh] overflow-hidden'>
				<img
					src={post.imageUrl}
					alt={post.title}
					className='w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent' />

				{/* Admin Controls */}
				<div className='absolute top-6 right-6 flex gap-3'>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleDeleteClick}
						disabled={isDeleting}
						className='bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 rounded-full p-3 transition-all duration-300 backdrop-blur-sm'
						title='Delete Post'
					>
						{isDeleting ? (
							<div className='w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin' />
						) : (
							<Trash2 className='w-5 h-5 text-red-400' />
						)}
					</motion.button>
				</div>

				{/* Back Button */}
				<motion.button
					whileHover={{ scale: 1.05, x: -5 }}
					whileTap={{ scale: 0.95 }}
					onClick={onGoBack}
					className='absolute top-6 left-6 bg-slate-900/60 hover:bg-slate-800/60 border border-slate-600/60 rounded-full p-3 transition-all duration-300 backdrop-blur-sm'
				>
					<ArrowLeft className='w-5 h-5 text-white' />
				</motion.button>

				{/* Content Overlay */}
				<div className='absolute bottom-0 left-0 right-0 p-8'>
					<div className='container mx-auto max-w-4xl'>
						{post.featured && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className='inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg'
							>
								⭐ Featured Article
							</motion.div>
						)}

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${
								categoryColors[post.category]
							} text-white text-sm font-semibold mb-6 shadow-lg`}
						>
							<span>{categoryIcons[post.category]}</span>
							{post.category}
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className='text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight'
						>
							{post.title}
						</motion.h1>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className='flex items-center gap-6 text-slate-300'
						>
							<div className='flex items-center gap-3'>
								<img
									src={post.authorImage}
									alt={post.author}
									className='w-12 h-12 rounded-full border-2 border-slate-500'
								/>
								<div>
									<p className='font-semibold text-white'>
										{post.author}
									</p>
									<div className='flex items-center gap-4 text-sm'>
										<span className='flex items-center gap-1'>
											<Calendar className='w-4 h-4' />
											{post.date}
										</span>
										<span className='flex items-center gap-1'>
											<Clock className='w-4 h-4' />
											{post.readTime}
										</span>
									</div>
								</div>
							</div>

							<div className='flex items-center gap-6 text-sm'>
								<span className='flex items-center gap-1'>
									<Heart className='w-4 h-4' />
									{post.likes} likes
								</span>
								<span className='flex items-center gap-1'>
									<Eye className='w-4 h-4' />
									{post.views} views
								</span>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Article Content */}
			<div className='container mx-auto max-w-4xl px-6 py-16'>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className='bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/40 shadow-2xl'
				>
					<div className='prose prose-lg prose-invert max-w-none'>
						<p className='text-xl text-slate-300 leading-relaxed mb-8 font-medium'>
							{post.excerpt}
						</p>

						<div className='text-slate-200 leading-relaxed space-y-6'>
							{post.fullContent
								.split(". ")
								.map((sentence, index) => (
									<p
										key={index}
										className='text-lg leading-relaxed'
									>
										{sentence}
										{sentence.length > 10 ? "." : ""}
									</p>
								))}
						</div>
					</div>

					{/* Tags */}
					<div className='flex flex-wrap gap-3 mt-12 pt-8 border-t border-slate-700/40'>
						{post.tags.map(tag => (
							<span
								key={tag}
								className='px-4 py-2 bg-slate-800/60 rounded-full text-sm text-slate-300 border border-slate-600/40'
							>
								#{tag}
							</span>
						))}
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

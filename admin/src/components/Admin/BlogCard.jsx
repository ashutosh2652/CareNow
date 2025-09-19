import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye, Heart, Clock, Calendar } from "lucide-react";

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

export const AdminBlogCard = ({ post, onCardClick, onDeleteClick, index }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteClick = async e => {
		e.stopPropagation();
		setIsDeleting(true);
		setTimeout(() => {
			onDeleteClick(post.id);
			setIsDeleting(false);
		}, 500);
	};

	return (
		<motion.article
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className='group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/40 hover:border-indigo-400/30 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-indigo-500/10'
			onClick={() => onCardClick(post)}
		>
			{/* Delete Button */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={handleDeleteClick}
				disabled={isDeleting}
				className='absolute top-4 right-4 z-20 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 rounded-full p-2.5 transition-all duration-300 backdrop-blur-sm group-hover:opacity-100 opacity-70'
				title='Delete Post'
			>
				{isDeleting ? (
					<div className='w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin' />
				) : (
					<Trash2 className='w-4 h-4 text-red-400' />
				)}
			</motion.button>

			{/* Featured Badge */}
			{post.featured && (
				<div className='absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg'>
					⭐ Featured
				</div>
			)}

			{/* Image */}
			<div className='relative overflow-hidden h-48 bg-gradient-to-br from-slate-800 to-slate-900'>
				<img
					src={post.imageUrl}
					alt={post.title}
					className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent' />
			</div>

			{/* Content */}
			<div className='p-6 space-y-4'>
				{/* Category */}
				<div
					className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${
						categoryColors[post.category]
					} text-white text-sm font-semibold shadow-lg`}
				>
					<span>{categoryIcons[post.category]}</span>
					{post.category}
				</div>

				{/* Title */}
				<h3 className='text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 line-clamp-2 leading-tight'>
					{post.title}
				</h3>

				{/* Excerpt */}
				<p className='text-slate-400 text-sm leading-relaxed line-clamp-3'>
					{post.excerpt}
				</p>

				{/* Author & Meta */}
				<div className='flex items-center justify-between pt-4 border-t border-slate-700/40'>
					<div className='flex items-center gap-3'>
						<img
							src={post.authorImage}
							alt={post.author}
							className='w-8 h-8 rounded-full border-2 border-slate-600'
						/>
						<div>
							<p className='text-sm font-semibold text-white'>
								{post.author}
							</p>
							<div className='flex items-center gap-4 text-xs text-slate-400'>
								<span className='flex items-center gap-1'>
									<Calendar className='w-3 h-3' />
									{post.date}
								</span>
								<span className='flex items-center gap-1'>
									<Clock className='w-3 h-3' />
									{post.readTime}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Stats */}
				<div className='flex items-center justify-between text-sm text-slate-400 pt-2'>
					<div className='flex items-center gap-4'>
						<span className='flex items-center gap-1'>
							<Heart className='w-4 h-4' />
							{post.likes}
						</span>
						<span className='flex items-center gap-1'>
							<Eye className='w-4 h-4' />
							{post.views}
						</span>
					</div>
					<div className='flex gap-2'>
						{post.tags.slice(0, 2).map(tag => (
							<span
								key={tag}
								className='px-2 py-1 bg-slate-800/60 rounded-lg text-xs'
							>
								#{tag}
							</span>
						))}
					</div>
				</div>
			</div>
		</motion.article>
	);
};

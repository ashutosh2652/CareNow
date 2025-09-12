import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const categoryColors = {
	Obstetrics: "from-pink-500 to-rose-600",
	Cardiology: "from-red-500 to-rose-600",
	Neurology: "from-purple-500 to-indigo-600",
	Pediatrics: "from-blue-500 to-cyan-600",
};
const categoryIcons = {
	Obstetrics: "🤱",
	Cardiology: "❤️",
	Neurology: "🧠",
	Pediatrics: "👶",
};

export const BlogCard = ({ post, onCardClick, index }) => {
	const visibleElements = useScrollAnimation();
	const cardRef = useRef();
	const isVisible = visibleElements.has(cardRef.current);

	return (
		<motion.div
			ref={cardRef}
			className='animate-on-scroll cursor-pointer group h-full'
			onClick={() => onCardClick(post)}
			initial={{ opacity: 0, y: 50 }}
			animate={isVisible ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ y: -8, scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<div
				className={`relative bg-slate-900/60 rounded-3xl overflow-hidden border border-slate-700/60 transition-all duration-500 hover:border-cyan-400/50 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/10 h-full flex flex-col ${
					post.featured ? "ring-2 ring-cyan-400/30" : ""
				}`}
			>
				{post.featured && (
					<div className='absolute top-4 left-4 z-10'>
						<span className='bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
							✨ Featured
						</span>
					</div>
				)}

				<div className='relative overflow-hidden'>
					<img
						src={post.imageUrl}
						alt={post.title}
						className='h-64 w-full object-cover transition-all duration-700 group-hover:scale-110'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

					<div
						className={`absolute top-4 right-4 bg-gradient-to-r ${
							categoryColors[post.category]
						} px-4 py-2 rounded-2xl shadow-xl`}
					>
						<div className='flex items-center space-x-2 text-white'>
							<span className='text-lg'>
								{categoryIcons[post.category]}
							</span>
							<span className='text-xs font-bold tracking-wide uppercase'>
								{post.category}
							</span>
						</div>
					</div>
				</div>

				<div className='p-8 flex flex-col flex-grow'>
					<div className='flex items-center justify-between mb-4'>
						<span className='text-cyan-400 text-xs font-semibold tracking-wider uppercase'>
							{post.readTime}
						</span>
						<div className='flex items-center space-x-4 text-slate-400 text-xs'>
							<div className='flex items-center space-x-1'>
								<span>👁️</span>
								<span>{post.views}</span>
							</div>
							<div className='flex items-center space-x-1'>
								<span>❤️</span>
								<span>{post.likes}</span>
							</div>
						</div>
					</div>

					<h3 className='text-xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 flex-grow-0'>
						{post.title}
					</h3>

					<p className='text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow'>
						{post.excerpt}
					</p>

					<div className='flex flex-wrap gap-2 mb-6'>
						{post.tags &&
							post.tags.slice(0, 3).map(tag => (
								<span
									key={tag}
									className='bg-slate-800/60 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-600/40'
								>
									{tag}
								</span>
							))}
					</div>

					<div className='flex items-center justify-between pt-6 border-t border-slate-700/60 mt-auto'>
						<div className='flex items-center'>
							<img
								src={post.authorImage}
								alt={post.author}
								className='w-10 h-10 rounded-full mr-3 object-cover ring-2 ring-slate-600/40'
							/>
							<div>
								<p className='text-white font-semibold text-sm'>
									{post.author}
								</p>
								<p className='text-slate-400 text-xs'>
									{post.date}
								</p>
							</div>
						</div>
						<div className='text-cyan-400 group-hover:translate-x-2 transition-transform duration-300'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M17 8l4 4m0 0l-4 4m4-4H3'
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

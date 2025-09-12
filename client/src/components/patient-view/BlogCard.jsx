export const BlogCard = ({ post, onCardClick, isAnimated }) => {
	const cardClass = isAnimated ? "is-visible" : "";

	return (
		<div
			className={`animate-on-scroll ${cardClass} cursor-pointer group`}
			onClick={() => onCardClick(post)}
		>
			<div className='bg-slate-800/60 rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-all duration-300 hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/50 backdrop-blur-sm'>
				<div className='overflow-hidden'>
					<img
						src={post.imageUrl}
						alt={post.title}
						className='h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105'
					/>
				</div>
				<div className='p-6'>
					<p className='text-blue-400 text-xs font-semibold mb-2 tracking-widest uppercase'>
						{post.category}
					</p>
					<h3 className='text-xl font-bold text-white mb-3 h-14 group-hover:text-blue-400 transition-colors duration-300'>
						{post.title}
					</h3>
					<p className='text-gray-400 text-sm mb-4 h-20'>
						{post.excerpt}
					</p>
					<div className='flex items-center text-gray-500 text-xs pt-4 border-t border-slate-700'>
						<img
							src={post.authorImage}
							alt={post.author}
							className='w-8 h-8 rounded-full mr-3 object-cover'
						/>
						<div>
							<span className='text-white font-semibold'>
								{post.author}
							</span>
							<p>{post.date}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

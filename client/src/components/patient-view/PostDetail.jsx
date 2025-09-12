export const PostDetail = ({ post, onGoBack }) => (
	<div className='container mx-auto px-6 py-24 md:py-32 animate-fade-in'>
		<button
			onClick={onGoBack}
			className='mb-8 text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-5 w-5 mr-2'
				viewBox='0 0 20 20'
				fill='currentColor'
			>
				<path
					fillRule='evenodd'
					d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
					clipRule='evenodd'
				/>
			</svg>
			Back to All Articles
		</button>
		<div className='max-w-4xl mx-auto'>
			<p className='text-blue-400 text-sm font-semibold mb-2 tracking-widest uppercase'>
				{post.category}
			</p>
			<h1 className='text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight'>
				{post.title}
			</h1>
			<div className='flex items-center text-gray-400 mb-8'>
				<img
					src={post.authorImage}
					alt={post.author}
					className='w-12 h-12 rounded-full mr-4 object-cover'
				/>
				<div>
					<p className='font-bold text-white'>{post.author}</p>
					<p>{post.date}</p>
				</div>
			</div>
			<img
				src={post.imageUrl}
				alt={post.title}
				className='w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-2xl'
			/>
			<div className='prose prose-invert prose-lg max-w-none text-gray-300 prose-p:text-gray-300 prose-headings:text-white'>
				<p>{post.fullContent}</p>
			</div>
		</div>
	</div>
);

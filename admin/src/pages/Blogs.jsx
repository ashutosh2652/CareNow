import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Trash2,
	Eye,
	Heart,
	Clock,
	User,
	ArrowLeft,
	Calendar,
} from "lucide-react";

const blogPosts = [
	{
		id: 1,
		title: "Navigating Your First Trimester: A Guide for Expectant Mothers",
		category: "Obstetrics",
		author: "Dr. Priya Sharma",
		authorImage:
			"https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
		date: "Sep 12, 2025",
		readTime: "8 min read",
		excerpt:
			"Essential tips and advice to ensure a healthy and happy start to your pregnancy journey. We cover nutrition, common symptoms, and when to call your doctor.",
		fullContent:
			"The first trimester of pregnancy is a time of incredible development for your baby and significant changes for you. It's crucial to focus on a balanced diet rich in folic acid, found in leafy greens and legumes, to support neural tube development. Morning sickness is common; try eating small, frequent meals and staying hydrated. It's also the time for your first prenatal visit, where we'll establish a baseline for your health and answer your initial questions. Remember to avoid certain foods, smoking, and alcohol. This period is all about laying a healthy foundation for the months to come. Don't hesitate to reach out with any concerns, no matter how small they seem.",
		imageUrl:
			"https://images.unsplash.com/photo-1608571423483-6d1eecffcb2c?auto=format&fit=crop&w=800&q=80",
		featured: true,
		tags: ["Pregnancy", "Health", "Nutrition"],
		likes: 324,
		views: "2.1K",
	},
	{
		id: 2,
		title: "Understanding Cholesterol: The Good, The Bad, and The Crucial",
		category: "Cardiology",
		author: "Dr. Arjun Verma",
		authorImage:
			"https://images.unsplash.com/photo-1502767089025-6572583495b4?auto=format&fit=crop&w=400&q=80",
		date: "Sep 10, 2025",
		readTime: "6 min read",
		excerpt:
			"A clear, patient-friendly breakdown of what your cholesterol numbers mean and lifestyle changes you can make for a healthier heart.",
		fullContent:
			"Many patients are confused by cholesterol, but it's simple. HDL is 'good' cholesterol; it helps remove other forms of cholesterol from your bloodstream. LDL is 'bad' cholesterol; high levels can lead to plaque buildup in your arteries. A heart-healthy diet low in saturated and trans fats, regular exercise like brisk walking for 30 minutes a day, and maintaining a healthy weight are your best weapons against high LDL. We recommend regular check-ups to monitor your levels, as high cholesterol often has no symptoms.",
		imageUrl:
			"https://images.unsplash.com/photo-1588776814546-b102b76f4f05?auto=format&fit=crop&w=800&q=80",
		tags: ["Heart Health", "Prevention", "Lifestyle"],
		likes: 198,
		views: "1.8K",
	},
	{
		id: 3,
		title: "The Importance of Sleep for Mental and Physical Health",
		category: "Neurology",
		author: "Dr. Aisha Khan",
		authorImage:
			"https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?auto=format&fit=crop&w=400&q=80",
		date: "Sep 08, 2025",
		readTime: "7 min read",
		excerpt:
			"Discover why getting 7-9 hours of quality sleep is not a luxury but a necessity for your brain function, mood, and immune system.",
		fullContent:
			"Sleep is when your body repairs itself. During deep sleep, your brain consolidates memories and clears out toxins. A chronic lack of sleep is linked to a host of health problems, including heart disease, diabetes, and depression. To improve your sleep hygiene, create a relaxing bedtime routine, ensure your bedroom is dark and cool, and avoid screens for at least an hour before bed. If you suffer from persistent insomnia, it's important to consult a specialist to rule out underlying conditions like sleep apnea.",
		imageUrl:
			"https://images.unsplash.com/photo-1606202299303-77e3dffcb2c3?auto=format&fit=crop&w=800&q=80",
		tags: ["Sleep", "Mental Health", "Wellness"],
		likes: 267,
		views: "1.9K",
	},
	{
		id: 4,
		title: "A Parent's Guide to Childhood Vaccinations",
		category: "Pediatrics",
		author: "Dr. Sameer Joshi",
		authorImage:
			"https://images.unsplash.com/photo-1628890925604-6b0ee3e14b6f?auto=format&fit=crop&w=400&q=80",
		date: "Sep 05, 2025",
		readTime: "5 min read",
		excerpt:
			"Answering common questions and concerns about vaccination schedules to help you protect your child from preventable diseases.",
		fullContent:
			"Vaccinations are one of the greatest success stories in public health. They work by preparing your child's immune system to fight off serious diseases before they are exposed. The recommended vaccination schedule is carefully designed and tested to provide protection at the earliest and most effective time. We understand parents have questions, and we're here to discuss the benefits and address any concerns based on scientific evidence. Protecting our community's children is a shared responsibility.",
		imageUrl:
			"https://images.unsplash.com/photo-1578496781985-4453b77e0cf3?auto=format&fit=crop&w=800&q=80",
		tags: ["Pediatrics", "Vaccines", "Prevention"],
		likes: 156,
		views: "1.3K",
	},
];

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

// Admin Blog Card Component with Delete Functionality
const AdminBlogCard = ({ post, onCardClick, onDeleteClick, index }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteClick = async e => {
		e.stopPropagation(); // Prevent card click when deleting
		setIsDeleting(true);

		// Call your API here
		// await deletePostAPI(post.id);

		setTimeout(() => {
			onDeleteClick(post.id);
			setIsDeleting(false);
		}, 500); // Simulate API call
	};

	return (
		<motion.article
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className='group relative bg-slate-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/40 hover:border-cyan-500/30 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-cyan-500/10'
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
				<h3 className='text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2 leading-tight'>
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

// Admin Post Detail Component with Delete Functionality
const AdminPostDetail = ({ post, onGoBack, onDeleteClick }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteClick = async () => {
		setIsDeleting(true);

		// Call your API here
		// await deletePostAPI(post.id);

		setTimeout(() => {
			onDeleteClick(post.id);
			onGoBack(); // Go back to main view after deletion
			setIsDeleting(false);
		}, 500); // Simulate API call
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
					className='bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/40 shadow-2xl'
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

export default function AdminBlog() {
	const [selectedPost, setSelectedPost] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [posts, setPosts] = useState(blogPosts);

	const handleCardClick = post => {
		setSelectedPost(post);
		window.scrollTo(0, 0);
	};

	const handleGoBack = () => {
		setSelectedPost(null);
		window.scrollTo(0, 0);
	};

	const handleDeletePost = postId => {
		// Remove post from state - in real app, this would be after successful API call
		setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

		// If the deleted post was currently selected, go back to main view
		if (selectedPost && selectedPost.id === postId) {
			setSelectedPost(null);
		}
	};

	const categories = ["All", ...Object.keys(categoryColors)];

	const filteredPosts = posts.filter(post => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || post.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<div className='overflow-y-auto min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden'>
			{/* Animated background elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700'></div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
			</div>

			<AnimatePresence mode='wait'>
				{selectedPost ? (
					<AdminPostDetail
						key='detail'
						post={selectedPost}
						onGoBack={handleGoBack}
						onDeleteClick={handleDeletePost}
					/>
				) : (
					<motion.main
						key='blog'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className='relative z-10'
					>
						{/* Header Section */}
						<div className='container mx-auto px-6 py-16 md:py-24'>
							<motion.div
								initial={{ opacity: 0, y: -30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className='text-center mb-16'
							>
								<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl mb-8 shadow-2xl'>
									<span className='text-3xl'>🔧</span>
								</div>
								<h1 className='text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-6'>
									Admin Blog Management
								</h1>
								<p className='text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed'>
									Manage your medical blog content with
									advanced admin controls. Edit, delete, and
									organize your healthcare insights.
								</p>
							</motion.div>

							{/* Search and Filter Section */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className='mb-12'
							>
								<div className='max-w-4xl mx-auto bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/40 shadow-2xl'>
									<div className='flex flex-col md:flex-row gap-6 items-center'>
										{/* Search */}
										<div className='flex-1 relative'>
											<input
												type='text'
												placeholder='Search articles...'
												value={searchTerm}
												onChange={e =>
													setSearchTerm(
														e.target.value
													)
												}
												className='w-full px-6 py-4 bg-slate-800/60 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm'
											/>
											<div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400'>
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
														d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
													/>
												</svg>
											</div>
										</div>

										{/* Categories */}
										<div className='flex flex-wrap gap-3'>
											{categories.map(category => (
												<button
													key={category}
													onClick={() =>
														setSelectedCategory(
															category
														)
													}
													className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
														selectedCategory ===
														category
															? `bg-gradient-to-r ${
																	category !==
																	"All"
																		? categoryColors[
																				category
																		  ]
																		: "from-cyan-500 to-blue-600"
															  } text-white shadow-xl`
															: "bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-slate-600/40"
													}`}
												>
													{category !== "All" &&
														categoryIcons[
															category
														]}{" "}
													{category}
												</button>
											))}
										</div>
									</div>
								</div>
							</motion.div>

							{/* Blog Grid */}
							<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
								{filteredPosts.map((post, index) => (
									<AdminBlogCard
										key={post.id}
										post={post}
										onCardClick={handleCardClick}
										onDeleteClick={handleDeletePost}
										index={index}
									/>
								))}
							</div>

							{filteredPosts.length === 0 && (
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									className='text-center py-20'
								>
									<div className='text-6xl mb-4'>🔍</div>
									<h3 className='text-2xl font-bold text-white mb-2'>
										No articles found
									</h3>
									<p className='text-slate-400'>
										Try adjusting your search terms or
										category filter.
									</p>
								</motion.div>
							)}
						</div>
					</motion.main>
				)}
			</AnimatePresence>
		</div>
	);
}

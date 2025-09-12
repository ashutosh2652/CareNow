import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "../../components/patient-view/BlogCard";
import { PostDetail } from "../../components/patient-view/PostDetail";

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
			"https://images.unsplash.com/photo-1606202299303-77e3dffcf0c3?auto=format&fit=crop&w=800&q=80",
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

export default function Blog() {
	const [selectedPost, setSelectedPost] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	const handleCardClick = post => {
		setSelectedPost(post);
		window.scrollTo(0, 0);
	};

	const handleGoBack = () => {
		setSelectedPost(null);
		window.scrollTo(0, 0);
	};

	const categories = ["All", ...Object.keys(categoryColors)];

	const filteredPosts = blogPosts.filter(post => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || post.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden'>
			{/* Animated background elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700'></div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
			</div>

			<AnimatePresence mode='wait'>
				{selectedPost ? (
					<PostDetail
						key='detail'
						post={selectedPost}
						onGoBack={handleGoBack}
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
									<span className='text-3xl'>📚</span>
								</div>
								<h1 className='text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-6'>
									Medical Insights
								</h1>
								<p className='text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed'>
									Stay informed with the latest medical
									knowledge, expert insights, and health tips
									from our team of experienced healthcare
									professionals.
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
												className='w-45 px-6 py-4 bg-slate-800/60 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm'
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
									<BlogCard
										key={post.id}
										post={post}
										onCardClick={handleCardClick}
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

import React from "react";
const blogPosts = [
	{
		id: 1,
		title: "Navigating Your First Trimester: A Guide for Expectant Mothers",
		category: "Obstetrics",
		author: "Dr. Priya Sharma",
		authorImage:
			"https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
		date: "Sep 12, 2025",
		excerpt:
			"Essential tips and advice to ensure a healthy and happy start to your pregnancy journey. We cover nutrition, common symptoms, and when to call your doctor.",
		fullContent:
			"The first trimester of pregnancy is a time of incredible development for your baby and significant changes for you. It's crucial to focus on a balanced diet rich in folic acid, found in leafy greens and legumes, to support neural tube development. Morning sickness is common; try eating small, frequent meals and staying hydrated. It's also the time for your first prenatal visit, where we'll establish a baseline for your health and answer your initial questions. Remember to avoid certain foods, smoking, and alcohol. This period is all about laying a healthy foundation for the months to come. Don't hesitate to reach out with any concerns, no matter how small they seem.",
		imageUrl:
			"https://images.unsplash.com/photo-1608571423483-6d1eecffcb2c?auto=format&fit=crop&w=800&q=80",
		featured: true,
	},
	{
		id: 2,
		title: "Understanding Cholesterol: The Good, The Bad, and The Crucial",
		category: "Cardiology",
		author: "Dr. Arjun Verma",
		authorImage:
			"https://images.unsplash.com/photo-1502767089025-6572583495b4?auto=format&fit=crop&w=400&q=80",
		date: "Sep 10, 2025",
		excerpt:
			"A clear, patient-friendly breakdown of what your cholesterol numbers mean and lifestyle changes you can make for a healthier heart.",
		fullContent:
			"Many patients are confused by cholesterol, but it's simple. HDL is 'good' cholesterol; it helps remove other forms of cholesterol from your bloodstream. LDL is 'bad' cholesterol; high levels can lead to plaque buildup in your arteries. A heart-healthy diet low in saturated and trans fats, regular exercise like brisk walking for 30 minutes a day, and maintaining a healthy weight are your best weapons against high LDL. We recommend regular check-ups to monitor your levels, as high cholesterol often has no symptoms.",
		imageUrl:
			"https://images.unsplash.com/photo-1588776814546-b102b76f4f05?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 3,
		title: "The Importance of Sleep for Mental and Physical Health",
		category: "Neurology",
		author: "Dr. Aisha Khan",
		authorImage:
			"https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?auto=format&fit=crop&w=400&q=80",
		date: "Sep 08, 2025",
		excerpt:
			"Discover why getting 7-9 hours of quality sleep is not a luxury but a necessity for your brain function, mood, and immune system.",
		fullContent:
			"Sleep is when your body repairs itself. During deep sleep, your brain consolidates memories and clears out toxins. A chronic lack of sleep is linked to a host of health problems, including heart disease, diabetes, and depression. To improve your sleep hygiene, create a relaxing bedtime routine, ensure your bedroom is dark and cool, and avoid screens for at least an hour before bed. If you suffer from persistent insomnia, it's important to consult a specialist to rule out underlying conditions like sleep apnea.",
		imageUrl:
			"https://images.unsplash.com/photo-1606202299303-77e3dffcf0c3?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 4,
		title: "A Parent's Guide to Childhood Vaccinations",
		category: "Pediatrics",
		author: "Dr. Sameer Joshi",
		authorImage:
			"https://images.unsplash.com/photo-1628890925604-6b0ee3e14b6f?auto=format&fit=crop&w=400&q=80",
		date: "Sep 05, 2025",
		excerpt:
			"Answering common questions and concerns about vaccination schedules to help you protect your child from preventable diseases.",
		fullContent:
			"Vaccinations are one of the greatest success stories in public health. They work by preparing your child's immune system to fight off serious diseases before they are exposed. The recommended vaccination schedule is carefully designed and tested to provide protection at the earliest and most effective time. We understand parents have questions, and we're here to discuss the benefits and address any concerns based on scientific evidence. Protecting our community's children is a shared responsibility.",
		imageUrl:
			"https://images.unsplash.com/photo-1578496781985-4453b77e0cf3?auto=format&fit=crop&w=800&q=80",
	},
];

const useScrollAnimation = () => {
	const [animatedElements, setAnimatedElements] = React.useState(new Set());
	const observer = React.useRef();

	React.useEffect(() => {
		observer.current = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setAnimatedElements(prev =>
							new Set(prev).add(entry.target)
						);
						observer.current.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		const elements = document.querySelectorAll(".animate-on-scroll");
		elements.forEach(el => observer.current.observe(el));

		return () => observer.current.disconnect();
	}, []);

	return animatedElements;
};

const BlogCard = ({ post, onCardClick, isAnimated }) => {
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

const PostDetail = ({ post, onGoBack }) => (
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

export default function Blog() {
	const animatedElements = useScrollAnimation();
	const [selectedPost, setSelectedPost] = React.useState(null);

	const handleCardClick = post => {
		setSelectedPost(post);
		window.scrollTo(0, 0);
	};

	const handleGoBack = () => {
		setSelectedPost(null);
		window.scrollTo(0, 0);
		window.location.reload();
	};

	return (
		<div className='bg-slate-900 text-white font-sans selection:bg-blue-500/30'>
			<style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.8s ease-out both; }

                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                .animate-on-scroll.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>

			<main>
				{selectedPost ? (
					<PostDetail post={selectedPost} onGoBack={handleGoBack} />
				) : (
					<>
						<div className='container mx-auto px-6 py-24'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
								{blogPosts.map((post, index) => (
									<BlogCard
										key={post.id}
										post={post}
										onCardClick={handleCardClick}
										isAnimated={animatedElements.has(
											document.querySelectorAll(
												".animate-on-scroll"
											)[index]
										)}
									/>
								))}
							</div>
						</div>
					</>
				)}
			</main>
		</div>
	);
}

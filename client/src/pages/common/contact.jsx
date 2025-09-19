import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [focusedField, setFocusedField] = useState(null);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log("Form data submitted:", formData);
		setIsSubmitted(true);
	};

	return (
		<div className='min-h-screen w-full bg-slate-900 relative overflow-hidden'>
			{/* Animated background with floating particles */}
			<div className='absolute inset-0'>
				{/* Aurora background */}
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>

				{/* Animated gradient orbs */}
				<div className='absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
				<div
					className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-bounce'
					style={{ animationDuration: "4s" }}
				></div>
				<div
					className='absolute top-3/4 left-1/3 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-ping'
					style={{ animationDuration: "3s" }}
				></div>

				{/* Floating particles */}
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className='absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-ping'
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 2}s`,
							animationDuration: `${2 + Math.random() * 2}s`,
						}}
					></div>
				))}
			</div>

			{/* Main content */}
			<div className='relative z-10 container mx-auto px-4 py-16 sm:py-24 lg:px-8 font-sans text-white antialiased'>
				{/* Header Section */}
				<div className='text-center mb-16 animate-fade-in-up'>
					<h1 className='text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-x mb-6'>
						Let's Connect
					</h1>

					<p
						className='mt-4 max-w-2xl mx-auto text-lg text-slate-300 animate-fade-in-up'
						style={{ animationDelay: "0.3s" }}
					>
						Ready to start something amazing together? We'd love to
						hear from you and discuss how we can bring your vision
						to life.
					</p>
				</div>

				<div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
					{/* Contact Information Section */}
					<div className='space-y-8 animate-slide-in-left'>
						<div className='group p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:border-purple-400/30 hover:bg-slate-900/70'>
							<h2 className='text-3xl font-bold text-white mb-8 flex items-center gap-3'>
								<div className='w-2 h-8 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full animate-pulse'></div>
								Contact Information
							</h2>

							<div className='space-y-8'>
								{/* Email */}
								<div className='flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/30 group/item cursor-pointer'>
									<div className='bg-gradient-to-r from-cyan-400/20 to-purple-400/20 p-4 rounded-2xl ring-1 ring-cyan-400/30 group-hover/item:ring-cyan-400/60 transition-all duration-300 group-hover/item:scale-110'>
										<Mail className='h-6 w-6 text-cyan-400 group-hover/item:animate-bounce' />
									</div>
									<div className='flex-1'>
										<h3 className='text-xl font-semibold text-slate-100 group-hover/item:text-white transition-colors'>
											Email
										</h3>
										<p className='text-slate-400 mb-2 group-hover/item:text-slate-300 transition-colors'>
											Drop us a line anytime
										</p>
										<a
											href='mailto:contact@carenow.com'
											className='text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 hover:underline'
										>
											contact@carenow.com
										</a>
									</div>
								</div>

								{/* Phone */}
								<div
									className='flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/30 group/item cursor-pointer'
									style={{ animationDelay: "0.1s" }}
								>
									<div className='bg-gradient-to-r from-purple-400/20 to-pink-400/20 p-4 rounded-2xl ring-1 ring-purple-400/30 group-hover/item:ring-purple-400/60 transition-all duration-300 group-hover/item:scale-110'>
										<Phone className='h-6 w-6 text-purple-400 group-hover/item:animate-bounce' />
									</div>
									<div className='flex-1'>
										<h3 className='text-xl font-semibold text-slate-100 group-hover/item:text-white transition-colors'>
											Phone
										</h3>
										<p className='text-slate-400 mb-2 group-hover/item:text-slate-300 transition-colors'>
											Call us for immediate assistance
										</p>
										<a
											href='tel:+1234567890'
											className='text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 hover:underline'
										>
											+1 (234) 567-890
										</a>
									</div>
								</div>

								{/* Location */}
								<div
									className='flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/30 group/item cursor-pointer'
									style={{ animationDelay: "0.2s" }}
								>
									<div className='bg-gradient-to-r from-pink-400/20 to-cyan-400/20 p-4 rounded-2xl ring-1 ring-pink-400/30 group-hover/item:ring-pink-400/60 transition-all duration-300 group-hover/item:scale-110'>
										<MapPin className='h-6 w-6 text-pink-400 group-hover/item:animate-bounce' />
									</div>
									<div className='flex-1'>
										<h3 className='text-xl font-semibold text-slate-100 group-hover/item:text-white transition-colors'>
											Office Location
										</h3>
										<p className='text-slate-400 group-hover/item:text-slate-300 transition-colors'>
											123 Health St, Wellness City, 45678
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form Section */}
					<div className='p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:border-cyan-400/30 hover:bg-slate-900/70 animate-slide-in-right'>
						{isSubmitted ? (
							<div className='flex flex-col items-center justify-center h-full text-center animate-scale-in'>
								<div className='relative mb-6'>
									<CheckCircle className='h-20 w-20 text-green-400 animate-bounce' />
									<div className='absolute inset-0 h-20 w-20 border-4 border-green-400/30 rounded-full animate-ping'></div>
								</div>
								<h2 className='text-3xl font-bold text-white mb-4'>
									Message Sent!
								</h2>
								<p className='text-slate-300 text-lg'>
									Thank you for reaching out. We'll get back
									to you within 24 hours.
								</p>
								<button
									onClick={() => setIsSubmitted(false)}
									className='mt-6 px-6 py-2 bg-gradient-to-r from-green-400 to-cyan-400 text-slate-900 font-semibold rounded-xl hover:scale-105 transition-transform'
								>
									Send Another Message
								</button>
							</div>
						) : (
							<div className='space-y-6'>
								<div className='flex items-center gap-3 mb-8'>
									<div className='w-2 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full animate-pulse'></div>
									<h2 className='text-3xl font-bold text-white'>
										Send us a Message
									</h2>
								</div>

								{/* Name Input */}
								<div className='group'>
									<label
										htmlFor='name'
										className='block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-cyan-400 transition-colors'
									>
										Full Name
									</label>
									<input
										type='text'
										id='name'
										name='name'
										value={formData.name}
										onChange={handleChange}
										onFocus={() => setFocusedField("name")}
										onBlur={() => setFocusedField(null)}
										required
										className={`block w-full px-4 py-4 bg-slate-800/60 border rounded-xl text-white placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:bg-slate-800 ${
											focusedField === "name"
												? "border-cyan-400 ring-cyan-400/50 scale-105"
												: "border-white/10 hover:border-white/20"
										}`}
										placeholder='Ananya Sharma'
									/>
								</div>

								{/* Email Input */}
								<div className='group'>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors'
									>
										Email Address
									</label>
									<input
										type='email'
										id='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										onFocus={() => setFocusedField("email")}
										onBlur={() => setFocusedField(null)}
										required
										className={`block w-full px-4 py-4 bg-slate-800/60 border rounded-xl text-white placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:bg-slate-800 ${
											focusedField === "email"
												? "border-purple-400 ring-purple-400/50 scale-105"
												: "border-white/10 hover:border-white/20"
										}`}
										placeholder='you@example.com'
									/>
								</div>

								{/* Message Input */}
								<div className='group'>
									<label
										htmlFor='message'
										className='block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-pink-400 transition-colors'
									>
										Message
									</label>
									<textarea
										id='message'
										name='message'
										rows='5'
										value={formData.message}
										onChange={handleChange}
										onFocus={() =>
											setFocusedField("message")
										}
										onBlur={() => setFocusedField(null)}
										required
										className={`block w-full px-4 py-4 bg-slate-800/60 border rounded-xl text-white placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:bg-slate-800 resize-none ${
											focusedField === "message"
												? "border-pink-400 ring-pink-400/50 scale-105"
												: "border-white/10 hover:border-white/20"
										}`}
										placeholder='Tell us about your project, questions, or how we can help you...'
									/>
								</div>

								{/* Submit Button */}
								<div>
									<button
										onClick={handleSubmit}
										className='group relative w-full flex justify-center items-center gap-x-3 py-4 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-semibold rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400'
									>
										{/* Animated background */}
										<div className='absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

										{/* Button content */}
										<div className='relative flex items-center gap-3'>
											<Send className='h-5 w-5 group-hover:animate-bounce' />
											<span className='text-lg'>
												Send Message
											</span>
										</div>

										{/* Shine effect */}
										<div className='absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000'></div>
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes fade-in-up {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes slide-in-left {
					from {
						opacity: 0;
						transform: translateX(-50px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes slide-in-right {
					from {
						opacity: 0;
						transform: translateX(50px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes scale-in {
					from {
						opacity: 0;
						transform: scale(0.8);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}

				@keyframes gradient-x {
					0%,
					100% {
						background-size: 200% 200%;
						background-position: left center;
					}
					50% {
						background-size: 200% 200%;
						background-position: right center;
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out;
				}

				.animate-slide-in-left {
					animation: slide-in-left 0.8s ease-out;
				}

				.animate-slide-in-right {
					animation: slide-in-right 0.8s ease-out 0.2s both;
				}

				.animate-scale-in {
					animation: scale-in 0.6s ease-out;
				}

				.animate-gradient-x {
					background-size: 200% 200%;
					animation: gradient-x 3s ease infinite;
				}
			`}</style>
		</div>
	);
};

export default Contact;

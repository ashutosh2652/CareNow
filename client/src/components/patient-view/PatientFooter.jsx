import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import CareNowLogo from "../../assets/CareNow-logo.png";

const PatientFooter = () => {
	return (
		<footer className='bg-sky-100/80 font-sans'>
			<div className='container mx-auto px-6 py-12'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
					{/* Column 1: Brand Info */}
					<div>
						<Link
							to='/'
							className='flex items-center text-2xl font-bold text-slate-800'
						>
							<img
								src={CareNowLogo}
								alt='CareNow'
								className='h-16 w-35 relative mb-1'
							/>
						</Link>
						<p className='mt-4 text-sm text-slate-600'>
							Providing compassionate and accessible healthcare
							for a better tomorrow.
						</p>
					</div>

					{/* Column 2: Quick Links */}
					<div>
						<h3 className='text-lg font-semibold text-slate-800'>
							Quick Links
						</h3>
						<ul className='mt-4 space-y-2'>
							<li>
								<Link
									to='/patient/doctor'
									className='text-slate-600 hover:text-blue-600 transition-colors'
								>
									Find a Doctor
								</Link>
							</li>
							<li>
								<Link
									to='/patient/appointment'
									className='text-slate-600 hover:text-blue-600 transition-colors'
								>
									Book Appointment
								</Link>
							</li>
							<li>
								<Link
									to='/patient/blog'
									className='text-slate-600 hover:text-blue-600 transition-colors'
								>
									Health Blog
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 3: Legal */}
					<div>
						<h3 className='text-lg font-semibold text-slate-800'>
							Legal
						</h3>
						<ul className='mt-4 space-y-2'>
							<li>
								<Link
									to='/terms-of-service'
									className='text-slate-600 hover:text-blue-600 transition-colors'
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									to='/privacy-policy'
									className='text-slate-600 hover:text-blue-600 transition-colors'
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 4: Connect */}
					<div>
						<h3 className='text-lg font-semibold text-slate-800'>
							Connect With Us
						</h3>
						<div className='flex mt-4 space-x-4'>
							<a
								href='https://facebook.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-500 hover:text-blue-600 transition-colors'
							>
								<Facebook size={24} />
							</a>
							<a
								href='https://linkedin.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-500 hover:text-blue-800 transition-colors'
							>
								<Linkedin size={24} />
							</a>
							<a
								href='https://instagram.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-500 hover:text-pink-600 transition-colors'
							>
								<Instagram size={24} />
							</a>
							<a
								href='https://twitter.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-500 hover:text-sky-500 transition-colors'
							>
								<Twitter size={24} />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-12 border-t border-sky-200 pt-6 text-center'>
					<p className='text-sm text-slate-500'>
						© {new Date().getFullYear()} CareNow. All Rights
						Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default PatientFooter;

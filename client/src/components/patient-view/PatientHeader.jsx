import { useState, useEffect, useRef } from "react";
import { User, LogOut, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import CareNowLogo from "../../assets/CareNow-logo.png";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../store/auth";

const navLinks = [
	{ text: "Home", url: "/patient" },
	{ text: "Doctors", url: "/patient/doctor" },
	{ text: "Appointment", url: "/patient/appointment" },
	{ text: "Blog", url: "/patient/blog" },
	{ text: "Contact", url: "/patient/contact" },
	{ text: "About Us", url: "/patient/about" },
];

function DropDownMenu() {
	const profileRef = useRef(null);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handlelogout() {
		dispatch(LogoutUser()).then(data => {
			if (data.payload?.success) {
				navigate("/auth/login");
			}
		});
	}

	const user = {
		name: "Ananya Sharma",
		imageUrl:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=60",
	};

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				profileRef.current &&
				!profileRef.current.contains(event.target)
			) {
				setIsProfileOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className='relative ' ref={profileRef}>
			<button
				onClick={() => setIsProfileOpen(!isProfileOpen)}
				className='focus:outline-none rounded-full'
			>
				<img
					src={user?.imageUrl}
					alt='User Avatar'
					className='h-12 w-12 rounded-full object-cover transition-all duration-300 hover:ring-4 hover:ring-cyan-400/50'
				/>
			</button>

			{/* Glassmorphism Dropdown Panel */}
			<div
				className={`absolute right-0 mt-2 w-56 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl origin-top-right transition-all duration-300 ease-in-out ${
					isProfileOpen
						? "opacity-100 scale-100"
						: "opacity-0 scale-95 pointer-events-none"
				}`}
			>
				<div className='py-2'>
					<div className='px-4 py-2 border-b border-white/10'>
						<p className='text-sm font-semibold text-white'>
							Signed in as
						</p>
						<p className='text-sm text-slate-400 truncate'>
							{user.name}
						</p>
					</div>
					<div className='p-1'>
						<NavLink
							to='/patient/profile'
							className='flex w-full rounded-md items-center px-3 py-2 text-sm text-slate-200 hover:bg-white/5'
						>
							<User className='mr-3 h-5 w-5 text-slate-400' /> My
							Profile
						</NavLink>
						<button
							onClick={handlelogout}
							className='flex w-full rounded-md items-center text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10'
						>
							<LogOut className='mr-3 h-5 w-5' /> Sign out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const PatientHeader = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed w-full top-0  z-50  transition-all duration-300 ease-in-out ${
				isScrolled
					? "bg-slate-900/60 backdrop-blur-lg shadow-2xl border-b border-white/10"
					: "border-b border-transparent"
			}`}
		>
			<div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-20'>
					<NavLink to='/patient' className='flex items-center'>
						{/* The filter class makes your PNG logo appear white */}
						<img
							src={CareNowLogo}
							alt='CareNow'
							className='h-12 w-auto brightness-0 invert'
						/>
					</NavLink>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						{navLinks.map(link => (
							<NavLink
								key={link.url}
								to={link.url}
								end={link.url === "/patient"}
								className={({ isActive }) =>
									`text-base font-medium transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] ${
										isActive
											? "text-cyan-400 font-semibold"
											: "text-slate-300"
									}`
								}
							>
								{link.text}
							</NavLink>
						))}
					</nav>

					{/* Desktop User Menu */}
					<div className='hidden md:flex items-center'>
						<DropDownMenu />
					</div>

					{/* Mobile Menu (Sheet) */}
					<div className='md:hidden'>
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant='ghost'
									size='icon'
									className='text-white hover:bg-white/10'
								>
									<Menu className='h-6 w-6' />
								</Button>
							</SheetTrigger>
							<SheetContent
								side='left'
								className='w-[300px] overflow-y-auto md:overflow-hidden bg-slate-900/80 backdrop-blur-xl border-r border-white/10 text-white'
							>
								<div className='p-4 border-b border-white/10'>
									<NavLink
										to='/'
										className='flex items-center'
									>
										<img
											src={CareNowLogo}
											alt='CareNow'
											className='h-10 w-auto brightness-0 invert'
										/>
									</NavLink>
								</div>
								<nav className='flex flex-col space-y-2 p-4'>
									{navLinks.map(link => (
										<NavLink
											key={`mobile-${link.url}`}
											to={link.url}
											end={link.url === "/patient"}
											className={({ isActive }) =>
												`text-lg font-medium p-3 rounded-lg transition-colors ${
													isActive
														? "bg-cyan-400/20 text-cyan-300"
														: "text-slate-300 hover:bg-white/5"
												}`
											}
										>
											{link.text}
										</NavLink>
									))}
								</nav>
								<div className='absolute bottom-10 left-0 w-full px-8'>
									<DropDownMenu />
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
};

export default PatientHeader;

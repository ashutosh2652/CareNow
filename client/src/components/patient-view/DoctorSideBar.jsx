import {
	FaBaby,
	FaHeartbeat,
	FaSpa,
	FaVials,
	FaBrain,
	FaRibbon,
	FaLungs,
	FaBone,
	FaEye,
	FaHeadphones,
	FaFemale,
	FaUserMd,
	FaSyringe,
	FaXRay,
	FaUserNurse,
	FaTeeth,
	FaStethoscope,
} from "react-icons/fa";
import { ALL_SPECIALIZATIONS } from "../../config";

const specialtyIcons = {
	pediatrics: <FaBaby />,
	cardiology: <FaHeartbeat />,
	dermatology: <FaSpa />,
	gastroenterology: <FaVials />,
	endocrinology: <FaTeeth />, // Placeholder
	neurology: <FaBrain />,
	oncology: <FaRibbon />,
	pulmonology: <FaLungs />,
	"orthopedic-surgery": <FaBone />,
	ophthalmology: <FaEye />,
	"otolaryngology-ent": <FaHeadphones />,
	"obstetrics-gynecology-obgyn": <FaFemale />,
	psychiatry: <FaUserMd />, // Placeholder
	urology: <FaUserNurse />, // Placeholder
	nephrology: <FaStethoscope />, // Placeholder
	"general-surgery": <FaSyringe />, // Placeholder
	anesthesiology: <FaSyringe />,
	radiology: <FaXRay />,
};

const DoctorSelector = ({ selectedId, setSelectedId }) => {
	const selectedLabel = ALL_SPECIALIZATIONS.find(
		spec => spec.id === selectedId
	)?.label;

	const cardBaseClasses =
		"flex flex-col items-center justify-center gap-3 p-4 text-center bg-slate-800/50 border border-white/10 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out";
	const cardHoverClasses =
		"hover:-translate-y-1 hover:bg-indigo-900/60 hover:border-white/30 hover:shadow-lg hover:shadow-sky-400/20";
	const cardSelectedClasses =
		"scale-105 -translate-y-1 bg-gradient-to-br from-blue-600 to-violet-600 border-fuchsia-400 shadow-2xl shadow-violet-500/40";

	return (
		<main className="flex items-center justify-center min-h-screen p-4 sm:p-6  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops)),_radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent animate-aurora font-['Inter',_sans-serif]">
			<div className='w-full max-w-md p-6 text-center text-white bg-slate-900/40 border border-white/10 rounded-3xl shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-3'>
				<header className='mb-10 sticky'>
					<h1 className='text-sm font-bold bg-gradient-to-r from-fuchsia-400 to-sky-400 bg-clip-text text-transparent sm:text-xl'>
						Find Your Specialist
					</h1>
					<p className='mt-2 text-base text-white/70'>
						Select a specialty to begin your search
					</p>
				</header>

				{/* Grid of specialty cards - automatically wraps */}
				<div className='flex flex-col gap-4 sm:gap-3'>
					{ALL_SPECIALIZATIONS.map(specialty => (
						<button
							key={specialty.id}
							onClick={() => setSelectedId(specialty.id)}
							aria-pressed={selectedId === specialty.id}
							className={`${cardBaseClasses} ${cardHoverClasses} ${
								selectedId === specialty.id
									? cardSelectedClasses
									: ""
							}`}
						>
							<div
								className={`text-4xl transition-colors duration-300 ${
									selectedId === specialty.id
										? "text-white"
										: "text-fuchsia-400 group-hover:text-fuchsia-300"
								}`}
							>
								{specialtyIcons[specialty.id] || (
									<FaStethoscope />
								)}{" "}
								{/* Fallback icon */}
							</div>
							<span
								className={`font-medium text-sm transition-all duration-300 ${
									selectedId === specialty.id
										? "font-bold"
										: "text-white/90"
								}`}
							>
								{specialty.label}
							</span>
						</button>
					))}
				</div>

				<footer className='flex items-center justify-center min-h-[50px] p-4 mt-10 text-lg bg-black/20 rounded-xl'>
					{selectedLabel ? (
						<p>
							Searching for:{" "}
							<strong className='font-bold text-sky-400'>
								{selectedLabel}
							</strong>
						</p>
					) : (
						<p className='text-white/60'>
							Please select a specialty
						</p>
					)}
				</footer>
			</div>
		</main>
	);
};

export default DoctorSelector;

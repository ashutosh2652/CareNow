import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = () => {
	const [animatedElements, setAnimatedElements] = useState(new Set());
	const observer = useRef();

	useEffect(() => {
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

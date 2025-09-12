import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = () => {
	const [visibleElements, setVisibleElements] = useState(new Set());

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setVisibleElements(
							prev => new Set(prev.add(entry.target))
						);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
		);

		const elements = document.querySelectorAll(".animate-on-scroll");
		elements.forEach(el => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	return visibleElements;
};

import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optional: disconnect if we only want it to trigger once
                    if (elementRef.current) observer.unobserve(elementRef.current);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% is visible
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return { elementRef, isVisible };
};

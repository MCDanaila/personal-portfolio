"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./card"; // Correct relative import based on project structure
import portfolioData from "../../data/portfolio.json";
import { LocalIcons } from "../../assets/icons";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
};

export interface Carousel3DProps {
    items: any[];
    autoRotate?: boolean;
    rotateInterval?: number;
    cardHeight?: number;
    title?: string;
    subtitle?: string;
    tagline?: string;
    isMobileSwipe?: boolean;
}

const invertInDarkMode = ["Flask", "GitHub", "LangChain"];
const invertInLightMode = ["RAG", "ChromaDB", "AWS"];

const Carousel3D = ({
    items,
    autoRotate = true,
    rotateInterval = 4000,
    cardHeight = 500,
}: Carousel3DProps) => {
    const [active, setActive] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const isMobile = useIsMobile();
    const minSwipeDistance = 50;
    const { skills } = portfolioData;

    // Build a map of skill name to its category for theming
    const skillCategoryMap = useMemo(() => {
        return skills.categories.reduce((acc, cat) => {
            cat.items.forEach(item => {
                acc[item.name] = cat.title;
            });
            return acc;
        }, {} as Record<string, string>);
    }, [skills.categories]);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Frontend': return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400';
            case 'Backend': return 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400';
            case 'Database': return 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400';
            case 'Cloud & Tools': return 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400';
            case 'AI & Data': return 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-500/10 dark:text-fuchsia-400';
            default: return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400';
        }
    };

    useEffect(() => {
        if (autoRotate && isInView && !isHovering) {
            const interval = setInterval(() => {
                setActive((prev) => (prev + 1) % items.length);
            }, rotateInterval);
            return () => clearInterval(interval);
        }
    }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.2 });
        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) {
            setActive((prev) => (prev + 1) % items.length);
        } else if (distance < -minSwipeDistance) {
            setActive((prev) => (prev - 1 + items.length) % items.length);
        }
    };

    const getCardAnimationClass = (index: number) => {
        if (index === active) return "scale-100 opacity-100 z-20";
        if (index === (active + 1) % items.length) return "translate-x-[40%] scale-95 opacity-60 z-10";
        if (index === (active - 1 + items.length) % items.length) return "translate-x-[-40%] scale-95 opacity-60 z-10";
        return "scale-90 opacity-0 pointer-events-none";
    };

    if (!items || items.length === 0) return null;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 min-w-[350px] md:min-w-[1000px] max-w-7xl mx-auto">
            <div
                className="relative overflow-hidden h-[600px]"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                ref={carouselRef}
            >
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 w-full max-w-lg transform transition-all duration-500 ease-out ${getCardAnimationClass(index)}`}
                        >
                            <Card className={`overflow-hidden bg-background h-[${cardHeight}px] border shadow-md hover:shadow-xl transition-shadow flex flex-col rounded-2xl`}>
                                {/* Image Header Area */}
                                <div
                                    className="relative bg-black flex items-center justify-center h-56 overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${item.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/60 transition-opacity hover:bg-black/40 duration-300" />
                                    <div className="relative z-10 text-center text-white p-6">
                                        <h3 className="text-2xl font-bold mb-2 tracking-tight">{item.brand?.toUpperCase()}</h3>
                                        <div className="w-12 h-1 bg-white mx-auto mb-3 rounded-full opacity-80" />
                                        <p className="text-sm font-medium opacity-90">{item.date}</p>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <CardContent className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-1 text-foreground">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">
                                        {item.subtitle}
                                    </p>

                                    <div className="mt-auto flex flex-col gap-5">
                                        {/* Thematic Skill Badges */}
                                        {item.skills && item.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.skills.map((skillName: string, idx: number) => {
                                                    const src = LocalIcons[skillName];
                                                    const categoryTitle = skillCategoryMap[skillName] || 'Other';

                                                    const themeFilter = invertInDarkMode.includes(skillName)
                                                        ? "dark:invert"
                                                        : invertInLightMode.includes(skillName)
                                                            ? "invert dark:invert-0"
                                                            : "";

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${getCategoryColor(categoryTitle)}`}
                                                        >
                                                            {src && (
                                                                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                                                                    <img
                                                                        src={src}
                                                                        alt={skillName}
                                                                        className={`w-full h-full object-contain ${themeFilter}`}
                                                                        loading="lazy"
                                                                    />
                                                                </div>
                                                            )}
                                                            <span>{skillName}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}

                                        {/* Link action */}
                                        {item.link && item.link !== "#" && (
                                            <a href={item.link} className="text-blue-500 dark:text-blue-400 font-semibold text-sm flex items-center hover:underline relative group w-max">
                                                <span className="relative z-10">View Project</span>
                                                <ArrowRight className="ml-1.5 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                                            </a>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {!isMobile && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-foreground hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 z-30 shadow-sm transition-all hover:scale-105"
                            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-foreground hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 z-30 shadow-sm transition-all hover:scale-105"
                            onClick={() => setActive((prev) => (prev + 1) % items.length)}
                            aria-label="Next"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-3 z-30">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            className={`h-2 rounded-full transition-all duration-300 shadow-sm ${active === idx
                                ? "bg-blue-500 dark:bg-blue-400 w-6"
                                : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500 w-2"
                                }`}
                            onClick={() => setActive(idx)}
                            aria-label={`Go to item ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Carousel3D;

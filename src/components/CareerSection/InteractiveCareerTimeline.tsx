import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../../data/portfolio.json";
import { MapPin } from "lucide-react";
import { LocalIcons } from "../../assets/icons";

// These brands' icons were downloaded explicitly as pure black (#000000) for light mode.
const invertInDarkMode = ["Flask", "GitHub", "LangChain"];
const invertInLightMode = ["RAG", "ChromaDB", "AWS"];

export const InteractiveCareerTimeline = () => {
    const { career, skills } = portfolioData;

    // Set first event as active by default
    const [activeIndex, setActiveIndex] = useState(0);

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
            default: return 'bg-background dark:bg-neutral-900 text-foreground/80 border border-border dark:border-neutral-800';
        }
    };

    const activeEvent = career.events[activeIndex];

    // Helper to split description into bullets (since the JSON holds it as a single string paragraph, we split by '.' for now, or just render it cleanly)
    // For better visual matching of the screenshot which has bullets:
    const descriptionPoints = activeEvent.description
        .split('.')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    return (
        <div className="flex flex-col md:flex-row gap-8 bg-background dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden min-h-[500px]">

            {/* Left Pane: Navigation List */}
            <div className="md:w-1/3 border-r border-border dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <div className="flex flex-col h-full">
                    {career.events.map((event, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`flex flex-col text-left px-6 py-5 border-b border-border dark:border-neutral-800 transition-colors last:border-b-0 relative
                  ${isActive
                                        ? "bg-white dark:bg-neutral-800 shadow-sm"
                                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                                    }
                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                <h4 className={`font-bold transition-colors ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                                    {event.subtitle} {/* In JSON, subtitle holds Company name */}
                                </h4>
                                <div className="text-xs text-muted-foreground mt-1 mb-2 font-medium">
                                    {event.year}
                                </div>
                                <div className={`text-sm ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-primary/70'}`}>
                                    {event.title} {/* Title holds the exact Role */}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Right Pane: Content Details */}
            <div className="md:w-2/3 p-8 relative flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex-1"
                    >
                        {/* Header Content */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                                    {activeEvent.title}
                                </h2>
                                <div className="flex items-center gap-4 text-muted-foreground font-medium">
                                    <span className="text-foreground">{activeEvent.subtitle}</span>
                                    {/* Mocking location since JSON lacks it, matching styling */}
                                    {activeIndex === 0 && (
                                        <span className="flex items-center gap-1 text-sm">
                                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                                            Zurich, Switzerland
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="shrink-0 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm self-start">
                                {activeEvent.year}
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="mb-10">
                            <h5 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-4">
                                Key Achievements & Responsibilities
                            </h5>
                            <ul className="space-y-3">
                                {descriptionPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                        <span className="text-foreground/90 leading-relaxed text-sm lg:text-base">
                                            {point}.
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Stack Section */}
                        {activeEvent.skills && activeEvent.skills.length > 0 && (
                            <div>
                                <h5 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-4">
                                    Tech Stack Utilized
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {activeEvent.skills.map((skillName: string, idx: number) => {
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
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${getCategoryColor(categoryTitle)}`}
                                            >
                                                {src && (
                                                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
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
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
};

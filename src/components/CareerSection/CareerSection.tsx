import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../../data/portfolio.json";
import { CareerTimeline } from "./CareerTimeline";
import { InteractiveCareerTimeline } from "./InteractiveCareerTimeline";

export const CareerSection = () => {
    const { career } = portfolioData;
    const [activeMode, setActiveMode] = useState<'timeline' | 'interactive'>('interactive');

    return (
        <section id="career" className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="text-left">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-3">
                        {career.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        {career.subtitle}
                    </p>
                </div>

                {/* Toggle Switch */}
                <div className="bg-neutral-100 dark:bg-neutral-800/50 p-1.5 rounded-xl inline-flex self-start md:self-auto shrink-0 border border-border/50 dark:border-neutral-800">
                    <button
                        onClick={() => setActiveMode('interactive')}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeMode === 'interactive'
                            ? 'bg-white dark:bg-neutral-700 shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-neutral-200/50 dark:hover:bg-neutral-800'
                            }`}
                    >
                        Interactive
                    </button>
                    <button
                        onClick={() => setActiveMode('timeline')}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeMode === 'timeline'
                            ? 'bg-white dark:bg-neutral-700 shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-neutral-200/50 dark:hover:bg-neutral-800'
                            }`}
                    >
                        Timeline
                    </button>
                </div>
            </div>

            <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                    {activeMode === 'interactive' ? (
                        <motion.div
                            key="interactive"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                        >
                            <InteractiveCareerTimeline />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Note: CareerTimeline handles its own layout, we just wrap it */}
                            <CareerTimeline />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

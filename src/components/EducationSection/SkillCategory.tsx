import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../../data/portfolio.json";
import { LocalIcons } from "../../assets/icons";

// These brands' icons were downloaded explicitly as pure black (#000000) for light mode.
// Consequently, they must be inverted to pure white during dark mode to remain visible.
// For CDN fallbacks that are purely white, they must be inverted in light mode.
const invertInDarkMode = ["Flask", "GitHub", "LangChain"];
const invertInLightMode = ["RAG", "ChromaDB", "AWS"];

export default function ProfessionalProfile() {
  const { skills, career } = portfolioData;

  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...skills.categories.map(c => c.title)];

  const displayedSkills = useMemo(() => {
    if (activeFilter === "All") {
      return skills.categories.flatMap(c => c.items.map(item => ({ ...item, categoryTitle: c.title })));
    }
    const category = skills.categories.find(c => c.title === activeFilter);
    if (category) {
      return category.items.map(item => ({ ...item, categoryTitle: category.title }));
    }
    return [];
  }, [activeFilter, skills.categories]);

  const skillFrequencies = useMemo(() => {
    const freqs: Record<string, number> = {};
    career.events.forEach(event => {
      event.skills.forEach(skill => {
        freqs[skill] = (freqs[skill] || 0) + 1;
      });
    });
    return Object.entries(freqs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8); // Top 8 skills
  }, [career]);

  const maxFreq = Math.max(...skillFrequencies.map(f => f[1]), 1);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend': return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400';
      case 'Backend': return 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400';
      case 'Database': return 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400';
      case 'Cloud & Tools': return 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400';
      case 'AI & Data': return 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-500/10 dark:text-fuchsia-400';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400';
    }
  };

  return (
    <motion.section
      id="skills"
      className="space-y-6 pt-16 pb-10"
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-2">Technical Ecosystem</h3>
        <p className="text-muted-foreground text-sm max-w-4xl">
          A deep dive into the specific tools and technologies mastered. Use the filters to organize the stack by category, or view the chart to see the most frequently applied skills across roles.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Left pane: Interactive filters and skills grid */}
        <div className="flex-1 bg-background dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === cat
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 min-h-[300px] content-start"
          >
            <AnimatePresence mode="popLayout">
              {displayedSkills.map(skill => {
                const src = LocalIcons[skill.name] || skill.icon;
                const themeFilter = invertInDarkMode.includes(skill.name)
                  ? "dark:invert"
                  : invertInLightMode.includes(skill.name)
                    ? "invert dark:invert-0"
                    : "";

                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-transform hover:scale-105 cursor-default truncate ${getCategoryColor(skill.categoryTitle)}`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <img
                        src={src}
                        alt={skill.name}
                        className={`w-full h-full object-contain ${themeFilter}`}
                        loading="lazy"
                      />
                    </div>
                    <span className="truncate">{skill.name}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right pane: Top Skills Chart */}
        <div className="lg:w-1/3 min-w-[300px] bg-background dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <h4 className="text-xl font-bold mb-6 text-foreground">Top Skills by Usage</h4>

            <div className="space-y-4">
              {skillFrequencies.map(([skill, freq], index) => (
                <div key={skill} className="flex items-center gap-3 text-sm">
                  <div className="w-20 text-right text-muted-foreground font-medium truncate shrink-0">
                    {skill}
                  </div>
                  <div className="flex-1 h-6 bg-neutral-100 dark:bg-neutral-800 rounded-sm relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(freq / maxFreq) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full bg-blue-600 rounded-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
              <div className="w-20 shrink-0" />
              <div className="flex-1 flex justify-between px-1">
                {Array.from({ length: maxFreq + 1 }).map((_, i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Estimated frequency of usage across all projects.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

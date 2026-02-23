import { motion } from "framer-motion";
import portfolioData from "../../data/portfolio.json";
import { LocalIcons } from "../../assets/icons";

// These brands' icons were downloaded explicitly as pure black (#000000) for light mode.
// Consequently, they must be inverted to pure white during dark mode to remain visible.
// For CDN fallbacks that are purely white, they must be inverted in light mode.
const invertInDarkMode = ["Flask", "GitHub", "LangChain"];
const invertInLightMode = ["RAG", "ChromaDB", "AWS"];

export default function ProfessionalProfile() {
  const { skills } = portfolioData;

  return (
    <motion.section
      id="skills"
      className="space-y-12 py-10"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold mb-10">{skills.title}</h3>

        <div className="space-y-10">
          {skills.categories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-xl font-bold text-foreground/90">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-4">
                {category.items.map((skill, skillIndex) => {
                  const src = LocalIcons[skill.name] || skill.icon;
                  // Dynamic thematic styling based on the specific logo polarity
                  const themeFilter = invertInDarkMode.includes(skill.name)
                    ? "dark:invert"
                    : invertInLightMode.includes(skill.name)
                      ? "invert dark:invert-0"
                      : "";

                  return (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-4 py-2 bg-background dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-default shadow-sm text-sm font-medium"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        <img
                          src={src}
                          alt={skill.name}
                          className={`w-full h-full object-contain ${themeFilter}`}
                          loading="lazy"
                        />
                      </div>
                      <span>{skill.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Award, Layers, Users, Globe } from "lucide-react";
import portfolioData from "../../data/portfolio.json";
import { LocalIcons } from "../../assets/icons";

const invertInDarkMode = ["Flask", "GitHub", "LangChain"];
const invertInLightMode = ["RAG", "ChromaDB", "AWS"];

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-4 w-4 mr-2 text-primary" />,
  Layers: <Layers className="h-4 w-4 mr-2 text-primary" />,
  Briefcase: <Briefcase className="h-4 w-4 mr-2 text-primary" />,
  Award: <Award className="h-4 w-4 mr-2 text-primary" />,
  Users: <Users className="h-4 w-4 mr-2 text-primary" />
};

export const CareerTimeline = () => {
  const { career, skills } = portfolioData;

  // Build a map of skill name to its category
  const skillCategoryMap = skills.categories.reduce((acc, cat) => {
    cat.items.forEach(item => {
      acc[item.name] = cat.title;
    });
    return acc;
  }, {} as Record<string, string>);

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

  const careerEvents = career.events.map((event) => ({
    ...event,
    icon: iconMap[event.icon] || <Briefcase className="h-4 w-4 mr-2 text-primary" />,
    customContent: event.skills && event.skills.length > 0 ? (
      <div className="flex flex-wrap gap-2 mt-4">
        {event.skills.map((skillName: string, idx: number) => {
          const src = LocalIcons[skillName];
          if (!src) return null;

          const themeFilter = invertInDarkMode.includes(skillName)
            ? "dark:invert"
            : invertInLightMode.includes(skillName)
              ? "invert dark:invert-0"
              : "";

          const categoryTitle = skillCategoryMap[skillName] || 'Other';

          return (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity ${getCategoryColor(categoryTitle)}`}
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                <img
                  src={src}
                  alt={skillName}
                  className={`w-full h-full object-contain ${themeFilter}`}
                  loading="lazy"
                />
              </div>
              <span className="truncate">{skillName}</span>
            </div>
          );
        })}
      </div>
    ) : null
  }));

  return (
    <div id="career">
      <ScrollTimeline
        events={careerEvents}
        title=""
        subtitle=""
        animationOrder="sequential"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
        dateFormat="badge"
      />
    </div>
  );
};

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
  const { career } = portfolioData;

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

          return (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-background dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-md shadow-sm text-xs font-semibold text-foreground/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                <img
                  src={src}
                  alt={skillName}
                  className={`w-full h-full object-contain ${themeFilter}`}
                  loading="lazy"
                />
              </div>
              <span>{skillName}</span>
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
        title={career.title}
        subtitle={career.subtitle}
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

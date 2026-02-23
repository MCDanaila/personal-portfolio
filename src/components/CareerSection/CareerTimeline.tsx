import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Award, Layers, Users, Globe } from "lucide-react";
import portfolioData from "../../data/portfolio.json";

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
    icon: iconMap[event.icon] || <Briefcase className="h-4 w-4 mr-2 text-primary" />
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

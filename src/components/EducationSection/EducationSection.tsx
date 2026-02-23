import { Card, CardHeader, CardTitle, CardContent } from "../lightswind/card";
import ProfessionalProfile from "./SkillCategory";
import { motion } from "framer-motion";
import portfolioData from "../../data/portfolio.json";

export const EducationSection = () => {
  const { education } = portfolioData;

  return (
    <motion.section
      id="education"
      className="space-y-10 py-10 px-6"
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Education */}
      <div>
        <motion.h3
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {education.title}
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {education.items.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.degree}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {item.institution} — {item.period}
                </p>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  {item.descriptionStart}
                  {item.highlights.map((highlight, hIdx) => (
                    <span key={hIdx}>
                      <strong>{highlight}</strong>
                      {hIdx < item.highlights.length - 1 ? (hIdx === item.highlights.length - 2 ? ", and " : ", ") : "."}
                    </span>
                  ))}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      <ProfessionalProfile />
    </motion.section>
  );
};

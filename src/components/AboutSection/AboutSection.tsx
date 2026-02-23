import { Separator } from "../lightswind/separator";
import { motion } from "framer-motion";
import portfolioData from "../../data/portfolio.json";
import { InteractiveDescription } from "./InteractiveDescription";

export const AboutSection = () => {
  const { about } = portfolioData;

  return (
    <motion.div
      id="about"
      className="text-foreground max-w-7xl mx-auto w-full px-6 py-12 space-y-4"
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl font-bold">{about.title}</h2>

      {/* Interactive Click-to-reveal text paragraph */}
      <InteractiveDescription text={about.interactiveDescription || about.description} />

      <Separator />
    </motion.div>
  );
};;

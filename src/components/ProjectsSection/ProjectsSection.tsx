"use client";

import { useState } from "react";
import { DragOrderList } from "../lightswind/DragOrderList";
import { motion } from "framer-motion";
import portfolioData from "../../data/portfolio.json";

export const ProjectsSection = () => {
  const { projects: projectsData } = portfolioData;
  const [projects] = useState(projectsData.items);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ when: "beforeChildren", staggerChildren: 0.1 }}
    >
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h2
          className="text-3xl font-bold text-foreground mb-8 text-center"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {projectsData.title}
        </motion.h2>
        <DragOrderList items={projects} />
      </section>
    </motion.div>
  );
};

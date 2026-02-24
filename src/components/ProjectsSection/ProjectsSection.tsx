"use client";

import { useState } from "react";
import Carousel3D from "../lightswind/carousel-3d";
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
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {projectsData.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of systems, platforms, and architectures built across domains.
          </p>
        </motion.div>

        {/* Carousel 3D Component */}
        <Carousel3D items={projects} autoRotate={true} rotateInterval={5000} cardHeight={520} />

      </section>
    </motion.div>
  );
};

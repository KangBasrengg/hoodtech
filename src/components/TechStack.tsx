"use client";

import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiFramer, 
  SiNodedotjs, SiExpress, SiNestjs, SiLaravel, SiGo, SiPython,
  SiPostgresql, SiMysql, SiMongodb, SiRedis,
  SiDocker, SiGooglecloud, SiVercel, SiGit, SiGithubactions
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export default function TechStack() {
  const stack = [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Vue.js", icon: SiVuedotjs },
    { name: "TailwindCSS", icon: SiTailwindcss },
    { name: "Framer Motion", icon: SiFramer },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "NestJS", icon: SiNestjs },
    { name: "Laravel", icon: SiLaravel },
    { name: "Golang", icon: SiGo },
    { name: "Python", icon: SiPython },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Redis", icon: SiRedis },
    { name: "Docker", icon: SiDocker },
    { name: "AWS", icon: FaAws },
    { name: "Google Cloud", icon: SiGooglecloud },
    { name: "Vercel", icon: SiVercel },
    { name: "Git", icon: SiGit },
    { name: "GitHub Actions", icon: SiGithubactions }
  ];

  return (
    <section id="stack" className="py-24 px-6 border-y border-border-subtle">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <span className="text-brand font-medium block mb-2">$ cat package.json</span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-primary">Tech stack kami</h2>
        </div>

        <div className="relative overflow-hidden flex w-full max-w-full">
          {/* Gradient masks for smooth fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />

          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 30, // slow rotation
              repeat: Infinity,
            }}
          >
            {/* Duplicate array to create seamless loop */}
            {[...stack, ...stack].map((tech, i) => {
              const Icon = tech.icon || SiReact;
              return (
                <div
                  key={`${tech.name}-${i}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border-subtle bg-bg-secondary text-sm text-fg-primary hover:border-brand hover:text-brand transition-colors cursor-default whitespace-nowrap shrink-0"
                >
                  <Icon className="w-4 h-4" />
                  {tech.name}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { premiumEase } from "@/components/ui/reveal";

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip-linkedin-team01)">
      <path d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip-linkedin-team01">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

type TeamMember = {
  name: string;
  role: string;
  image: string;
  socials: {
    website: string;
    linkedin: string;
  };
};

const teamData: TeamMember[] = [
  {
    name: "Hardik Ghodasara",
    role: "Founder & AI Automation Specialist",
    image: "images/hardik.webp",
    socials: {
      website: "#",
      linkedin: "https://www.linkedin.com/in/hardikghodasara/",
    },
  },
  {
    name: "Meet Gadara",
    role: "Founder & Backend & Database Specialist",
    image: "images/meet.webp",
    socials: {
      website: "#",
      linkedin: "https://www.linkedin.com/in/meetgadara24/",
    },
  },
  {
    name: "Karan Kalavadiya",
    role: "Founder & Full Stack Devloper & Security Auditor",
    image: "images/karan.webp",
    socials: {
      website: "#",
      linkedin: "https://www.linkedin.com/in/karan-kalavadiya/",
    },
  },
];

export default function Team() {
  return (
    <section className="bg-brand-white section-padding relative overflow-hidden text-brand-ink">
      <div className="container relative z-10">
        <div className="flex flex-col gap-12 md:gap-20">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: premiumEase,
            }}
            className="mb-8"
          >
            <p className="mb-4 font-sans text-label font-semibold uppercase tracking-[0.12em] text-brand-purple">
              Team
            </p>
            <h2 className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.02em] text-brand-ink mb-6">
              Meet the creative minds behind our success
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {teamData?.map((value, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: premiumEase,
                  }}
                  className="group flex flex-col items-center justify-center gap-6"
                >
                  <div className="w-full aspect-square overflow-hidden rounded-2xl bg-brand-paper">
                    <img
                      className="w-full h-full object-cover group-hover:grayscale transition-all duration-500"
                      src={value.image}
                      alt={value.name}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-4 items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <h3 className="font-display text-2xl font-medium text-brand-ink">
                        {value.name}
                      </h3>
                      <p className="text-body-md text-brand-ink-muted">
                        {value.role}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={value.socials.linkedin}
                        className="p-3 text-brand-ink-muted hover:text-brand-ink hover:bg-brand-paper rounded-full transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIcon size={18} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

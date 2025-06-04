import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegCalendarCheck,
  FaClipboardCheck,
  FaStore,
  FaUsers,
  FaBullhorn,
} from "react-icons/fa";

/**
 * Modern expandable ribbon‑carousel section (inspired by the screenshots)
 * ‑ 100% width ribbon of vertical tiles
 * ‑ On hover (desktop) or tap (mobile) a tile expands to reveal details
 * ‑ Non‑active tiles shrink and show a vertically‑rotated label
 * ‑ Pure Tailwind v4 utilities, Framer‑Motion flex animation
 */

interface Service {
  id: string;
  title: string;
  tagline: string;
  color: string; // gradient classes
  Icon: React.ComponentType<{ size?: number }>;
}

const services: Service[] = [
  {
    id: "planning",
    title: "Event Planning",
    tagline: "Crafting Ideas into Impact",
    color: "from-pink-500 via-fuchsia-500 to-indigo-500",
    Icon: FaRegCalendarCheck,
  },
  {
    id: "management",
    title: "Event Management",
    tagline: "Seamless Execution, Every Time",
    color: "from-purple-500 via-violet-500 to-sky-500",
    Icon: FaClipboardCheck,
  },
  {
    id: "exhibition",
    title: "Exhibition",
    tagline: "Showcasing Innovation on a Global Stage",
    color: "from-teal-500 via-cyan-500 to-emerald-500",
    Icon: FaStore,
  },
  {
    id: "conference",
    title: "Conference",
    tagline: "Where Thought Leaders Converge",
    color: "from-amber-400 via-orange-500 to-rose-500",
    Icon: FaUsers,
  },
  {
    id: "media",
    title: "Media & Marketing",
    tagline: "Amplifying Your Message Worldwide",
    color: "from-lime-500 via-green-500 to-emerald-500",
    Icon: FaBullhorn,
  },
];

export default function ServicesSection() {
  // Default to first tile expanded
  const [active, setActive] = useState<string>(services[0].id);

  return (
    <section className="w-full overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Our Expertise
        </h2>

        {/* Ribbon */}
        <div className="flex h-[480px] select-none overflow-hidden rounded-3xl shadow-2xl">
          {services.map(({ id, title, tagline, color, Icon }) => {
            const isActive = id === active;
            return (
              <motion.div
                key={id}
                layout
                onMouseEnter={() => setActive(id)}
                onFocus={() => setActive(id)}
                onClick={() => setActive(id)}
                className="relative flex cursor-pointer items-center justify-center overflow-hidden bg-black/20 text-white transition-colors"
                animate={{ flex: isActive ? 5 : 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${color}`}
                />

                {/* Collapsed — rotated label */}
                <AnimatePresence initial={false}>
                  {!isActive && (
                    <motion.h3
                      key="label"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="whitespace-nowrap text-xl font-semibold drop-shadow-lg md:-rotate-90 md:tracking-wide"
                    >
                      {title}
                    </motion.h3>
                  )}
                </AnimatePresence>

                {/* Expanded — full content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-full w-full flex-col justify-between p-8 md:p-12"
                    >
                      <div className="flex items-center gap-4">
                        <Icon size={36} />
                        <h3 className="text-2xl font-semibold md:text-3xl">
                          {title}
                        </h3>
                      </div>

                      <p className="mt-6 max-w-lg text-base leading-relaxed md:text-lg">
                        {tagline}
                      </p>

                      <button className="mt-8 w-max rounded-full bg-white/90 px-6 py-2 text-base font-medium text-black shadow-md transition hover:bg-white">
                        Learn more
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

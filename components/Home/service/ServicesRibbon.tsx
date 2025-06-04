import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Service = {
  id: string;
  title: string;
  tagline: string;
  image: string;
};

const services: Service[] = [
  {
    id: "expo",
    title: "Exhibitions & Conference",
    tagline: "Showcasing innovation on a global stage",
    image: "/assets/imgs/services/Exhibitions and Conference.png",
  },
  {
    id: "events",
    title: "Event Management & Planning",
    tagline: "Seamless execution, every time",
    image: "/assets/imgs/services/Event management & Planing.png",
  },
  {
    id: "media",
    title: "Media & Marketing",
    tagline: "Amplifying your message worldwide",
    image: "/assets/imgs/services/media & marketing .png",
  },
];

export default function ServicesRibbon() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full overflow-hidden">
      {/* Remove fixed height on mobile; only set height on desktop */}
      <div className="flex flex-col sm:flex-row sm:h-[500px]">
        {services.map((service) => {
          const isActive = active === service.id;

          return (
            <motion.div
              key={service.id}
              className={`relative cursor-pointer transition-all duration-500 ease-in-out flex-shrink-0
                w-full sm:w-auto sm:flex-1
                ${isActive ? "sm:flex-[3]" : "sm:flex-1"} h-[250px] sm:h-auto`}
              onClick={() => setActive(service.id)}
            >
              {/* Image container now fills its parent height */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                quality={100}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 z-10" />

              {/* Desktop overlay: title + tagline when active */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.4 }}
                className="hidden sm:flex absolute inset-0 z-20 flex-col justify-center px-6 text-white"
              >
                <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
                <p className="text-base">{service.tagline}</p>
              </motion.div>

              {/* Vertical title on non-active desktop tiles */}
              {!isActive && (
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden sm:block absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xl font-medium z-30"
                >
                  {service.title}
                </motion.div>
              )}

              {/* Mobile title overlay: full width card shows title at bottom */}
              <div className="sm:hidden absolute bottom-1/2  left-1/2 -translate-x-1/2 text-white text-lg font-semibold z-30">
                {service.title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

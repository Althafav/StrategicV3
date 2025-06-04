import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="bg-primary text-white p-6 rounded-xl shadow-xl">
            <FaEnvelopeOpenText size={48} />
          </div>
        </motion.div>

        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
            Let’s Talk About Your Event
          </h2>
          <p className="text-gray-600 mb-6">
            Whether you have questions, need a quote, or want to start planning
            now, we’re here to help. Reach out to our team today!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact" passHref>
              <span className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200">
                Contact Us Now
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

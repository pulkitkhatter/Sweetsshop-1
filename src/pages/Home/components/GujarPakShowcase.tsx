import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Award, Leaf, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import gujarpak from "../../../assets/gajarpak.jpg";

const GujarPakShowcase = () => {
  return (
    <motion.section
      className="py-16 md:py-24 bg-[#E3CBC6] relative overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 0.55, 0.35, 0.9] }}
    >
      {/* Background Blobs (soft floating, premium feel) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-[420px] h-[420px] bg-[#FFDCDB] rounded-full blur-3xl opacity-40"
          animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-[#CAE2B8] rounded-full blur-2xl opacity-40"
          animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-14 md:gap-20">
          {/* IMAGE SIDE */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 0.55, 0.35, 0.9] }}
          >
            <motion.div
              className="relative w-full max-w-lg lg:max-w-xl"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image Card */}
              <div
                className="relative rounded-3xl overflow-hidden 
                           shadow-[0_15px_45px_rgba(0,0,0,0.13)]
                           border-[10px] border-white bg-white"
              >
                <motion.img
                  src={gujarpak}
                  alt="Gajar Pak"
                  className="w-full object-cover 
                             aspect-[4/5] md:aspect-[5/6] lg:aspect-[5/6]"
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* BADGE – Signature */}
              <motion.div
                className="absolute top-4 right-4 bg-[#BC8649] text-white 
                           px-5 py-2 rounded-full text-sm font-semibold 
                           shadow-md rotate-2"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Signature</span>
                </div>
              </motion.div>

              {/* BADGE – Pure A2 Ghee */}
              <motion.div
                className="absolute bottom-4 left-4 bg-white text-[#BC8649]
                           px-5 py-2 rounded-full text-sm font-semibold 
                           shadow-md border border-[#DDDECB] -rotate-2"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                whileHover={{ scale: 1.05, rotate: -4 }}
              >
                <div className="flex items-center gap-1">
                  <Leaf className="w-4 h-4 text-[#BC8649]" />
                  <span>Pure A2 Ghee</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* TEXT SIDE */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 0.55, 0.35, 0.9] }}
          >
            {/* Pill */}
            <motion.div
              className="inline-flex items-center bg-[#FFDCDB] text-[#BC8649] 
                         px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              Heritage Dessert Series
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold 
                         text-black font-serif leading-tight"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              Gajar <span className="text-[#BC8649]">Pak</span>
            </motion.h2>

            {/* Rating */}
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-[#BC8649] fill-current"
                />
              ))}
              <span className="ml-2 text-[#6F594A] text-base font-medium">
                4.9 (128 Reviews)
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg leading-relaxed text-[#6F594A]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.24 }}
            >
              Our Gajar Pak is crafted with hand-grated winter carrots, slow-cooked
              in pure A2 ghee and unrefined jaggery. Prepared in traditional brass
              vessels, each batch captures the nostalgic warmth of authentic
              Indian mithai. A dessert perfected over generations.
            </motion.p>

            {/* Features */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3, staggerChildren: 0.06 }}
            >
              <Feature
                icon={<Leaf className="w-6 h-6 text-[#BC8649]" />}
                title="Natural"
                subtitle="No additives"
              />
              <Feature
                icon={<Award className="w-6 h-6 text-[#BC8649]" />}
                title="Handcrafted"
                subtitle="Slow cooked"
              />
              <Feature
                icon={<Clock className="w-6 h-6 text-[#BC8649]" />}
                title="Fresh Daily"
                subtitle="Made everyday"
              />
              <Feature
                icon={<Users className="w-6 h-6 text-[#BC8649]" />}
                title="Family Recipe"
                subtitle="Since 1975"
              />
            </motion.div>

            {/* CTA BUTTONS */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.36 }}
            >
              <motion.div
                className="flex-1"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  to="/products"
                  className="flex-1 bg-black hover:bg-[#2C2C2C]
                             text-white px-8 py-4 rounded-full font-semibold text-lg
                             shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Shop Now
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  to="/products"
                  className="border-2 border-[#BC8649] text-[#BC8649]
                             hover:bg-[#BC8649] hover:text-white 
                             px-8 py-4 rounded-full font-semibold text-lg transition-all"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, subtitle }) => (
  <motion.div
    className="flex items-center bg-white p-4 rounded-xl 
               border border-[#DDDECB] shadow-sm hover:shadow-md transition-all"
    whileHover={{
      y: -3,
      scale: 1.02,
    }}
    transition={{ duration: 0.25, ease: [0.22, 0.55, 0.35, 0.9] }}
  >
    <div className="bg-[#F3F0C5] p-3 rounded-lg mr-3 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="font-bold text-black">{title}</p>
      <p className="text-sm text-[#6F594A]">{subtitle}</p>
    </div>
  </motion.div>
);

export default GujarPakShowcase;

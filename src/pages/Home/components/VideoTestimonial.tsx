import React from 'react';
import { motion } from 'framer-motion';

const VideoTestimonial = () => {
  return (
    <section className="my-20 py-16 bg-[#EBEBE8] relative overflow-hidden">

      {/* Soft pastel blobs for premium feel */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFDCDB] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#CAE2B8] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-[#BC8649] text-[#BC8649] py-1 px-4 rounded-full text-sm font-medium bg-white shadow-sm">
              Testimonial
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-5 text-center text-black">
            Customer Experience
          </h2>

          <p className="text-center mt-5 text-black/70 max-w-md">
            See what our customers say about their experience with Super Sweets.
          </p>
        </motion.div>

        {/* VIDEO PLAYER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border-8 border-white shadow-[#BC8649]/20">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/xEzV5uiF4WY?rel=0&modestbranding=1"
              title="Customer Testimonial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VideoTestimonial;

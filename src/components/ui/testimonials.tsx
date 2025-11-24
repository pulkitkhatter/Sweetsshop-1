import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchTestimonials, Testimonial } from "@/data/testimonials";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Error loading testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-[#DDDECB] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-block bg-white shadow border border-[#BC8649]/40 px-4 py-1 rounded-full text-sm font-semibold text-[#BC8649]">
              Testimonials
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-black mt-5">
              What Our Customers Say
            </h2>

            <p className="text-black/70 mt-3">
              Sweet stories shared by people who love our traditional mithai.
            </p>
          </div>

          {/* LOADING CARDS */}
          <div className="flex justify-center gap-5 mt-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-72 h-64 bg-white rounded-3xl shadow-xl border border-[#BC8649]/20 p-6 animate-pulse"
              >
                <div className="h-20 bg-[#BC8649]/10 rounded mb-4"></div>
                <div className="flex gap-3 items-center mt-5">
                  <div className="w-10 h-10 rounded-full bg-[#BC8649]/30" />
                  <div className="flex flex-col w-full">
                    <div className="h-4 w-24 bg-[#BC8649]/15 rounded mb-2"></div>
                    <div className="h-3 w-16 bg-[#BC8649]/10 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="py-20 bg-[#151515] relative overflow-hidden">

      {/* Pastel Background Blobs */}
   

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto"
        >
          <div className="inline-block bg-white border border-[#BC8649] px-5 py-1.5 rounded-full text-sm font-semibold text-[#BC8649] shadow">
            Customer Reviews
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-5 leading-tight">
            Loved by Sweet Lovers Everywhere
          </h2>

          <p className="text-white/70 mt-4 text-lg">
            Genuine feedback from people who enjoy the magic of SuperSweets.
          </p>
        </motion.div>

        {/* COLUMNS */}
        <div
          className="flex justify-center gap-6 mt-16
          [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]
          max-h-[760px] overflow-hidden"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={20}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

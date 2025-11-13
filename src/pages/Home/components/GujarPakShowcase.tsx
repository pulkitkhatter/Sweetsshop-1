import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Award, Leaf, Clock, Users } from "lucide-react";
import gujarpak from "../../../assets/gajarpak.jpg";

const GujarPakShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-[420px] h-[420px] bg-[#E8E2D8] rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-[#EDE4D7] rounded-full blur-2xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-14 md:gap-20">

          {/* IMAGE — NOW BIGGER */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg lg:max-w-xl">

              {/* Image Card */}
              <div className="relative rounded-3xl overflow-hidden 
                              shadow-[0_15px_45px_rgba(0,0,0,0.13)]
                              border-[10px] border-white">
                <img
                  src={gujarpak}
                  alt="Gajar Pak"
                  className="w-full object-cover 
                             aspect-[4/5] md:aspect-[5/6] lg:aspect-[5/6]"
                />
              </div>

              {/* BADGES — auto reposition */}
              <div className="absolute top-4 right-4 bg-[#A67C58] text-white 
                              px-5 py-2 rounded-full text-sm font-semibold 
                              shadow-md rotate-2">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Signature</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white text-[#5F4337] 
                              px-5 py-2 rounded-full text-sm font-semibold 
                              shadow-md border border-[#D8C9BD] -rotate-2">
                <div className="flex items-center gap-1">
                  <Leaf className="w-4 h-4" />
                  <span>Pure A2 Ghee</span>
                </div>
              </div>
            </div>
          </div>

          {/* TEXT SECTION */}
          <div className="w-full lg:w-1/2 space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center bg-[#EFE7DC] text-[#5F4337] 
                            px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
              Heritage Dessert Series
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold 
                           text-[#2C1810] font-serif leading-tight">
              Gajar <span className="text-[#5F4337]">Pak</span>
            </h2>

            {/* Ratings */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#A67C58] fill-current" />
              ))}
              <span className="ml-2 text-[#6F594A] text-base font-medium">
                4.9 (128 Reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-[#6F594A]">
              Our Gajar Pak is crafted with hand-grated winter carrots, slow-cooked 
              in pure A2 ghee and unrefined jaggery. Prepared in traditional brass 
              vessels, each batch captures the nostalgic warmth of authentic 
              Indian mithai. A dessert perfected over generations.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <Feature 
                icon={<Leaf className="w-6 h-6 text-[#A67C58]" />} 
                title="Natural" subtitle="No additives" 
              />
              <Feature 
                icon={<Award className="w-6 h-6 text-[#A67C58]" />} 
                title="Handcrafted" subtitle="Slow cooked" 
              />
              <Feature 
                icon={<Clock className="w-6 h-6 text-[#A67C58]" />} 
                title="Fresh Daily" subtitle="Made everyday" 
              />
              <Feature 
                icon={<Users className="w-6 h-6 text-[#A67C58]" />} 
                title="Family Recipe" subtitle="Since 1975" 
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/products"
                className="flex-1 bg-[#2C1810] hover:bg-[#4A2C20]
                           text-white px-8 py-4 rounded-full font-semibold text-lg
                           shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Shop Now
              </Link>

              <Link
                to="/products"
                className="border-2 border-[#A67C58] text-[#A67C58]
                           hover:bg-[#A67C58] hover:text-white 
                           px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Explore Collection
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title, subtitle }: any) => (
  <div className="flex items-center bg-white p-4 rounded-xl 
                  border border-[#E4D8CE] shadow-sm hover:shadow-md transition-all">
    <div className="bg-[#F3EDE6] p-3 rounded-lg mr-3">
      {icon}
    </div>
    <div>
      <p className="font-bold text-[#2C1810]">{title}</p>
      <p className="text-sm text-[#6F594A]">{subtitle}</p>
    </div>
  </div>
);

export default GujarPakShowcase;

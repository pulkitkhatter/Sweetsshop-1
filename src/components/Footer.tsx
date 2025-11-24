import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '../assets/logo.png';
import { useSettings } from '@/hooks/useSettings';
import QRCodeComponent from './QRCode';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';
import { motion } from 'framer-motion';

interface FooterProps {
  isAdminRoute?: boolean;
}

const columnAnimation = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.19, 1, 0.22, 1],
      delay: i * 0.15,
    },
  }),
};

const Footer: React.FC<FooterProps> = ({ isAdminRoute = false }) => {
  if (isAdminRoute) return null;

  const { settings } = useSettings();

  const contactInfo = {
    phone: settings?.store_phone || '+91 9996616153',
    email: settings?.store_email || 'contact@supersweets.fit',
    address:
      settings?.store_address ||
      'Shop number 5, Patel Nagar,\nHansi road, Patiala chowk,\nJIND (Haryana) 126102',
    storeName: settings?.store_name || 'SuperSweets',
  };

  return (
    <motion.footer
      className="bg-[#E3CBC6] text-black mt-20 border-t border-[#BC8649]/40"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 py-14">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* BRAND */}
          <motion.div
            className="space-y-5"
            variants={columnAnimation}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="SuperSweets Logo" className="w-12 h-12 object-contain" />
              <h3 className="text-2xl font-bold text-black">
                {contactInfo.storeName}
              </h3>
            </div>

            <p className="text-black/80 leading-relaxed">
              Authentic sweets made fresh daily with premium ingredients & traditional craftsmanship.
            </p>

            <div className="flex space-x-4 pt-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.18 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <Icon className="h-5 w-5 text-black hover:text-[#BC8649] cursor-pointer transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            className="space-y-4"
            variants={columnAnimation}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-black">Quick Links</h4>

            <div className="space-y-2 text-black/80">
              <Link to="/" className="block hover:text-[#BC8649]">Home</Link>
              <Link to="/products" className="block hover:text-[#BC8649]">All Sweets</Link>
              <Link to="/about" className="block hover:text-[#BC8649]">About Us</Link>
              <Link to="/contact" className="block hover:text-[#BC8649]">Contact Us</Link>
              <Link to="/cart" className="block hover:text-[#BC8649]">Shopping Cart</Link>
            </div>
          </motion.div>

          {/* ACCOUNT */}
          <motion.div
            className="space-y-4"
            variants={columnAnimation}
            initial="hidden"
            whileInView="visible"
            custom={2}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-black">Account</h4>

            <div className="space-y-2 text-black/80">
              <Link to="/profile" className="block hover:text-[#BC8649]">My Account</Link>
              <Link to="/auth" className="block hover:text-[#BC8649]">Login / Register</Link>
              <Link to="/checkout" className="block hover:text-[#BC8649]">Checkout</Link>
              <Link to="/products?filter=bestsellers" className="block hover:text-[#BC8649]">Bestsellers</Link>
              <Link to="/products?filter=new_arrivals" className="block hover:text-[#BC8649]">New Arrivals</Link>
            </div>
          </motion.div>

          {/* CATEGORIES */}
          <motion.div
            className="space-y-4"
            variants={columnAnimation}
            initial="hidden"
            whileInView="visible"
            custom={3}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-black">Categories</h4>

            <div className="space-y-2 text-black/80">
              <Link to="/products" className="block hover:text-[#BC8649]">Traditional Sweets</Link>
              <Link to="/products" className="block hover:text-[#BC8649]">Dry Fruit Sweets</Link>
              <Link to="/products" className="block hover:text-[#BC8649]">Fusion Desserts</Link>
              <Link to="/products" className="block hover:text-[#BC8649]">Gift Hampers</Link>
              <Link to="/products" className="block hover:text-[#BC8649]">Vegan Options</Link>
            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            className="space-y-4"
            variants={columnAnimation}
            initial="hidden"
            whileInView="visible"
            custom={4}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-black">Contact Us</h4>

            <div className="space-y-4 text-black/80">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#BC8649]" />
                <span>{contactInfo.phone}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#BC8649]" />
                <span>{contactInfo.email}</span>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#BC8649] mt-1" />
                <span className="whitespace-pre-line">{contactInfo.address}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MARQUEE + BOTTOM */}
        <motion.div
          className="mt-12 pt-8 border-t border-[#BC8649]/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <MarqueeAnimation
            direction="left"
            baseVelocity={-1.2}
            className="text-black/70 py-3 text-sm"
          >
            Freshly Made • Premium Ingredients • PAN-India Delivery • 48+ Years of Legacy • Perfect for Gifting
          </MarqueeAnimation>

          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-black/70 text-sm">
              © 2025 {contactInfo.storeName}. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6 mt-4 md:mt-0 items-center text-black/80">
              <Link to="/about" className="hover:text-[#BC8649] text-sm">About Us</Link>
              <Link to="/contact" className="hover:text-[#BC8649] text-sm">Contact</Link>
              <Link to="/products" className="hover:text-[#BC8649] text-sm">Sweets</Link>
              <Link to="/auth" className="hover:text-[#BC8649] text-sm">Login</Link>

              <QRCodeComponent />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '../assets/logo.png';
import { useSettings } from '@/hooks/useSettings';
import QRCodeComponent from './QRCode';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';

interface FooterProps {
  isAdminRoute?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isAdminRoute = false }) => {
  if (isAdminRoute) return null;

  const { settings, loading } = useSettings();

  const contactInfo = {
    phone: settings?.store_phone || '+91 9996616153',
    email: settings?.store_email || 'contact@supersweets.fit',
    address:
      settings?.store_address ||
      'Shop number 5, Patel Nagar,\nHansi road, Patiala chowk,\nJIND (Haryana) 126102',
    storeName: settings?.store_name || 'SuperSweets',
  };

  return (
    <footer className="bg-[#CB9730] text-white mt-16">
      <div className="container mx-auto px-6 py-14">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="SuperSweets Logo" className="w-10 h-10 object-contain" />
              <h3 className="text-2xl font-bold text-[#3A2E21]">
                {contactInfo.storeName}
              </h3>
            </div>

            <p className="text-white/90 leading-relaxed">
              Authentic sweets made fresh daily using age-old recipes & premium ingredients.
            </p>

            <div className="flex space-x-4 pt-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Icon
                  key={i}
                  className="h-5 w-5 text-white/90 hover:text-[#3A2E21] cursor-pointer transition-colors"
                />
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#3A2E21]">Quick Links</h4>

            <div className="space-y-2 text-white/90">
              <Link to="/" className="block hover:text-[#3A2E21]">Home</Link>
              <Link to="/products" className="block hover:text-[#3A2E21]">All Sweets</Link>
              <Link to="/about" className="block hover:text-[#3A2E21]">About Us</Link>
              <Link to="/contact" className="block hover:text-[#3A2E21]">Contact Us</Link>
              <Link to="/cart" className="block hover:text-[#3A2E21]">Shopping Cart</Link>
            </div>
          </div>

          {/* ACCOUNT & SERVICES */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#3A2E21]">Account & Services</h4>

            <div className="space-y-2 text-white/90">
              <Link to="/profile" className="block hover:text-[#3A2E21]">My Account</Link>
              <Link to="/auth" className="block hover:text-[#3A2E21]">Login / Register</Link>
              <Link to="/checkout" className="block hover:text-[#3A2E21]">Checkout</Link>
              <Link to="/products?filter=bestsellers" className="block hover:text-[#3A2E21]">
                Bestsellers
              </Link>
              <Link to="/products?filter=new_arrivals" className="block hover:text-[#3A2E21]">
                New Arrivals
              </Link>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#3A2E21]">Sweet Categories</h4>

            <div className="space-y-2 text-white/90">
              <Link to="/products" className="block hover:text-[#3A2E21]">Traditional Sweets</Link>
              <Link to="/products" className="block hover:text-[#3A2E21]">Dry Fruit Sweets</Link>
              <Link to="/products" className="block hover:text-[#3A2E21]">Fusion Desserts</Link>
              <Link to="/products" className="block hover:text-[#3A2E21]">Gift Hampers</Link>
              <Link to="/products" className="block hover:text-[#3A2E21]">Vegan Options</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#3A2E21]">Contact Us</h4>

            <div className="space-y-4 text-white/90">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#3A2E21]" />
                <span>{contactInfo.phone}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#3A2E21]" />
                <span>{contactInfo.email}</span>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#3A2E21] mt-1" />
                <span className="whitespace-pre-line">{contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/30">
          <MarqueeAnimation
            direction="left"
            baseVelocity={-1.2}
            className="text-white/90 py-3 text-sm"
          >
            Freshly Made • Premium Ingredients • PAN-India Delivery • 48+ Years of Legacy
          </MarqueeAnimation>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <p className="text-white/90 text-sm">
              © 2025 {contactInfo.storeName}. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6 mt-4 md:mt-0 items-center text-white/90">
              <Link to="/about" className="hover:text-[#3A2E21] text-sm">About Us</Link>
              <Link to="/contact" className="hover:text-[#3A2E21] text-sm">Contact</Link>
              <Link to="/products" className="hover:text-[#3A2E21] text-sm">Sweets</Link>
              <Link to="/auth" className="hover:text-[#3A2E21] text-sm">Login</Link>

              {/* QR Code */}
              <QRCodeComponent />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

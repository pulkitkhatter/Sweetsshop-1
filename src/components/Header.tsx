// PREMIUM LUXURY HEADER – PASTEL PINK + GOLD THEME

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Menu,
  Search,
  LogOut,
  X,
  Home,
  Package,
  Info,
  Phone,
} from 'lucide-react';

import logoImage from '../assets/logo2.png';

import { useStore } from '../store/useStore';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/hooks/useSettings';

import { motion, AnimatePresence } from 'framer-motion';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SearchSidebar from './SearchSidebar';

interface HeaderProps {
  isAdminRoute?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdminRoute = false }) => {
  if (isAdminRoute) return null;

  const { settings } = useSettings();
  const { cartItems, toggleCart } = useStore();
  const { user, isAdmin, signOut, profile } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <motion.header
      className="sticky top-0 z-50 shadow-sm"
      style={{ backgroundColor: '#E3CBC6' }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {/* TOP MARQUEE */}
      {settings?.store_phone && (
        <div className="bg-[#000000] text-white py-1.5 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-sm font-semibold opacity-90">
            {Array(6).fill(null).map((_, i) => (
              <span key={i} className="mx-6 tracking-wide">
                ✦ PAN India Delivery • International Shipping Available • Order Now: {settings.store_phone} ✦
              </span>
            ))}
          </div>
        </div>
      )}

      {/* DESKTOP HEADER */}
      <div className="container mx-auto md:flex hidden items-center justify-between h-24">
        
        {/* LOGO + TEXT */}
        <Link to="/" className="flex items-center space-x-4">
          <motion.img
            src={logoImage}
            alt="Super Sweets"
            className="h-[96px] w-auto object-contain drop-shadow-xl"
            whileHover={{ scale: 1.05 }}
          />

          <div className="flex flex-col justify-center -mt-1">
            <h1
              className="text-[46px] leading-[1] font-bold"
              style={{
                color: '#BCA05E',
                fontFamily: `'Playfair Display', serif`,
                letterSpacing: '-0.5px',
              }}
            >
              Super Sweets
            </h1>

            <p
              className="text-[14px] leading-[1.1]"
              style={{
                color: '#BCA05E',
                fontFamily: `'Playfair Display', serif`,
                fontStyle: 'italic',
                letterSpacing: '0.4px',
              }}
            >
              The Gajar Pak Atelier
            </p>
          </div>
        </Link>

        {/* NAVBAR LINKS */}
        <nav className="flex items-center space-x-10 text-lg">
          {[
            { label: 'Home', to: '/' },
            { label: 'Sweets', to: '/products' },
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="transition"
              style={{
                color: '#000',
                fontFamily: `'Playfair Display', serif`,
                fontWeight: 500,
                letterSpacing: '0.3px',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center space-x-4">

          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg hover:bg-white/80 transition"
          >
            <Search className="w-6 h-6" style={{ color: '#BC8649' }} />
          </button>

          <button
            onClick={toggleCart}
            className="relative p-2 rounded-lg hover:bg-white/80 transition"
          >
            <ShoppingCart className="w-6 h-6" style={{ color: '#BC8649' }} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#BC8649] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </button>

          {/* USER DROPDOWN */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-11 h-11 rounded-full bg-[#BC8649] flex items-center justify-center text-white font-medium cursor-pointer"
                     style={{ fontFamily: `'Playfair Display', serif` }}>
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 bg-white" sideOffset={8}>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>

                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <User className="mr-2 h-4 w-4" /> Admin Panel
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="p-2 rounded-lg hover:bg-white/80 transition"
            >
              <User className="w-6 h-6" style={{ color: '#BC8649' }} />
            </button>
          )}
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between h-14 px-3 border-b border-[#BC8649]/40 bg-[#FFDCDB]">

        <button
          onClick={toggleMobileMenu}
          className="p-1.5 rounded-md hover:bg-white/60 transition"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* MOBILE LOGO ONLY */}
        <div className="flex-1 flex justify-center">
          <motion.img
            src={logoImage}
            alt="Super Sweets"
            className="h-[68px] w-auto object-contain"
            whileHover={{ scale: 1.03 }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 rounded-md hover:bg-white/60 transition"
          >
            <Search className="w-5 h-5" style={{ color: '#BC8649' }} />
          </button>

          <button
            onClick={toggleCart}
            className="relative p-1.5 rounded-md hover:bg-white/60 transition"
          >
            <ShoppingCart className="w-5 h-5" style={{ color: '#BC8649' }} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#BC8649] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-[40]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-[#FFDCDB] rounded-t-3xl shadow-xl z-[50] p-6 border-t border-[#BC8649]/30"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            >
              <h2
                className="text-xl font-semibold mb-4 tracking-wide"
                style={{
                  color: '#BC8649',
                  fontFamily: `'Playfair Display', serif`,
                  letterSpacing: '0.6px',
                }}
              >
                Menu
              </h2>

              <nav className="space-y-3 mb-4">
                {[
                  { to: '/', label: 'Home', icon: Home },
                  { to: '/products', label: 'Sweets', icon: Package },
                  { to: '/about', label: 'About', icon: Info },
                  { to: '/contact', label: 'Contact', icon: Phone },
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleNavigation(item.to)}
                    className="flex items-center space-x-3 w-full p-3 rounded-lg bg-white hover:bg-[#FFE4E2] transition"
                    whileTap={{ scale: 0.96 }}
                    style={{ fontFamily: `'Playfair Display', serif` }}
                  >
                    <item.icon className="w-5 h-5 text-[#BC8649]" />
                    <span className="font-medium text-black">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* USER SECTION */}
              {user ? (
                <div className="pt-3 border-t border-[#BC8649]/30">
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg mb-3">
                    <div
                      className="w-10 h-10 bg-[#BC8649] rounded-full flex items-center justify-center text-white font-medium"
                      style={{ fontFamily: `'Playfair Display', serif` }}
                    >
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{profile?.full_name || 'User'}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="flex items-center w-full space-x-3 p-3 rounded-lg hover:bg-[#FFE4E2]"
                    style={{ fontFamily: `'Playfair Display', serif` }}
                  >
                    <User className="w-5 h-5 text-[#BC8649]" />
                    <span className="font-medium">My Profile</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => handleNavigation('/admin')}
                      className="flex items-center w-full space-x-3 p-3 rounded-lg hover:bg-[#FFE4E2]"
                      style={{ fontFamily: `'Playfair Display', serif` }}
                    >
                      <User className="w-5 h-5 text-[#BC8649]" />
                      <span className="font-medium">Admin Panel</span>
                    </button>
                  )}

                  <button
                    onClick={signOut}
                    className="flex items-center w-full space-x-3 p-3 rounded-lg mt-2 text-red-600 hover:bg-red-100"
                    style={{ fontFamily: `'Playfair Display', serif` }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation('/auth')}
                  className="mt-3 w-full p-3 bg-[#BC8649] text-white rounded-lg hover:bg-[#a97540] transition"
                  style={{
                    fontFamily: `'Playfair Display', serif`,
                    fontWeight: 600,
                    letterSpacing: '0.4px',
                  }}
                >
                  Sign In / Register
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH SIDEBAR */}
      <SearchSidebar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  );
};

export default Header;

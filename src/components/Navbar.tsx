import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND_NAME, NAV_LINKS, NAV_CTA } from "../data/mockData";

interface NavbarProps {
  readonly className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? "bg-editorial-dark/95 backdrop-blur-md border-white/5" : "bg-transparent border-transparent"
      } ${className}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 0.6, bounce: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center" aria-label={BRAND_NAME}>
          <img src="/logo.png" alt={BRAND_NAME} className="h-12 w-auto object-contain" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-6">
          <motion.a
            href={NAV_CTA.href}
            className="relative px-6 py-2 border border-primary text-primary text-xs font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:bg-primary hover:text-editorial-dark"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {NAV_CTA.label}
          </motion.a>

          <button className="md:hidden text-white" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
            <span className="material-icons">{isMobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu — with AnimatePresence for proper exit */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="md:hidden bg-editorial-dark/98 backdrop-blur-lg border-t border-white/5 px-6 py-8"
            initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.35, bounce: 0 }}
          >
            <div className="flex flex-col space-y-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg uppercase tracking-widest text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

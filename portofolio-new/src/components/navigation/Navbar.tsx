import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [timeStr, setTimeStr] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Jakarta timezone
      const timeInID = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTimeStr(`${timeInID} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'INDEX', href: '#hero', id: 'hero' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'EXPERTISE', href: '#capabilities', id: 'capabilities' },
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'APPROACH', href: '#approach', id: 'approach' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F1ECE3]/90 backdrop-blur-md border-b border-[#1D1C19]/15 shadow-sm py-3.5'
          : 'bg-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Monogram & Identity */}
        <a
          href="#hero"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A65338]"
        >
          <div className="w-8 h-8 bg-[#1D1C19] text-[#F1ECE3] flex items-center justify-center font-display font-bold text-sm tracking-tighter border border-[#1D1C19] group-hover:bg-[#A65338] transition-colors">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#1D1C19]">
              MELLINO
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#755644]">
              DIGITAL CRAFT
            </span>
          </div>
        </a>

        {/* Live Jakarta Time & Availability (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#755644] border-x border-[#1D1C19]/15 px-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="uppercase text-[11px] tracking-wider text-[#1D1C19]">MALANG, ID</span>
            <span className="text-[#A65338] font-bold">{timeStr || '18:24:00 WIB'}</span>
          </div>
          <span className="text-[#1D1C19]/20">/</span>
          <div className="text-[11px] uppercase tracking-wider text-[#74705E]">
            OPEN FOR SELECT COMMISSIONS
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3 py-1.5 font-display text-xs tracking-wider transition-colors uppercase ${
                  isActive
                    ? 'text-[#A65338] font-bold'
                    : 'text-[#1D1C19] hover:text-[#A65338]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#A65338]" />
                )}
              </a>
            );
          })}
          <a
            href="#contact"
            className="ml-3 px-3.5 py-1.5 bg-[#1D1C19] text-[#F1ECE3] hover:bg-[#A65338] transition-colors font-display text-xs font-bold uppercase tracking-wider"
          >
            INITIATE
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#1D1C19] border border-[#1D1C19]/20 hover:border-[#1D1C19] focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F1ECE3] border-b border-[#1D1C19]/20 px-6 py-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1D1C19]/15 font-mono text-xs text-[#755644]">
            <span>MALANG // {timeStr}</span>
            <span className="text-emerald-700 font-bold">AVAILABLE</span>
          </div>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 font-display text-sm tracking-wider uppercase text-[#1D1C19] hover:text-[#A65338] flex items-center justify-between border-b border-[#1D1C19]/5"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#755644]">[0{navLinks.indexOf(link) + 1}]</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};


import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent vs Glassmorphic
      setScrolled(currentScrollY > 50);

      // Hide/Show based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true); // Scrolling down past threshold -> hide
      } else {
        setHidden(false); // Scrolling up -> show
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm border-white/20' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${scrolled ? 'bg-[#6db33f] text-white' : 'bg-premium-black text-white'}`}>
            <span className="font-bold text-sm">LV</span>
          </div>
          <span className={`text-xl font-black tracking-tight transition-colors duration-500 ${scrolled ? 'text-gray-900' : 'text-premium-black'}`}>
            Liquid Vitality.
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Products', 'Wellness', 'Reviews'].map((link) => (
            <a 
              key={link} 
              href="#" 
              className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 relative group overflow-hidden ${
                scrolled ? 'text-gray-600 hover:text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              {link}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6db33f] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center justify-center bg-premium-black text-white hover:bg-[#6db33f] hover:text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md">
            Shop Now
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={`block w-6 h-[2px] transition-colors duration-300 ${scrolled ? 'bg-black' : 'bg-premium-black'}`}></span>
            <span className={`block w-4 h-[2px] transition-colors duration-300 ${scrolled ? 'bg-black' : 'bg-premium-black'}`}></span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

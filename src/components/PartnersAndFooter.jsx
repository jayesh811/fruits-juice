import React from 'react';

const PartnersAndFooter = () => {
  return (
    <div className="w-full relative mt-10">
      
      {/* Logos Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 text-center border-b border-white/30">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 mb-10">
          We are available on
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-2xl md:text-3xl font-black italic tracking-tighter">Flipkart</span>
          <span className="text-2xl md:text-3xl font-bold tracking-tight">amazon</span>
          <span className="text-xl md:text-2xl font-black text-blue-800 uppercase">Walmart ★</span>
          <span className="text-2xl md:text-3xl font-bold text-red-500 tracking-tighter">ebay</span>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="w-full bg-[#cbd5c0]/40 backdrop-blur-sm py-20 px-6 border-t border-white/50">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
            Subscribe to our newsletter
          </h3>
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="flex flex-col md:flex-row items-center justify-center gap-4 w-full"
          >
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              required
              className="flex-1 w-full max-w-md bg-white border border-white/60 rounded-full py-4 px-6 outline-none focus:ring-2 focus:ring-[#6db33f] shadow-inner text-sm placeholder-gray-400"
            />
            <button 
              type="submit" 
              className="w-full md:w-auto bg-[#5a8a3a] hover:bg-[#4a7230] text-white font-bold text-sm tracking-wider uppercase py-4 px-10 rounded-full transition-colors shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Simple Footer Links */}
      <div className="w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-gray-500 bg-[#cbd5c0]/60">
        <span>Liquid Vitality @copyright 2026</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-black transition-colors">Home</a>
          <a href="#" className="hover:text-black transition-colors">About Us</a>
          <a href="#" className="hover:text-black transition-colors">Blog</a>
          <a href="#" className="hover:text-black transition-colors">Contact</a>
        </div>
      </div>

    </div>
  );
};

export default PartnersAndFooter;

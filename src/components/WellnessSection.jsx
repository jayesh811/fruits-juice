import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WellnessProducts from './WellnessProducts';
import InteractiveHub from './InteractiveHub';
import Testimonials from './Testimonials';
import PartnersAndFooter from './PartnersAndFooter';

const WellnessSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for the background blur blobs
  const yPink = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const yBlue = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const yIndigo = useTransform(scrollYProgress, [0, 1], [-150, 100]);

  return (
    // Main Wrapper providing the soft pastel gradient look
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-[#eaffea] via-[#f0fbf0] to-[#eaffea] overflow-hidden">
      
      {/* Soft Ambient Background Glows */}
      <motion.div style={{ y: yPink }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-100/50 rounded-full blur-[100px] opacity-70 pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <motion.div style={{ y: yBlue }} className="absolute bottom-[20%] left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-x-1/4" />
      <motion.div style={{ y: yIndigo }} className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      {/* Render the individual sections */}
      <div className="relative z-10">
        <WellnessProducts />
        <InteractiveHub />
        <Testimonials />
        <PartnersAndFooter />
      </div>

    </section>
  );
};

export default WellnessSection;

import React from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import FrameScroll from './components/FrameScroll';
import FrameScroll2 from './components/FrameScroll2';
import LiquidCarousel from './components/LiquidCarousel';
import WellnessSection from './components/WellnessSection';
import './App.css';

function App() {
  return (
    <ReactLenis root>
      <main className="w-full bg-white">
        {/* Premium fixed site navigation */}
        <Navbar />

        {/* Hero Section with Scroll-Driven Frame Animation */}
        <FrameScroll />

        {/* Cinematic Liquid Flow Carousel */}
        <LiquidCarousel />

        {/* Second Scroll-Driven Animation Section */}
        <FrameScroll2 />
        
        {/* Wellness Landing Page Hub */}
        <WellnessSection />
        
      </main>
    </ReactLenis>
  );
}

export default App;

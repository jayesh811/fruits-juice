import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFrameLoader } from '../hooks/useFrameLoader';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;
const FRAME_PATH = '/image-2';

const FrameScroll2 = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  
  const { frames, isLoading, progress } = useFrameLoader(FRAME_PATH, TOTAL_FRAMES);

  // Function to draw a specific frame on the canvas
  const drawFrame = (index) => {
    if (!canvasRef.current || !frames[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = frames[index];

    // Responsive Canvas Resizing & Centered Object-Fit: Cover logic
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useEffect(() => {
    // Handle Window Resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(currentFrame);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [frames, currentFrame]);

  useEffect(() => {
    if (isLoading || frames.length === 0) return;

    // Initial draw
    drawFrame(0);

    // GSAP ScrollTrigger logic
    const scrollAnimation = gsap.to({}, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // 4 screens worth of scroll
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * TOTAL_FRAMES)
          );
          setCurrentFrame(frameIndex);
          drawFrame(frameIndex);
        }
      }
    });

    // Text Overlay Animations
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, duration: 1.5, ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'top top',
          scrub: true
        }
      }
    );

    return () => {
      scrollAnimation.kill();
    };
  }, [isLoading, frames]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="text-2xl font-light tracking-widest uppercase text-premium-black mb-4">
          Preparing Visuals
        </div>
        <div className="w-64 h-[2px] bg-gray-100 relative overflow-hidden">
          <div 
            className="h-full bg-premium-black transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs font-medium text-gray-400">
          {progress}%
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-white overflow-hidden">
      {/* Canvas for High-Performance Rendering */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full will-change-transform"
      />

      {/* Premium UI Overlay */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity duration-500 ${currentFrame >= 61 ? 'opacity-0' : 'opacity-100'}`}>
        <div ref={textRef} className="text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 text-shadow-premium">
            The Craft.
          </h1>
          <p className="text-lg md:text-xl font-light text-white max-w-lg mx-auto leading-relaxed">
            Every bottle is a masterpiece, crafted with passion and precision.
          </p>
        </div>
      </div>

    </section>
  );
};

export default FrameScroll2;

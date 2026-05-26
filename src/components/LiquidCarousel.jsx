import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

// Assets Mapping
import cherryImg from '../assets/juices/cherry.png';
import blueberryImg from '../assets/juices/blueberry.png';
import strawberryImg from '../assets/juices/strawberry.png';
import grapeImg from '../assets/juices/grape.png';
import orangeImg from '../assets/juices/orange.png';

const JUICE_DATA = [
  { id: 1, name: 'Wild Cherry', volume: '250 ml', price: '4.99', desc: 'Sourced from premium orchards, our cherry juice offers a perfect balance of tartness and natural sweetness.', image: cherryImg, color: '#ef4444' },
  { id: 2, name: 'Blueberry Blast', volume: '250 ml', price: '3.99', desc: 'Packed with antioxidants, this vibrant blueberry juice is as healthy as it is delicious.', image: blueberryImg, color: '#2563eb' },
  { id: 3, name: 'Pure Strawberry', volume: '250 ml', price: '5.99', desc: 'Experience the essence of summer with our pure, cold-pressed strawberry juice.', image: strawberryImg, color: '#ec4899' },
  { id: 4, name: 'Green Grape', volume: '250 ml', price: '4.49', desc: 'Crisp and refreshing, made from hand-picked green grapes for an energizing taste.', image: grapeImg, color: '#22c55e' },
  { id: 5, name: 'Golden Orange', volume: '250 ml', price: '3.49', desc: 'Freshly squeezed oranges providing a daily dose of Vitamin C in every sip.', image: orangeImg, color: '#f97316' },
];

const LiquidCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const splashPathRef = useRef(null);
  const autoPlayRef = useRef();

  const addToCart = (juice) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === juice.id);
      if (existing) {
        return prev.map((item) => item.id === juice.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...juice, quantity: 1 }];
    });
    setPaymentComplete(false);
    setShowPayment(true);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0).toFixed(2);

  const handlePayment = () => {
    setPaymentComplete(true);
  };

  const closePayment = () => {
    setShowPayment(false);
    setPaymentComplete(false);
  };

  // SVG Morphing Paths
  const paths = {
    initial: "M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z",
    splash: "M 0 100 Q 50 20 100 100 L 100 100 Q 50 100 0 100 Z",
    full: "M 0 100 Q 50 -50 100 100 L 100 0 Q 50 0 0 0 Z",
    reveal: "M 0 0 Q 50 80 100 0 L 100 0 Q 50 0 0 0 Z",
  };

  const triggerTransition = useCallback((nextIndex) => {
    if (isAnimating || nextIndex === activeIndex) return;
    setIsAnimating(true);
    
    const nextColor = JUICE_DATA[nextIndex].color;
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // The Liquid "Splash" Sequence
    tl.to(splashPathRef.current, {
      duration: 0.5,
      attr: { d: paths.splash },
      fill: nextColor,
      ease: "power2.in",
    })
    .to(splashPathRef.current, {
      duration: 0.4,
      attr: { d: paths.full },
      ease: "power4.out",
      onStart: () => setActiveIndex(nextIndex)
    })
    .to(splashPathRef.current, {
      duration: 0.8,
      attr: { d: paths.reveal },
      ease: "power4.inOut",
      delay: 0.1
    })
    .set(splashPathRef.current, { attr: { d: paths.initial }, fill: 'transparent' });
  }, [activeIndex, isAnimating]);

  // Autoplay Logic
  useEffect(() => {
    if (!isHovered && !isAnimating) {
      autoPlayRef.current = setInterval(() => {
        triggerTransition((activeIndex + 1) % JUICE_DATA.length);
      }, 3000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [activeIndex, isHovered, isAnimating, triggerTransition]);

  const handlePrev = () => triggerTransition((activeIndex - 1 + JUICE_DATA.length) % JUICE_DATA.length);
  const handleNext = () => triggerTransition((activeIndex + 1) % JUICE_DATA.length);

  return (
    <main className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f8f8f8]">
      
      {/* Dynamic Background Glow */}
      <div 
        className="absolute inset-0 opacity-20 transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at center, ${JUICE_DATA[activeIndex].color}, transparent 70%)` }}
      />

      {/* GSAP Liquid Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path ref={splashPathRef} d={paths.initial} fill="transparent" />
      </svg>

      {totalItems > 0 && (
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={() => setShowPayment(true)}
            className="rounded-full border border-white bg-black/80 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-xl transition hover:bg-black"
          >
            Cart • {totalItems} item{totalItems > 1 ? 's' : ''} • ${totalPrice}
          </button>
        </div>
      )}

      <div 
        className="relative z-10 w-full max-w-7xl px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex items-center justify-center h-[500px] mt-[40px]">
          {JUICE_DATA.map((juice, index) => {
            const isCenter = index === activeIndex;
            const isLeft = index === (activeIndex - 1 + JUICE_DATA.length) % JUICE_DATA.length;
            const isRight = index === (activeIndex + 1) % JUICE_DATA.length;
            
            if (!isCenter && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={juice.id}
                initial={false}
                onClick={() => {
                  if (!isCenter) triggerTransition(index);
                }}
                animate={{
                  x: isCenter ? 0 : isLeft ? -280 : 280,
                  scale: isCenter ? 0.9 : 0.7,
                  opacity: isCenter ? 1 : 0.35,
                  filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                  zIndex: isCenter ? 40 : 20
                }}
                whileHover={!isCenter ? { opacity: 0.6, scale: 0.75 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 1.1 }}
                className={`absolute w-[280px] md:w-[320px] ${!isCenter ? 'cursor-pointer' : ''}`}
              >
                {/* Product Card Container */}
                <div className={`relative p-8 rounded-[3rem] transition-all duration-700 ${isCenter ? 'bg-white shadow-2xl' : ''}`}>
                  
                  {/* Floating Juice Bottle */}
                  <div className={`relative z-50 flex justify-center mb-4 transition-transform duration-500 ${isCenter ? 'hover:scale-110' : ''}`}>
                    <motion.img 
                      animate={isCenter ? { y: [0, -10, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      src={juice.image} 
                      alt={juice.name}
                      className="h-[260px] object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className={`text-2xl font-black mb-1 transition-colors duration-500 ${isCenter ? 'text-gray-900' : 'text-gray-400'}`}>
                      {juice.name}
                    </h3>

                    <div className="relative h-24 flex items-center justify-center overflow-hidden">
                      <AnimatePresence mode="wait">
                        {isHovered && isCenter ? (
                          <motion.p
                            key="desc"
                            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                            className="text-gray-500 text-sm leading-relaxed max-w-[280px]"
                          >
                            {juice.desc}
                          </motion.p>
                        ) : (
                          <motion.div
                            key="price"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col"
                          >
                            <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">1 x {juice.volume}</span>
                            <span className="text-2xl font-black text-gray-800">${juice.price}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button 
                      onClick={() => isCenter && addToCart(juice)}
                      style={{ backgroundColor: isCenter ? juice.color : '#ccc' }}
                      className="mt-4 px-8 py-3 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center mt-12 gap-6">
          <div className="flex items-center gap-12">
            <button onClick={handlePrev} className="text-gray-300 hover:text-black transition-colors text-2xl font-light">←</button>
            <div className="flex gap-3">
              {JUICE_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => triggerTransition(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-10' : 'w-2 bg-gray-200'}`}
                  style={{ backgroundColor: i === activeIndex ? JUICE_DATA[i].color : '' }}
                />
              ))}
            </div>
            <button onClick={handleNext} className="text-gray-300 hover:text-black transition-colors text-2xl font-light">→</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Payment Window</p>
                  <h2 className="mt-2 text-2xl font-black text-gray-900">Your Cart</h2>
                </div>
                <button
                  onClick={closePayment}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  Close
                </button>
              </div>

              {paymentComplete ? (
                <div className="mt-6 rounded-[2rem] bg-green-50 p-6 text-center">
                  <p className="text-sm uppercase tracking-widest text-green-700">Payment confirmed</p>
                  <h3 className="mt-3 text-xl font-black text-green-900">Thank you for your order!</h3>
                  <p className="mt-2 text-sm text-green-700">Your juices are now on the way. Continue shopping or close this window.</p>
                </div>
              ) : (
                <div className="mt-6 rounded-[2rem] border border-gray-100 bg-gray-50 p-6">
                  {cartItems.length === 0 ? (
                    <p className="text-sm text-gray-600">Your cart is empty. Add an item to start checkout.</p>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl bg-white p-4 shadow-sm">
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">{item.quantity} × {item.volume}</p>
                          </div>
                          <p className="text-sm font-black text-gray-900">${(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
                    <span className="text-sm font-semibold text-gray-600">Total</span>
                    <span className="text-xl font-black text-gray-900">${totalPrice}</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                {!paymentComplete && (
                  <button
                    onClick={handlePayment}
                    className="rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:brightness-110"
                  >
                    Pay Now ${totalPrice}
                  </button>
                )}
                <button
                  onClick={closePayment}
                  className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-gray-700 transition hover:bg-gray-100"
                >
                  {paymentComplete ? 'Done' : 'Continue Shopping'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        body { background-color: #f8f8f8; }
        .drop-shadow-juice {
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15));
        }
      `}</style>
    </main>
  );
};

export default LiquidCarousel;
import React from 'react';
import grapeImg from '../assets/juices/grape.png';
import strawberryImg from '../assets/juices/strawberry.png';
import blueberryImg from '../assets/juices/blueberry.png';
import orangeImg from '../assets/juices/orange.png'; // Will use as chocolate or orange

const COLLECTIONS = [
  { id: 1, title: 'Green Smoothies', subtitle: 'Rich in fiber\nLow GI', image: grapeImg, bgColor: 'bg-green-100/60', iconColor: 'text-green-600' },
  { id: 2, title: 'Fruit Smoothies', subtitle: 'Rich in heart\nLow GI', image: strawberryImg, bgColor: 'bg-red-100/60', iconColor: 'text-red-600' },
  { id: 3, title: 'Fresh Juices', subtitle: 'Rich in fiber\nDaily fit', image: blueberryImg, bgColor: 'bg-blue-100/60', iconColor: 'text-blue-600' },
  { id: 4, title: 'Citrus Boost', subtitle: 'Rich in heart\nLow GI', image: orangeImg, bgColor: 'bg-orange-100/60', iconColor: 'text-orange-600' },
];

const INGREDIENTS = [
  { id: 1, title: 'Nourishing with essential vitamins and minerals', emoji: '🍓' },
  { id: 2, title: 'Lower risk of chronic diseases', emoji: '🥝' },
  { id: 3, title: 'Great way to curb sugar cravings', emoji: '🍏' },
  { id: 4, title: 'Boost cardiovascular health', emoji: '🍇' },
  { id: 5, title: 'Curb Sleep Disorders', emoji: '🥥' },
];

const InteractiveHub = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-6">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shadow-sm border border-white">
              <img src="https://i.pravatar.cc/100?img=47" alt="User" className="w-full h-full object-cover" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Interactive Wellness Hub</h2>
          </div>
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-gray-500 mt-2">
            Know your blend, know your wellness.
          </p>
        </div>
        
        {/* Decorative Badge */}
        <div className="bg-gradient-to-r from-indigo-300 to-purple-400 rounded-2xl p-4 flex items-center gap-4 text-white shadow-lg rotate-2 hover:rotate-0 transition-all cursor-pointer">
          <div className="text-sm font-bold opacity-80 uppercase tracking-widest">Choose Your Flavor</div>
          <div className="text-2xl font-black italic">Smoothie Shop</div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center py-4 gap-6 bg-white/40 backdrop-blur-md rounded-full border border-white max-h-[400px] shadow-sm">
          <button className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">⌂</button>
          <button className="w-10 h-10 rounded-full text-gray-400 hover:text-indigo-500 transition-colors">🔥</button>
          <button className="w-10 h-10 rounded-full text-gray-400 hover:text-indigo-500 transition-colors">🥤</button>
          <button className="w-10 h-10 rounded-full text-gray-400 hover:text-indigo-500 transition-colors">🌸</button>
          <div className="flex-1" />
          <button className="w-10 h-10 rounded-full text-gray-400 hover:text-red-500 transition-colors mb-4">⏻</button>
        </div>

        {/* Left Side: Browse Collections */}
        <div className="lg:col-span-7 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-800">Browse Collections</h3>
            <button className="text-xs font-bold text-gray-500 hover:text-indigo-500 uppercase tracking-wider">View All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {COLLECTIONS.map((item) => (
              <div 
                key={item.id} 
                className={`${item.bgColor} rounded-3xl p-6 flex border border-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group`}
              >
                <div className="w-20 h-24 relative flex-shrink-0">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-contain -ml-4 mt-2 drop-shadow-md group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col justify-center ml-2">
                  <h4 className="font-bold text-gray-800 text-lg leading-tight mb-2">{item.title}</h4>
                  <ul className="text-xs text-gray-600 font-medium space-y-1 opacity-70">
                    {item.subtitle.split('\n').map((line, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className={item.iconColor}>✓</span> {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Top Ingredients */}
        <div className="lg:col-span-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-800">Top Ingredients</h3>
            <button className="text-xs font-bold text-gray-500 hover:text-indigo-500 uppercase tracking-wider">View All</button>
          </div>

          <div className="flex flex-col gap-5">
            {INGREDIENTS.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <p className="flex-1 text-sm font-semibold text-gray-700 leading-tight pr-4">
                  {item.title}
                </p>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InteractiveHub;

import React from 'react';

export const FloatingContact: React.FC = () => {
  return (
    <a
      href="https://t.me/Naratkh168"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] flex group items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#2AABEE] to-[#229ED9] text-white shadow-[0_0_20px_rgba(42,171,238,0.5)] hover:shadow-[0_0_35px_rgba(42,171,238,0.8)] hover:scale-110 transition-all duration-300"
      aria-label="Contact us on Telegram"
    >
      {/* Telegram Icon */}
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="ml-[-2px] mt-[1px] md:w-8 md:h-8" 
      >
        <path 
          d="M21.707 2.292a1 1 0 00-1.055-.062L2.652 10.686a1 1 0 00-.03 1.767l5.968 3.12 2.21 6.804a1 1 0 001.764.298l2.978-3.177 4.965 3.513a1 1 0 001.565-.774L23.95 3.398a1 1 0 00-.243-1.106zM8.337 12.185l11.488-7.14-9.337 8.356-.632-1.996.002.001zm3.879 7.787l-.95-2.924 1.838-1.645L12.216 19.972z" 
          fill="currentColor"
        />
      </svg>
      
      {/* Glow Effect Layer */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      {/* Pulse Ring */}
      <span className="absolute -inset-1 rounded-full border border-[#2AABEE]/40 animate-ping opacity-75 duration-[3s]"></span>
    </a>
  );
};
import React from 'react';

interface IPhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {/* iPhone Frame - Responsive sizes */}
      <div className="relative mx-auto w-[120px] h-[250px] sm:w-[150px] sm:h-[320px] md:w-[180px] md:h-[380px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-[2px] sm:p-[3px] shadow-xl">
        {/* Inner bezel */}
        <div className="relative w-full h-full bg-black rounded-[1.3rem] sm:rounded-[1.8rem] md:rounded-[2.3rem] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-20 h-4 sm:h-5 md:h-6 bg-black rounded-full z-20" />
          
          {/* Screen */}
          <div className="absolute inset-[2px] rounded-[1.2rem] sm:rounded-[1.7rem] md:rounded-[2.2rem] overflow-hidden bg-white">
            <img 
              src={src} 
              alt={alt}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
      
      {/* Side buttons - Hidden on very small screens */}
      <div className="hidden sm:block absolute top-16 md:top-24 -left-[2px] w-[2px] md:w-[3px] h-6 md:h-8 bg-gray-700 rounded-l-sm" />
      <div className="hidden sm:block absolute top-24 md:top-36 -left-[2px] w-[2px] md:w-[3px] h-8 md:h-12 bg-gray-700 rounded-l-sm" />
      <div className="hidden sm:block absolute top-36 md:top-52 -left-[2px] w-[2px] md:w-[3px] h-8 md:h-12 bg-gray-700 rounded-l-sm" />
      <div className="hidden sm:block absolute top-20 md:top-32 -right-[2px] w-[2px] md:w-[3px] h-10 md:h-16 bg-gray-700 rounded-r-sm" />
    </div>
  );
};

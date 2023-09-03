import Image from 'next/image';
import cranexd from '../../public/assets/cranexd-img.png';
import herobanner from '../../public/assets/hero_banner2.png';
import cb500 from '../../public/assets/cb500.png';
import digora from '../../public/assets/digora.png';
import digora2 from '../../public/assets/digora2.png';
import React from 'react';

function Hero() {
  return (
    <div className="relative bg-2D3E50 pt-20 py-20 px-6 h-[500px]"> {/* Added pt-20 here */}
      <div className="absolute  top-0 left-0 w-full h-full bg-black z-0">
        <Image  src={herobanner} alt="Dental04  Cranex-D Digital Cephalometric and Panoramic X-ray" layout="fill" objectFit="cover" />
      </div>
      <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center pt-20">
        <div className="md:w-1/2 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Dental04
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Explore our premium selection of used dental x-ray units and transform your practice today.
          </p>
          <button className="bg-btncolor txtcolor font-semibold py-2 px-6 rounded-md">
            Shop Now
          </button>
        </div>
        // images
                
        <div className="md:w-1/2 mt-8 md:mt-0 h-[150px] w-[150px] z-10">
          
        </div>
        
      </div>
    </div>
  );
}

export default Hero;

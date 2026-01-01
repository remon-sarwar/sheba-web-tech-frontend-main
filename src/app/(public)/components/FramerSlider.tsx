'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ClientCard from './ClientCard';

export interface FramerSliderProps {
  slides: Array<SlideItem>;
}

export interface SlideItem {
  imageURL: string;
  siteURL?: string;
  title?: string;
}

const FramerSlider: React.FC<FramerSliderProps> = ({ slides }) => {
  return (
    <div className='relative w-full overflow-hidden mb-32'>
      <motion.div
        className='flex'
        animate={{
          x: ['0%', '-100%'],
          transition: {
            ease: 'linear',
            duration: 25,
            repeat: Infinity
          }
        }}
      >
        {[...slides, ...slides].map((slide, index) => (
          <div
            key={index}
            className='flex-shrink-0 mx-4 lg:mx-0'
            style={{ width: `${100 / slides.length}%` }}
          >
            <div className='flex flex-col items-center justify-center h-full text-6xl'>
              {slide.siteURL ? (
                <ClientCard
                  key={index}
                  siteURL={slide.siteURL}
                  imageURL={slide.imageURL}
                  alt=''
                />
              ) : (
                <div className='flex flex-col items-center'>
                  <img
                    src={slide?.imageURL}
                    key={index}
                    className='h-8 lg:h-10 w-auto object-contain lg:object-cover'
                  />
                  <span className='text-sm py-2'>{slide.title}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FramerSlider;

import React from 'react';

import heroImage from '../../../../public/images/pexels-brett-sayles-4508751.jpg';
import Link from 'next/link';
import ParticlesBG from './ParticlesBG';

const HeroImage = () => {
  return (
    <section className='h-[450px] relative'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-4xl text-white z-10 text-center'>
          Your Trusted Partner in Innovative Digital Solution
        </h1>

        <div className='flex justify-center my-4'>
          <Link href={'/shared-hosting'}>
            <button className='bg-white text-primary px-4 py-2 cursor-pointer hover:bg-white/90'>
              Start Building Now
            </button>
          </Link>
        </div>
      </div>

      <ParticlesBG />
    </section>
  );
};

export default HeroImage;

import React from 'react';
import ParticlesBG from '../components/ParticlesBG';
import SectionWrapper from '@/components/SectionWrapper';
import Section from '@/components/Section';

import bgImage from '../../../../public/services-bg.png';

const Page = () => {
  return (
    <>
      <section className='h-[450px] relative'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h1 className='text-4xl text-white z-10 text-center'>About Us</h1>
        </div>

        <ParticlesBG />
      </section>

      <SectionWrapper bgImage={bgImage.src} className='py-20'>
        <Section className='w-11/12'>
          <div className='grid grid-cols-1 gap-8'>
            <div className=''>
              <h1 className='text-2xl text-center'>Our Mission</h1>
              <p className='my-2 text-justify'>
                We believe in a world where technology helps businesses work
                smarter, not harder. Our mission is to empower businesses
                through smooth and sustainable digital solution. We provide
                solutions that simplify your daily operations, so you can focus
                on what truly matters serving your customer and achieving
                financial goals.
              </p>
            </div>

            <div className='mt-16'>
              <h1 className='text-2xl text-center'>Our Vision</h1>
              <p className='my-2'>
                We believe in a world where businesses, regardless of size, can
                effortlessly utilise technology to improve operations, bring
                innovation, and make a meaningful impact. Our vision is to
                empower organisations by facilitating smooth and sustainable
                digital solutions, allowing them to negotiate the complexity of
                the digital age with confidence and agility.
              </p>
            </div>
          </div>
        </Section>
      </SectionWrapper>
    </>
  );
};

export default Page;

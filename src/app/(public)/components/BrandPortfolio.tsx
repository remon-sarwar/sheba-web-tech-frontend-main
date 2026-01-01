import Section from '@/components/Section';
import SectionWrapper from '@/components/SectionWrapper';
import React from 'react';

import img1 from '../../../../public/brand-port/tazabazar.png';
import img2 from '../../../../public/brand-port/Zibonshathi.png';
import img3 from '../../../../public/brand-port/NKWT-logo.png';
import img4 from '../../../../public/brand-port/sheba-pubs.png';

export interface IBrandPortfolioCard {
  imageURL: string;
}

export const BrandPortfolioCard: React.FC<IBrandPortfolioCard> = ({
  imageURL
}) => {
  return (
    <div className='flex justify-center px-4 py-4'>
      <img src={imageURL} className='h-16 w-auto' />
    </div>
  );
};

const BrandPortfolio = () => {
  return (
    <SectionWrapper className='py-24'>
      <Section>
        <h1 className='text-3xl text-center font-bold'>Our Brand Portfolio</h1>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mt-16'>
          <BrandPortfolioCard imageURL={img1.src} />
          <BrandPortfolioCard imageURL={img2.src} />
          <BrandPortfolioCard imageURL={img3.src} />
          <BrandPortfolioCard imageURL={img4.src} />
        </div>
      </Section>
    </SectionWrapper>
  );
};

export default BrandPortfolio;

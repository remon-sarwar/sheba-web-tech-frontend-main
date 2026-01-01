import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import SectionWrapper from '@/components/SectionWrapper';
import React from 'react';
import ProdAndServiceCard, { IProdAndService } from './ProdAndServiceCard';

import domain from '../../../../public/images/domain-name.png';
import hosting from '../../../../public/images/cloud-server.png';

import SectionSubTitle from '@/components/SectionSubTitle';
import { IPlatformService } from '@/app/(admin)/components/types';

import bgImage from '../../../../public/services-bg.png';

const prodAndServices = [
  {
    imageURL: domain.src,
    title: 'Domain Registration and Management',
    description: 'Find your perfect domain and keep it secure.'
  },
  {
    imageURL: hosting.src,
    title: 'cPanel Hosting',
    description:
      'Fast, reliable, and scalable — powered by premium infrastructure.'
  },
  {
    imageURL: domain.src,
    title: 'Web Development',
    description:
      'From landing pages to full-stack platforms, we build with performance in mind.'
  },
  {
    imageURL: domain.src,
    title: 'App Development',
    description:
      'Native, hybrid, or cross-platform — we bring your app ideas to life.'
  },
  {
    imageURL: domain.src,
    title: 'Tech Support and Maintentance',
    description: 'Bugs, updates, troubleshooting — handled by pros, 24/7.'
  },
  {
    imageURL: domain.src,
    title: 'UI/UX Design',
    description: 'Design that converts. Because looks do matter.'
  },
  {
    imageURL: domain.src,
    title: 'Consultation & Strategy',
    description: 'Not sure where to start? We’ll help you figure it out.'
  },
  {
    imageURL: domain.src,
    title: 'Cloud Native Applications',
    description:
      'Built to thrive in the cloud — scalable, resilient, and ready for rapid deployment across any environment.'
  }
];

export interface IProductsAndServices {
  services: IPlatformService[];
}

const ProductsAndServices: React.FC<IProductsAndServices> = ({ services }) => {
  return (
    <SectionWrapper
      className={`py-24 bg-cover bg-center`}
      bgImage={bgImage.src}
    >
      <Section>
        <SectionTitle title='Our Products & Services' />

        {/* <SectionSubTitle subtitle='What we offer' /> */}

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
          {services.map((item: Partial<IPlatformService>, i: number) => (
            <ProdAndServiceCard
              id={item.id}
              name={item.name}
              description={item.description}
              imageURL={item.imageURL}
              key={i}
              isService
            />
          ))}
        </div>
      </Section>
    </SectionWrapper>
  );
};

export default ProductsAndServices;

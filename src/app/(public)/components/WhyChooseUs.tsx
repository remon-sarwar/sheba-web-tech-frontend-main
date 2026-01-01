import Section from '@/components/Section';
import SectionSubTitle from '@/components/SectionSubTitle';
import SectionTitle from '@/components/SectionTitle';
import SectionWrapper from '@/components/SectionWrapper';
import React from 'react';
import ProdAndServiceCard, { IProdAndService } from './ProdAndServiceCard';

import secure from '../../../../public/images/security.png';
import { IPlatformService, IWhyChooseUs } from '@/app/(admin)/components/types';

import bgImage from '../../../../public/why-choose-us.png';

const chooseUs = [
  {
    title: 'Secure and Scalable Infrastructure',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    imageURL: secure.src
  },
  {
    title: 'Strategic Thinking and Technical Execution',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    imageURL: secure.src
  },
  {
    title: 'End-to-End Solutions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    imageURL: secure.src
  },
  {
    title: 'Build for Growth, Not Just Launch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    imageURL: secure.src
  }
];

const WhyChooseUs: React.FC<{
  whyChooseUs: IWhyChooseUs[];
}> = ({ whyChooseUs }) => {
  return (
    <SectionWrapper
      className='py-16 pb-32'
      bgImage={bgImage.src}
      bgPosition='100% 80%'
    >
      <Section>
        <SectionTitle title='Why Choose Us?' />

        {/* <SectionSubTitle subtitle="We're your tech partners" /> */}

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
          {whyChooseUs.map((item: IWhyChooseUs, i: number) => (
            <ProdAndServiceCard
              name={item.title}
              description={item.description}
              imageURL={item.imageURL}
              key={i}
            />
          ))}
        </div>
      </Section>
    </SectionWrapper>
  );
};

export default WhyChooseUs;

import Section from '@/components/Section';
import SectionSubTitle from '@/components/SectionSubTitle';
import SectionTitle from '@/components/SectionTitle';
import SectionWrapper from '@/components/SectionWrapper';
import React from 'react';
import TestimonialCard, { ITestimonialCard } from './TestimonialCard';
import { ITestimonial } from '@/app/(admin)/components/types';

const testiMonials: ITestimonialCard[] = [
  {
    name: 'June Monroe',
    imageURL: '',
    designation: 'CTO, DataBank LLC',
    quote:
      'SheBa WebTech have been paramount in solving our core technical issues, I am grateful for them'
  },
  {
    name: 'June Monroe',
    imageURL: '',
    designation: 'CTO, DataBank LLC',
    quote:
      'SheBa WebTech have been paramount in solving our core technical issues, I am grateful for them'
  },
  {
    name: 'June Monroe',
    imageURL: '',
    designation: 'CTO, DataBank LLC',
    quote:
      'SheBa WebTech have been paramount in solving our core technical issues, I am grateful for them'
  }
];

const MeetOurClients: React.FC<{
  testimonials: ITestimonial[];
}> = ({ testimonials }) => {
  return (
    <SectionWrapper className='py-8'>
      <Section>
        <SectionTitle title='Why Choose Us?' />

        <SectionSubTitle subtitle="We're your tech partners" />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {testiMonials.map((item: ITestimonialCard, i: number) => (
            <TestimonialCard
              name={item.name}
              designation={item.designation}
              quote={item.quote}
              key={i}
            />
          ))}
        </div>
      </Section>
    </SectionWrapper>
  );
};

export default MeetOurClients;

// app/services/[serviceId]/page.tsx
import Section from '@/components/Section';
import SectionWrapper from '@/components/SectionWrapper';
import React from 'react';
import { IService, IServiceOffer, services } from '@/util/ServicesData';
import ObtainingInfo from './components/ObtainingInfo';
import ParticlesBG from '../../components/ParticlesBG';

import bgImage from '../../../../../public/services-bg.png';

export interface IServiceDetailsPage {
  params: Promise<{ serviceId: string }>;
}

async function init(serviceId: string): Promise<Partial<IService>> {
  try {
    const service = services.find(svc => Number(svc.id) === Number(serviceId));
    return service || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

const Page: React.FC<IServiceDetailsPage> = async ({ params }) => {
  const { serviceId } = await params;
  const serviceData = await init(serviceId);

  return (
    <>
      <section className='h-[450px] relative bg-gradient-to-br from-sky-700 to-indigo-900'>
        <div className='absolute inset-0 pointer-events-none'>
          <ParticlesBG />
        </div>

        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 text-center z-10 max-w-3xl'>
          <h1 className='text-4xl text-white font-extrabold mb-3'>
            {serviceData.title ?? 'Service'}
          </h1>
          <p className='text-white mb-6'>{serviceData.description ?? ''}</p>

          {/* <div className='flex justify-center gap-3 z-50'>
            <EstimateCTA service={serviceData} />
            <a
              href='#offers'
              className='inline-flex items-center px-4 py-2 border rounded-lg bg-white/10 text-white hover:bg-white/20'
            >
              View Offers
            </a>
          </div> */}
        </div>
      </section>

      <SectionWrapper className='py-20' bgImage={bgImage.src}>
        <Section>
          <h2 id='offers' className='text-3xl font-semibold text-center mb-20'>
            Our {serviceData.title} Includes
          </h2>

          <div className='flex justify-center w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
              {(serviceData as IService)?.offers?.map(
                (offer: IServiceOffer) => (
                  <div
                    key={offer.id}
                    className='bg-white shadow-lg rounded-lg p-6 flex flex-col'
                  >
                    {/* <img
                      src={offer.imageURL}
                      alt={offer.title}
                      className='h-10 object-contain mb-4'
                    /> */}
                    <h3 className='text-xl font-bold mb-2 text-primary'>
                      {offer.title}
                    </h3>
                    <p className='text-sm flex-1 mb-4'>{offer.description}</p>
                    {/* <a
                  href='#obtaining'
                  className='mt-auto inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
                >
                  Learn how to obtain
                </a> */}
                  </div>
                )
              )}
            </div>
          </div>
        </Section>
      </SectionWrapper>

      <SectionWrapper className='py-20'>
        <Section>
          <ObtainingInfo service={serviceData} />
        </Section>
      </SectionWrapper>
    </>
  );
};

export default Page;

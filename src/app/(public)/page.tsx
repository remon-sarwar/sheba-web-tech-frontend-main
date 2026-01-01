import HeroImage from './components/HeroImage';
import ProductsAndServices from './components/ProductsAndServices';
import WhyChooseUs from './components/WhyChooseUs';
import MeetOurClients from './components/MeetOurClients';
import PlatformServiceService from '@/endpoints/admin/PlatformServiceService';
import WhyChooseUsService from '@/endpoints/admin/WhyChooseUsService';
import TestimonialService from '@/endpoints/admin/TestimonialService';
import {
  IPlatformService,
  ITestimonial,
  IWhyChooseUs
} from '../(admin)/components/types';
import FramerTechStacks from './components/FramerTechStacks';
import BrandPortfolio from './components/BrandPortfolio';

export const dynamic = 'force-dynamic';

async function init() {
  try {
    const platFormServiceSvc = new PlatformServiceService(true);
    const whyChooseUsSvc = new WhyChooseUsService(true);
    const testimonialSvc = new TestimonialService(true);

    const services: IPlatformService[] = await platFormServiceSvc.getAll();
    const whyChooseUs: IWhyChooseUs[] = await whyChooseUsSvc.getAll();
    const testimonials: ITestimonial[] = await testimonialSvc.getAll();

    return {
      services,
      whyChooseUs,
      testimonials
    };
  } catch (err) {
    console.log(err);
    return {
      services: [],
      whyChooseUs: [],
      testimonials: []
    };
  }
}

export const metadata = {
  title: 'SheBa Web Technology | Smart, Scalable, and Modern Web Solutions',
  description:
    'We build websites and systems that actually work — fast, reliable, and built for your growth. From hosting to full-scale development, SheBa Web Technology makes the web simple again.'
};

export default async function Home() {
  const { services, whyChooseUs, testimonials } = await init();

  return (
    <>
      <HeroImage />
      <FramerTechStacks />

      <ProductsAndServices services={services} />
      <BrandPortfolio />
      <WhyChooseUs whyChooseUs={whyChooseUs} />

      {/* <MeetOurClients testimonials={testimonials} /> */}
    </>
  );
}

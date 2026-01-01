import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PlatformServiceService from '@/endpoints/admin/PlatformServiceService';

import { IPlatformService } from '@/app/(admin)/components/types';
import ProductsAndServices from '../components/ProductsAndServices';
import ProdAndServiceCard from '../components/ProdAndServiceCard';

async function init() {
  try {
    const servicesList: IPlatformService[] = await new PlatformServiceService(
      true
    ).getAll();
    return { servicesList };
  } catch (err) {
    console.log(err);
    return { servicesList: [] };
  }
}

export const metadata = {
  title: 'Services | Web Design, Development & Hosting by SheBa Web Technology',
  description:
    'From modern websites to complex web systems — our team handles design, development, and hosting with precision and care. Get tech that scales with your vision.'
};

export default async function ServiceListPage() {
  const { servicesList } = await init();

  return <ProductsAndServices services={servicesList} />;
}

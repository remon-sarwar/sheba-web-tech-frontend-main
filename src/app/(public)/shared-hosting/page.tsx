import { sendget } from '@/endpoints/AllCalls';
import Mainview from './components/allcom';

export const dynamic = 'force-dynamic';

async function serverside() {
  try {
    let data = await sendget('/api/products', undefined, false);

    let newlist = data.map((ke: Record<string, string | number>) => {
      let name = (ke.name as string).split('_');
      return {
        id: ke.id,
        name: name[name.length - 1],
        price: ke.price,
        detailslist: [
          { key: 'Storage Size', value: `${ke.quota} MB` },
          { key: 'Bandwidth', value: 'Unlimited' },
          { key: 'Email Accounts', value: ke.maxpop },
          { key: 'FTP Accounts', value: ke.maxftp },
          { key: 'Dedicated IP Address', value: ke.ip == 'n' ? 0 : ke.ip },
          { key: 'Sub-Domain', value: ke.maxsub }
        ]
      };
    });

    return newlist;
  } catch {
    return [];
  }
}

export const metadata = {
  title:
    'Shared Hosting | Reliable, Fast, and Affordable – SheBa Web Technology',
  description:
    'Host your site on high-performance servers without breaking your budget. Simple setup, rock-solid uptime, and support that actually responds.'
};

export default async function HostingProductPage() {
  let packages = await serverside();

  return <Mainview packages={packages} />;
}

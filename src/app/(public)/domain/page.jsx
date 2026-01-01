'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DomainSearchPage() {
  const results = [
    { name: 'nabilaltamash.com', price: '1000' },
    { name: 'nabilaltamash.org', price: '1000' },
    { name: 'nabilaltamash.abc', price: '1000' },
    { name: 'nabilaltamash.xyz', price: '1000' },
    { name: 'nabilaltamash.edu', price: '1000' },
    { name: 'nabilaltamash.net', price: '1000' },
    { name: 'nabilaltamash.bd', price: '1000' }
  ];
  const searchTerm = 'nabilaltamash';

  const loading = false;

  const handleBuy = domain => {};

  return (
    <div className='max-w-5xl mx-auto p-6 space-y-8'>
      <h1 className='text-3xl font-bold text-center'>
        Search Results for: <span className='text-primary'>{searchTerm}</span>
      </h1>

      {loading ? (
        <p className='text-center text-muted-foreground'>
          Checking availability...
        </p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {results.map((domain, idx) => (
            <Card
              key={idx}
              className='rounded-xl border p-4 shadow hover:shadow-lg transition'
            >
              <CardContent className='space-y-2'>
                <h2 className='text-lg font-semibold text-primary/90'>
                  {domain.name}
                </h2>
                <p className='text-gray-700'>৳{domain.price} / year</p>
                <Button className='w-full bg-emerald-600 text-white hover:bg-emerald-700 rounded-md'>
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

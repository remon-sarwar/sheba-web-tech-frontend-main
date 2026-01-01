'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PromoEmailService from '@/endpoints/PromoEmailService';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  useEffect(() => {
    if (!email) {
      setStatus('error');
      return;
    }

    (async () => {
      try {
        const svc = new PromoEmailService();
        await svc.unsubscribe(email);
        setStatus('success');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    })();
  }, [email]);

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-screen text-center'>
        Processing your unsubscribe request...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='flex items-center justify-center min-h-screen text-center'>
        Invalid request. Could not unsubscribe.
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-screen text-center'>
      {email} has been unsubscribed.
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen'>
          Loading...
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}

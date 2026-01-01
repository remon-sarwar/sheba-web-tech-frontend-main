'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OrderService from '@/endpoints/OrderService';

import { clear } from '@/lib/features/cartSlice';
import { useAppDispatch } from '@/lib/hooks';

function SuccessContent() {
  const [sessionId, setSession] = useState('');
  const [status, setStatus] = useState('Verifying payment...');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionIdParam = String(searchParams.get('session_id'));

  const dispatch = useAppDispatch();

  const verifyPayment = async () => {
    setLoading(true);
    try {
      const orderSvc = new OrderService();
      const data = await orderSvc.successCallback({
        sessionid: sessionIdParam
      });

      dispatch(clear());
      setStatus('✅ Payment Successful! Redirecting to dashboard...');

      setTimeout(() => router.push('/my-dashboard'), 3000);
    } catch (err) {
      setStatus('❌ Failed to verify payment. Please contact support.');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!sessionId) {
      setSession(sessionIdParam);
      return;
    }
    verifyPayment();
  }, [sessionId]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center'>
      {loading ? (
        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4'></div>
          <p className='text-lg font-medium'>{status}</p>
        </div>
      ) : (
        <div>
          <h1 className='text-2xl font-bold'>Payment Status</h1>
          <p className='mt-4 text-lg'>{status}</p>
        </div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen'>
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

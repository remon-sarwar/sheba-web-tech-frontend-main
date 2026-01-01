'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthService from '@/endpoints/AuthService';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setSuccess('');
    setError('');

    try {
      const sessionId = String(localStorage.getItem('sessionId'));
      const email = String(localStorage.getItem('email'));

      const payload = {
        sessionId,
        email,
        otp
      };

      const svc = new AuthService();
      const data = await svc.verifyOTP(payload);

      setSuccess('Verification successful! Redirecting to login...');

      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      console.log(err);
      // @ts-ignore
      setError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  // make success/error vanish after 3s
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className='min-h-screen bg-white px-6 py-8 font-poppins text-black'>
      <div className='flex justify-center items-center mt-12'>
        <div className='max-w-md w-full text-center space-y-6'>
          <img
            src='/images/sheba.png'
            alt='Sheba Logo'
            className='h-32 mx-auto'
          />

          <h2 className='text-2xl font-bold'>OTP Verification</h2>
          <p className='text-sm text-gray-600'>
            Enter the 6-digit code sent to your email
          </p>

          {success && (
            <div className='bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm'>
              {success}
            </div>
          )}
          {error && (
            <div className='bg-red-100 text-red-700 py-2 px-4 rounded-md text-sm'>
              {error}
            </div>
          )}

          <form className='space-y-4 text-left' onSubmit={handleSubmit}>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                6 digit OTP
              </label>
              <Input
                placeholder='Enter your OTP'
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className='bg-card-primary py-2 px-4 border border-button-primary w-full'
              />
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='bg-button-primary text-white px-4 py-2 rounded-md text-sm duration-300 w-full flex justify-center items-center'
            >
              {isLoading && <Loader2 className='animate-spin mr-2 h-4 w-4' />}
              {isLoading ? 'Submitting...' : 'Confirm'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

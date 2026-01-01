'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { sendPost } from '@/endpoints/AllCalls';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function OTPContent() {
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  const email =
    searchParams.get('email') || localStorage.getItem('email') || '';

  // auto clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleReset = async () => {
    if (!code || !pass || !confirmPass || !email) {
      setError('Please fill in all fields before submitting.');
      return;
    }

    if (pass !== confirmPass) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendPost('/api/Auth/reset-password-with-otp', {
        email,
        sessionId: localStorage.getItem('sessionId') || 'failed',
        otp: code,
        newPassword: pass
      });

      if (res?.message) {
        setSuccess(res.message);
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to verify OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTP = async () => {
    if (!code) {
      setError('Enter your OTP first.');
      return;
    }

    setIsLoading(true);
    const sessionId = localStorage.getItem('sessionId');
    const storedEmail = localStorage.getItem('email');

    try {
      await sendPost(
        '/api/Auth/verify-otp',
        { sessionId, email: storedEmail, otp: code },
        undefined,
        true
      );

      setSuccess('Your account is verified. Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.message || 'OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (email) handleReset();
    else handleOTP();
  };

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
                OTP Code
              </label>
              <Input
                placeholder='Enter your OTP'
                value={code}
                onChange={e => setCode(e.target.value)}
                className='bg-card-primary py-2 px-4 border border-button-primary w-full'
              />
            </div>

            {email && (
              <>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    New Password
                  </label>
                  <Input
                    type='password'
                    placeholder='Enter new password'
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    className='bg-card-primary py-2 px-4 border border-button-primary w-full'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Confirm Password
                  </label>
                  <Input
                    type='password'
                    placeholder='Confirm new password'
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    className={`bg-card-primary py-2 px-4 border ${
                      pass && confirmPass && pass !== confirmPass
                        ? 'border-red-500'
                        : 'border-button-primary'
                    } w-full`}
                  />
                  {pass && confirmPass && pass !== confirmPass && (
                    <p className='text-xs text-red-500 mt-1'>
                      Passwords do not match.
                    </p>
                  )}
                </div>
              </>
            )}

            <Button
              type='submit'
              disabled={isLoading}
              className='bg-button-primary text-white px-4 py-2 rounded-md text-sm duration-300 cursor-pointer w-full flex justify-center items-center'
            >
              {isLoading && <Loader2 className='animate-spin mr-2 h-4 w-4' />}
              {isLoading ? 'Submitting...' : 'Confirm'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OTPPage() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen text-gray-600'>
          Loading...
        </div>
      }
    >
      <OTPContent />
    </Suspense>
  );
}

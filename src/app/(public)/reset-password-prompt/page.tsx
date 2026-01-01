'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sendPost } from '@/endpoints/AllCalls';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    try {
      let res = await sendPost('/api/Auth/send-password-reset-otp', {
        email: email
      });
      if (res.succeeded) {
        localStorage.setItem('sessionId', res.sessionId);
        document.location = '/otp?email=' + encodeURIComponent(email);
      } else {
        alert(res.message);
      }
    } catch {
      alert("This user doesn't exists!");
    }
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen bg-white px-6 py-8 font-poppins text-black'>
      <div className='flex justify-center items-center mt-10'>
        <div className='max-w-md w-full text-center space-y-6'>
          <img
            src='/images/sheba.png'
            alt='Sheba Logo'
            className='h-32 mx-auto'
          />

          <h2 className='text-2xl font-bold'>Reset Password</h2>
          <p className='text-sm text-gray-600'>Enter Your Email Address</p>

          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor='email' className='my-2'>
                Email Address
              </Label>
              <Input
                id='email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                placeholder='Email Address'
                className='bg-card-primary py-4 px-4 border border-button-primary'
              />
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='bg-button-primary text-white px-4 py-2 rounded-md text-sm duration-300 w-full flex justify-center items-center'
            >
              {isLoading && <Loader2 className='animate-spin mr-2 h-4 w-4' />}
              {isLoading ? 'Resetting password...' : 'Reset Password'}
            </Button>
          </form>

          <Link
            href='/login'
            className='text-sm text-gray-600 hover:underline block mt-2'
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

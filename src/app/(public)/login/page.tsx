'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import AuthService from '@/endpoints/AuthService';

import { setAuthUser, setAuth } from '@/lib/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    try {
      const svc = new AuthService();
      const data = await svc.login({
        email: user,
        password
      });

      const token: string = String(data['token']);

      let decodedToken: Record<string, string | number | null> = {},
        role: string = '';

      if (token) {
        decodedToken = jwtDecode(token);
        role = String(
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ]
        );

        localStorage.setItem('token', token);
        if (role === 'Admin') {
          router.push('/admin-products');
        } else {
          router.push('/my-dashboard');
        }

        // setting global state
        dispatch(setAuth(true));
        dispatch(
          setAuthUser({
            ...decodedToken,
            role: role,
            name: '',
            email: ''
          })
        );
      }
    } catch {
      alert('Wrong email or password');
    }
    setLoading(false);
  }

  return (
    <section className='min-h-screen flex flex-col justify-center items-center'>
      <div className='flex w-full justify-center'>
        <div className='bg-slate-100 rounded-md w-11/12 lg:w-4/12 p-6 shadow-neutral-200 shadow-lg'>
          <h1 className='text-2xl'>Log in</h1>

          <div className='my-2'>
            <Label htmlFor='#username' className='my-2'>
              Username
            </Label>
            <Input
              id='username'
              placeholder='Username'
              value={user}
              onChange={e => {
                setUser(e.target.value);
              }}
              className='bg-card-primary py-4 px-4 border border-button-primary'
            />
          </div>

          <div className='my-2'>
            <Label className='my-2'>Password</Label>
            <Input
              placeholder='Password'
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              className='bg-card-primary py-2 px-4 border border-button-primary'
              type='password'
            />
          </div>

          <Link
            href='/reset-password-prompt'
            className='text-button-primary hover:underline'
          >
            Forgot password?
          </Link>

          <div className='flex justify-end'>
            <Button
              disabled={loading}
              className='bg-button-primary text-white px-4 py-2 rounded-md text-sm duration-300 cursor-pointer'
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>

          <p className=''>
            Don't have account?{' '}
            <Link href='/sign-up' className='text-button-primary'>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;

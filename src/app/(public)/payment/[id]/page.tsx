'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import OrderService from '@/endpoints/OrderService';
import { Copy, Eye, EyeOff, RefreshCw, Loader2 } from 'lucide-react';

const validatePassword = (password: string) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|;:'",.<>/?]).{8,}$/.test(
    password
  );

const generatePassword = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  return Array.from(
    { length: 12 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
};

const suggestUsernameFromDomain = (domain: string) => {
  const m = /^([A-Za-z0-9\-]+)/.exec(domain || '');
  return m ? m[1] : '';
};

export default function MainConpo() {
  const router = useRouter();
  const pathname = usePathname() || '';
  const pidCandidate = Number.parseInt(
    pathname.split('/').filter(Boolean).pop() || '',
    10
  );
  const pid = pidCandidate || 0;

  useEffect(() => {
    if (!pidCandidate || Number.isNaN(pidCandidate)) router.push('/cart');
  }, [pidCandidate, router]);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [domainname, setDomainName] = useState('');
  const [userhandle, setUserHandle] = useState('');
  const [password, setPassword] = useState(generatePassword());
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [domainHint, setDomainHint] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [whmError, setWhmError] = useState<string | null>(null);

  useEffect(() => {
    if (!userhandle && domainname)
      setDomainHint(suggestUsernameFromDomain(domainname));
    else setDomainHint('');
  }, [domainname, userhandle]);

  useEffect(() => {
    setPasswordError(
      password && !validatePassword(password)
        ? 'Must include 1 uppercase, 1 number, 1 special char, min 8 chars'
        : ''
    );
  }, [password]);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGeneratePassword = () => {
    setPassword(generatePassword());
    setCopied(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pid) return router.push('/cart');
    if (!email || !domainname || !userhandle || !password) {
      setWhmError('All fields are required!');
      return;
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setWhmError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setWhmError(
        'Password must be strong (uppercase, number, symbol, min 8 chars).'
      );
      return;
    }

    setWhmError(null);
    setIsLoading(true);
    try {
      const orderSvc = new OrderService();
      await orderSvc.whmCheck({ user: userhandle, domain: domainname });
      const orderRes = await orderSvc.makeOrder({
        productId: pid,
        productType: 'Null',
        domainName: domainname,
        userHandle: userhandle,
        email,
        password
      });

      if (typeof orderRes === 'string' && orderRes.startsWith('http')) {
        window.location.href = orderRes;
      } else if (orderRes?.url) {
        router.push(orderRes.url);
      } else {
        alert(orderRes?.message || 'Order created — check your dashboard.');
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      // @ts-ignore
      setWhmError(String(err?.response?.data?.message));
    } finally {
      setIsLoading(false);
    }
  };

  if (!pid)
    return (
      <h5 className='min-h-screen flex items-center justify-center'>
        Loading...
      </h5>
    );

  return (
    <div className='min-h-screen bg-white px-6 py-8 font-poppins text-black'>
      <div className='flex justify-center items-start mt-12'>
        <div className='max-w-md w-full space-y-6'>
          <img
            src='/images/sheba.png'
            alt='Sheba Logo'
            className='h-28 mx-auto'
          />

          <div className='bg-white shadow-xl rounded-2xl p-6'>
            <h2 className='text-2xl font-bold text-center'>Hosting Details</h2>
            <p className='text-sm text-gray-600 text-center mt-1'>
              Provide your contact email, desired domain, and username for your
              cPanel.
            </p>

            <div className='mt-4 p-4 rounded-md bg-card-primary border border-button-primary'>
              <h3 className='font-semibold mb-2'>Quick Instructions</h3>
              <ul className='text-sm list-disc pl-5 space-y-1 text-gray-700'>
                <li>
                  Use a strong password (uppercase, number, symbol, min 8 chars)
                </li>
                <li>
                  Keep your password in a <strong>safe place</strong>. You won’t
                  see it again.
                </li>
              </ul>
            </div>

            <form className='space-y-4 text-left mt-4' onSubmit={handleSubmit}>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Contact Email
                </label>
                <Input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='you@company.com'
                  className='bg-card-primary py-2 px-4 border border-button-primary w-full'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Domain Name
                </label>
                <Input
                  type='text'
                  value={domainname}
                  onChange={e => setDomainName(e.target.value.trim())}
                  placeholder='example.com'
                  className='bg-card-primary py-2 px-4 border border-button-primary w-full'
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Suggested username:{' '}
                  <span className='font-medium'>{domainHint}</span>
                </p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Username (cPanel)
                </label>
                <Input
                  type='text'
                  value={userhandle}
                  onChange={e => setUserHandle(e.target.value.trim())}
                  placeholder='desired-username'
                  className={`bg-card-primary py-2 px-4 border ${
                    userhandle && !/^[a-z0-9\-]+$/.test(userhandle)
                      ? 'border-red-500'
                      : 'border-button-primary'
                  } w-full`}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Password
                </label>
                <div className='relative flex items-center'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={`bg-card-primary py-2 px-4 border ${
                      password && !validatePassword(password)
                        ? 'border-red-500'
                        : 'border-button-primary'
                    } w-full pr-24`}
                  />
                  <div className='absolute right-2 flex items-center space-x-2'>
                    <button
                      type='button'
                      onClick={handleGeneratePassword}
                      title='Generate password'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      <RefreshCw size={18} />
                    </button>
                    <button
                      type='button'
                      onClick={handleCopyPassword}
                      title='Copy password'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      title='Show/Hide password'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {passwordError ? (
                  <p className='text-xs text-red-500 mt-1'>{passwordError}</p>
                ) : (
                  <p className='text-xs text-gray-500 mt-1'>
                    Store your password securely — you won’t see it again.
                  </p>
                )}
                {copied && (
                  <p className='text-xs text-green-600 mt-1'>
                    Password copied to clipboard!
                  </p>
                )}
              </div>

              {whmError && (
                <div className='bg-red-50 text-red-700 border border-red-300 rounded-md px-3 py-2 text-sm'>
                  {whmError}
                </div>
              )}

              <Button
                type='submit'
                disabled={isLoading}
                className='bg-button-primary text-white px-4 py-2 rounded-md text-sm duration-300 w-full flex justify-center items-center'
              >
                {isLoading && <Loader2 className='animate-spin mr-2 h-4 w-4' />}
                {isLoading ? 'Checking & Creating...' : 'Submit Order'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

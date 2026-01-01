'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendPost } from '@/endpoints/AllCalls';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SignupForm {
  name: string;
  email: string;
  address: string;
  password: string;
  cpass: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupForm>({
    name: '',
    email: '',
    address: '',
    password: '',
    cpass: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password: string): boolean => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|;:'",.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, address, password, cpass } = formData;
    if (isLoading) return;

    if (!name || !email || !address || !password || !cpass) {
      alert('All fields are required.');
      return;
    }
    if (password !== cpass) {
      alert('Passwords do not match.');
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      alert('Invalid email format.');
      return;
    }
    if (!validatePassword(password)) {
      alert(
        'Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long.'
      );
      return;
    }

    setLoading(true);
    try {
      const data = await sendPost('/api/Auth/register', {
        name,
        email,
        address,
        password
      });

      if (data['succeeded']) {
        localStorage.setItem('sessionId', data['sessionId']);
        localStorage.setItem('email', email);
        router.push('/sign-up/otp');
      } else {
        alert(data['message']);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
    setLoading(false);
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

          <h2 className='text-2xl font-bold'>Create Your Account</h2>
          <p className='text-sm text-gray-600'>
            Fill in the details below to get started
          </p>

          <form className='space-y-4 text-left' onSubmit={handleSubmit}>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Full Name
              </label>
              <Input
                type='text'
                name='name'
                placeholder='Your full name'
                value={formData.name}
                onChange={handleChange}
                className='bg-card-primary py-2 px-4 border border-button-primary w-full'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <Input
                type='email'
                name='email'
                placeholder='you@example.com'
                value={formData.email}
                onChange={handleChange}
                className='bg-card-primary py-2 px-4 border border-button-primary w-full'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Address
              </label>
              <Input
                type='text'
                name='address'
                placeholder='Your address'
                value={formData.address}
                onChange={handleChange}
                className='bg-card-primary py-2 px-4 border border-button-primary w-full'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Password
              </label>
              <Input
                type='password'
                name='password'
                placeholder='Enter password'
                value={formData.password}
                onChange={e => {
                  handleChange(e);
                  setPasswordError(
                    e.target.value && !validatePassword(e.target.value)
                      ? 'Must have uppercase, number, special char, and 8+ chars.'
                      : ''
                  );
                }}
                className='bg-card-primary py-2 px-4 border border-button-primary w-full'
              />
              {passwordError && (
                <p className='text-xs text-red-500 mt-1'>{passwordError}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Confirm Password
              </label>
              <Input
                type='password'
                name='cpass'
                placeholder='Confirm password'
                value={formData.cpass}
                onChange={handleChange}
                className={`bg-card-primary py-2 px-4 border ${
                  formData.cpass &&
                  formData.password &&
                  formData.cpass !== formData.password
                    ? 'border-red-500'
                    : 'border-button-primary'
                } w-full`}
              />
              {formData.cpass &&
                formData.password &&
                formData.cpass !== formData.password && (
                  <p className='text-xs text-red-500 mt-1'>
                    Passwords do not match.
                  </p>
                )}
            </div>

            {/* Agreement text */}
            <p className='text-gray-600 mt-4'>
              By signing up, I agree to the{' '}
              <Link
                href='/terms-of-service'
                className='text-blue-600 hover:underline'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='/privacy-policy'
                className='text-blue-600 hover:underline'
              >
                Privacy Policy
              </Link>{' '}
              of SheBa Web Technology.
            </p>

            <Button
              disabled={isLoading}
              type='submit'
              className='bg-button-primary text-white px-4 py-2 rounded-md text-sm duration-300 cursor-pointer w-full'
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

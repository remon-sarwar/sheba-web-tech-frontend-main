'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setAuth, setAuthUser } from '@/lib/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  const { authenticated, user } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogout = () => {
    try {
      dispatch(setAuth(false));
      dispatch(
        setAuthUser({
          role: '',
          email: '',
          name: ''
        })
      );

      localStorage.removeItem('token');
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='relative inline-block text-left cursor-pointer'>
      <button
        onClick={() => setOpen(!open)}
        className='inline-flex justify-center w-full rounded-md border 
                   shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 
                   hover:bg-gray-50 focus:outline-none cursor-pointer'
      >
        Dashboard
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white'>
          <div className='py-1'>
            <Link
              href={
                user.role.toLowerCase() === 'admin'
                  ? '/admin-products'
                  : '/my-dashboard'
              }
            >
              <button
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                onClick={() => console.log('Dashboard clicked')}
              >
                Dashboard
              </button>
            </Link>
            <button
              className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

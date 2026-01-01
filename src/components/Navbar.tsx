'use client';

import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import Link from 'next/link';
import NavItem from './NavItem';
import MobileNav from './MobileNav';
import NavCartItem from './NavCartItem';

import logo from '../../public/sheba.png';

import { useAppSelector } from '@/lib/hooks';
import Dropdown from '@/app/(public)/components/AuthDropdown';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { authenticated, user } = useAppSelector(state => state.auth);

  return (
    <SectionWrapper className='bg-white backdrop-blur-sm fixed top-0 left-0 z-50'>
      <nav className='w-11/12 lg:w-11/12'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex justify-between items-center gap-4'>
            <div className='mr-4'>
              <Link href='/' className='text-xl font-bold text-white'>
                <img src={logo.src} className='h-16' />
              </Link>
            </div>

            <ul className='hidden lg:flex gap-6 items-center'>
              <NavItem label='Home' url='/' />
              <NavItem
                label='Products'
                subMenuItems={[
                  // { label: 'Domain', url: '/domains' },
                  { label: 'Shared Hosting', url: '/shared-hosting' }
                ]}
                hasSubmenu
              />
              <NavItem label='Services' url='/services' />
              <NavItem label='Cart' url='/cart' />
              <NavItem label='Contact' url='/contact' />
              <NavItem label='About Us' url='/about-us' />
            </ul>

            <nav className='hidden lg:flex gap-4 items-center'>
              <span className='text-lg font-bold text-[#0081cc]'>
                +1-203-534-6163 (Direct & WhatsApp)
              </span>
              {authenticated ? (
                <Dropdown />
              ) : (
                <Link href='/login' className='cursor-pointer'>
                  <button className='bg-button-primary text-white px-4 py-2 rounded-md text-sm duration-300 cursor-pointer'>
                    Login
                  </button>
                </Link>
              )}
            </nav>

            <MobileNav open={open} setOpen={setOpen} />
          </div>
        </div>
      </nav>
    </SectionWrapper>
  );
};

export default Navbar;

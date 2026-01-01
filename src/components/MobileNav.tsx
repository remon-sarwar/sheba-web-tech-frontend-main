'use client';

import { AiOutlineClose } from 'react-icons/ai';

import React from 'react';
import MobileNavItem from './MobileNavItem';

import { BiMenuAltRight } from 'react-icons/bi';

interface MobileNavProps {
  open: boolean;
  setOpen: (a: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ open, setOpen }) => {
  return (
    <>
      <div
        className={`absolute z-50 top-0 left-0 h-screen w-screen bg-white backdrop-blur-sm transform ${
          open ? '-translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out filter drop-shadow-md overflow-y-auto`}
      >
        <div className='flex flex-col bg-blue-theme bg-opacity-90 overflow-auto'>
          <div className='right-0 absolute mt-2 mr-3 text-gray-700 bg-gray-600 bg-opacity-30 p-3 rounded-[50%]'>
            <AiOutlineClose
              className='text-white cursor-pointer'
              onClick={() => {
                console.log('clicked');
                setOpen(false);
              }}
            />
          </div>

          <div className='mt-8 pb-8'>
            <MobileNavItem
              label='Home'
              url='/'
              handleClose={() => setOpen(false)}
            />
            <MobileNavItem
              label='Products'
              url='/products'
              submenu={[{ label: 'Shared Hosting', href: '/shared-hosting' }]}
              handleClose={() => setOpen(false)}
            />
            <MobileNavItem
              label='Services'
              url='/services'
              handleClose={() => setOpen(false)}
            />
            <MobileNavItem
              label='Cart'
              url='/cart'
              handleClose={() => setOpen(false)}
            />
            <MobileNavItem
              label='Contact'
              url='/'
              handleClose={() => setOpen(false)}
            />
            <MobileNavItem
              label='About Us'
              url='/about-us'
              handleClose={() => setOpen(false)}
            />
          </div>
        </div>
      </div>

      <nav className='flex flex-row justify-end basis-3/6 lg:hidden'>
        <BiMenuAltRight
          className='self-center text-gray-700 text-lg'
          size={32}
          onClick={() => setOpen(true)}
        />
      </nav>
    </>
  );
};

export default MobileNav;

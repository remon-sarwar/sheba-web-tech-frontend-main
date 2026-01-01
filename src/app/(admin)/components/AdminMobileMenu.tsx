'use client';

import { AiOutlineClose } from 'react-icons/ai';

import React, { useRef } from 'react';
import MobileNavItem from './MobileNavItem';

interface IAdminMobileMenu {
  open: boolean;
  setOpen: (a: boolean) => void;
}

const AdminMobileMenu: React.FC<IAdminMobileMenu> = ({ open, setOpen }) => {
  const ref = useRef(null);

  return (
    <div
      className={`absolute z-50 top-0 left-0 h-screen w-screen bg-white transform ${
        open ? '-translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out filter drop-shadow-md lg:hidden overflow-y-auto`}
      onClick={() => setOpen(!open)}
    >
      <div className='flex flex-col bg-card-bg'>
        <div className='right-0 absolute mt-2 mr-3 text-crimson bg-card-bg bg-opacity-60 p-3 rounded-[50%]'>
          <AiOutlineClose
            className='text-white'
            onClick={() => setOpen(false)}
          />
        </div>

        <MobileNavItem
          onClick={() => setOpen(!open)}
          href='/admin-products'
          text='Products'
        />
        <MobileNavItem
          onClick={() => setOpen(!open)}
          href='/admin-orders'
          text='Orders'
        />
        <MobileNavItem
          onClick={() => setOpen(!open)}
          href='/admin-users'
          text='Users'
        />
        <MobileNavItem
          onClick={() => setOpen(!open)}
          href='/admin-testimonials'
          text='Testimonials'
        />
        <MobileNavItem
          onClick={() => setOpen(!open)}
          href='/admin-services'
          text='Services'
        />
      </div>
    </div>
  );
};

export default AdminMobileMenu;

'use client';

import React, { useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import { ITopbar } from './interfaces';
import Header from './Header';
import AdminMobileMenu from './AdminMobileMenu';

const Topbar: React.FC<ITopbar> = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Header
      isSidebarCollapsed={isSidebarCollapsed}
      setIsSidebarCollapsed={setIsSidebarCollapsed}
    >
      <AdminMobileMenu open={open} setOpen={setOpen} />

      {/* TODO add a dropdown menu here */}

      <nav className='flex flex-row justify-end lg:hidden'>
        <AiOutlineMenu
          className='self-center text-white font-bold-light text-lg'
          onClick={() => setOpen(true)}
        />
      </nav>
    </Header>
  );
};

export default Topbar;

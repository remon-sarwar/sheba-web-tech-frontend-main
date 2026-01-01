import React from 'react';
import { IHeader } from './interfaces';

// TODO add a collapse toggler

const Header: React.FC<IHeader> = ({
  children,
  isSidebarCollapsed,
  setIsSidebarCollapsed
}) => {
  return (
    <div className='py-4 lg:py-8 bg-button-primary text-white w-full px-4 flex duration-500 fixed z-50'>
      {children ? children : 'Header'}
    </div>
  );
};

export default Header;

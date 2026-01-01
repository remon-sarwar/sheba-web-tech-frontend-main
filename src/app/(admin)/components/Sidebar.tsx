import React from 'react';
import { IReusableSidebar } from './interfaces';

// TODO validate these TODOs
// TODO make it responsive
// With a different mobile menu
// hide this using breakpoints
// show the mobile menu using breakpoints

const Sidebar: React.FC<IReusableSidebar> = ({
  isCollapsed,
  setIsCollapsed,
  children
}) => {
  return (
    <div
      className={`${
        isCollapsed ? 'w-[60px]' : 'w-[240px]'
      } h-screen bg-slate-100 overflow-x-hidden duration-500 fixed hidden lg:block`}
    >
      {/* TODO show logo here based on the collapsed state */}
      <div className='text-3xl p-4 bg-crimson'>
        {/* <img src={logo.src} className='h-12' /> */}
      </div>
      {children ? (
        children
      ) : (
        <ul className='text-black'>
          <li className='list-none py-4'>Item 1</li>
          <li className='list-none py-4'>Item 1</li>
          <li className='list-none py-4'>Item 1</li>
          <li className='list-none py-4'>Item 1</li>
          <li className='list-none py-4'>Item 1</li>
          <li className='list-none py-4'>Item 1</li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

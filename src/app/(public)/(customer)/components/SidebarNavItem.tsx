import Link from 'next/link';
import React from 'react';

export interface ISidebarNavItem {
  url: string;
  label: string;
}

const SidebarNavItem: React.FC<ISidebarNavItem> = ({ url, label }) => {
  return (
    <Link
      className='py-2 px-4 cursor-pointer w-full block hover:bg-blue-200 duration-200'
      href={url}
    >
      {label}
    </Link>
  );
};

export default SidebarNavItem;

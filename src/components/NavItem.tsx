import Link from 'next/link';
import React from 'react';

export interface INavItem {
  label: string;
  hasSubmenu?: boolean;
  url?: string;
  subMenuItems?: Array<{ label: string; url: string }>;
}

const NavItem: React.FC<INavItem> = ({
  label,
  hasSubmenu = false,
  url,
  subMenuItems = []
}) => {
  return (
    <li className='relative group py-4'>
      <Link
        href={hasSubmenu ? '#' : String(url)}
        className='hover:text-button-primary duration-200 hover:underline hover:underline-offset-2 text-[1.15rem] font-semibold'
      >
        {label}
      </Link>
      {hasSubmenu ? (
        <ul className='absolute hidden group-hover:block bg-blue-theme bg-opacity-80 mt-2 w-48 rounded-md shadow-lg z-[99]'>
          {subMenuItems?.map((item, i) => (
            <li
              className='px-4 py-2 bg-white hover:bg-white hover:underline'
              key={i}
            >
              <Link
                href={item.url}
                className='text-primary hover:text-button-primary hover:scale-105 duration-150'
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default NavItem;

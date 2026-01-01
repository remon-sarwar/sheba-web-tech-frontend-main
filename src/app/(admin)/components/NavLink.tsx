'use client';
import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { INavLink } from './interfaces';

const NavLink: React.FC<INavLink> = ({
  icon,
  url,
  text,
  isCollapsed = false
}) => {
  const pathname = usePathname();

  return (
    <Link href={url}>
      <span
        className={`${
          pathname === url ? 'text-white bg-button-primary' : 'text-black'
        } flex gap-4 py-2 px-4 items-center my-1 duration-150`}
      >
        {icon ? (
          icon
        ) : (
          <AiOutlineLink
            className={`${
              pathname === url ? 'text-white bg-button-primary' : 'text-black'
            }`}
          />
        )}
        {!isCollapsed ? <span className=''>{text}</span> : null}
      </span>
    </Link>
  );
};

export default NavLink;

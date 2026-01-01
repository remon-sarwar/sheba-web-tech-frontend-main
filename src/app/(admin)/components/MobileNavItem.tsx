'use client';

import { forwardRef } from 'react';
import { usePathname } from 'next/navigation';
import { IMobileNavItem } from './interfaces';

const MobileNavItem = forwardRef<HTMLAnchorElement, IMobileNavItem>(
  (props, ref) => {
    const { onClick, href, text, activeFlag, className } = props;
    const pathname = usePathname();

    return (
      <a
        className={`text-md font-normal pl-4 py-4 ${
          // TODO modify here
          pathname === href ? 'text-white bg-crimson' : 'text-black'
        } ${className}`}
        href={href}
        onClick={onClick}
        ref={ref}
      >
        {text}
      </a>
    );
  }
);

MobileNavItem.displayName = 'MobileNavItem';
export default MobileNavItem;

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';

interface IMobileNavItem {
  label: string;
  url?: string;
  submenu?: Array<{ label: string; href: string }>;
  handleClose: () => void;
}

const MobileNavItem: React.FC<IMobileNavItem> = ({
  label,
  url,
  submenu,
  handleClose
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      className='relative list-none'
    >
      <button
        onClick={toggleMenu}
        className='flex items-center justify-between w-full px-4 py-2 text-left text-gray-600 hover:text-button-primary'
      >
        {submenu ? (
          <span>{label}</span>
        ) : (
          <Link onClick={() => handleClose()} href={String(url)}>
            {label}
          </Link>
        )}
        {submenu && (
          <FaChevronDown
            className={`text-white transition-transform duration-300 ${
              isOpen ? '-rotate-180' : ''
            }`}
            size='16'
          />
        )}
      </button>
      {submenu && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          className='z-10 overflow-hidden'
        >
          {submenu.map((item, index) => (
            <motion.li
              key={index}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                delay: index * 0.05,
                type: 'spring',
                stiffness: 400,
                damping: 40
              }}
            >
              <Link
                href={item.href}
                className='block px-6 py-2 text-sm text-white hover:text-gold'
                onClick={() => handleClose()}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.li>
  );
};

export default MobileNavItem;

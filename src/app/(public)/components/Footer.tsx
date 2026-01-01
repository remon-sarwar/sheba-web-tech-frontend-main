import React from 'react';
import logo from '../../../../public/sheba.png';
import Link from 'next/link';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp
} from 'react-icons/fa';
import { MdEmail, MdLocationPin } from 'react-icons/md';
import { FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className='flex justify-center bg-[#001b3d] text-white py-16'>
      <section className='grid grid-cols-1 lg:grid-cols-3 w-11/12 lg:w-10/12'>
        <div className=''>
          <h2 className='text-3xl my-8'>Contact</h2>

          <div>
            <h3 className='font-semibold text-lg'>
              USA & International Contact
            </h3>
            <div className=''>
              <p className='inline-flex items-center gap-2'>
                <MdLocationPin />
                Bridgeport, Connecticut, USA.
              </p>
            </div>
            <div className=''>
              <p className='inline-flex items-center gap-2'>
                <FaWhatsapp size={18} /> +1-203-534-6163 (WhatsApp)
              </p>
            </div>
            <div className=''>
              <p className='inline-flex items-center gap-2'>
                <MdEmail size={18} />
                <a href='mailto:admin@shebawebtech.com'>
                  info@shebawebtech.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className=''>
          <h2 className='text-3xl my-8'>Socials</h2>

          <div className='flex gap-4'>
            <a
              href='https://www.facebook.com/SheBaWebTechnologyLLC'
              target='_blank'
            >
              <FaFacebook size={24} />
            </a>
            <a
              href='https://www.linkedin.com/company/sheba-web-technology-llc'
              target='_blank'
            >
              <FaLinkedin size={24} />
            </a>
            <a href='https://x.com/ShebaWeb82912' target='_blank'>
              <FaSquareXTwitter size={24} />
            </a>
          </div>
        </div>

        <div className=''>
          <h2 className='text-3xl my-8'>Legal</h2>

          <ul>
            <Link href='/privacy-policy'>
              <li>Privacy Policy</li>
            </Link>
            <Link href='/terms-of-service'>
              <li>Terms of Service</li>
            </Link>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Footer;

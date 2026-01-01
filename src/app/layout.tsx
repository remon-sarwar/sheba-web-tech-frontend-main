import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import StoreProvider from './StoreProvider';
import CartSummary from '@/components/CartSummary';
import AuthHelper from './(public)/components/AuthHelper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'SheBa Web Technology',
    template: '%s | SheBa Web Technology'
  },
  description:
    'SheBa Web Technology builds modern, scalable, and human-centered web solutions. From hosting to full-stack development — we make the web simpler, faster, and smarter.',
  metadataBase: new URL('https://shebawebtech.com'),
  keywords: [
    'SheBa Web Technology',
    'web hosting Bangladesh',
    'Next.js development',
    'custom web solutions',
    'modern web design',
    'reliable shared hosting'
  ],
  alternates: {
    canonical: 'https://shebawebtech.com'
  },
  authors: [{ name: 'SheBa Web Technology Team' }],
  category: 'Technology'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <CartSummary totalItems={1} totalPrice={55} />
          <AuthHelper />
        </body>
      </html>
    </StoreProvider>
  );
}

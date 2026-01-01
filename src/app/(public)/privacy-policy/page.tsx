import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SheBa Web Technology',
  description:
    'Learn how SheBa Web Technology collects, uses, and protects your personal data when using our hosting and domain services.'
};

export default function PrivacyPolicyPage() {
  return (
    <main className='max-w-3xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-semibold mb-6'>Privacy Policy</h1>
      <p className='text-sm mb-8'>Last Updated: October 2025</p>

      <section className='space-y-4'>
        <p>
          At <strong>SheBa Web Technology</strong>, we respect your privacy and
          are committed to protecting the personal information you share with
          us. This Privacy Policy explains how we collect, use, and safeguard
          your data when you use our website, hosting, or domain services.
        </p>

        <h2 className='text-xl font-medium mt-8'>1. Information We Collect</h2>
        <ul className='list-disc list-inside space-y-1'>
          <li>Account information (name, email, phone, billing address)</li>
          <li>
            Payment details processed securely through third-party gateways
            (e.g., Stripe). We do not store card information.
          </li>
          <li>
            Usage data such as IP addresses, login logs, and resource usage for
            security and service monitoring.
          </li>
          <li>Cookies for session management and analytics.</li>
        </ul>

        <h2 className='text-xl font-medium mt-8'>
          2. How We Use Your Information
        </h2>
        <ul className='list-disc list-inside space-y-1'>
          <li>To provide hosting, domain, and related services</li>
          <li>To process payments and renewals</li>
          <li>To communicate regarding your account and support</li>
          <li>To maintain system security and prevent abuse</li>
          <li>To improve user experience and platform performance</li>
        </ul>

        <h2 className='text-xl font-medium mt-8'>3. Data Retention</h2>
        <p>
          We retain data as long as necessary to provide our services or comply
          with legal obligations. You may request deletion at any time by
          contacting us.
        </p>

        <h2 className='text-xl font-medium mt-8'>4. Sharing and Disclosure</h2>
        <p>
          We never sell your data. Limited sharing may occur with payment
          processors, registrars, or legal authorities when required by law.
        </p>

        <h2 className='text-xl font-medium mt-8'>5. Security</h2>
        <p>
          We use encryption, firewalls, and access control to protect your
          information. However, no online service is completely secure.
        </p>

        <h2 className='text-xl font-medium mt-8'>6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your data. Contact us
          at <strong>support@shebawebtech.com</strong> for any such request.
        </p>

        <h2 className='text-xl font-medium mt-8'>7. Updates</h2>
        <p>
          We may update this Privacy Policy periodically. Continued use of our
          services implies acceptance of any revised terms.
        </p>
      </section>
    </main>
  );
}

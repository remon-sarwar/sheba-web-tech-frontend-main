import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | SheBa Web Technology',
  description:
    "Read the Terms of Service governing the use of SheBa Web Technology's hosting and domain services."
};

export default function TermsOfServicePage() {
  return (
    <main className='max-w-3xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-semibold mb-6'>Terms of Service</h1>
      <p className='text-sm mb-8'>Last Updated: October 2025</p>

      <section className='space-y-4'>
        <p>
          By using SheBa Web Technology’s hosting, domain, or related services,
          you agree to the following terms and conditions.
        </p>

        <h2 className='text-xl font-medium mt-8'>
          1. Account Responsibilities
        </h2>
        <p>
          You are responsible for maintaining accurate account information and
          securing your login credentials. Any activity under your account is
          your responsibility.
        </p>

        <h2 className='text-xl font-medium mt-8'>2. Acceptable Use</h2>
        <ul className='list-disc list-inside space-y-1'>
          <li>Do not engage in spam, phishing, or malware distribution.</li>
          <li>Do not host illegal, copyrighted, or adult content.</li>
          <li>
            Do not run activities that disrupt servers or abuse system
            resources.
          </li>
        </ul>
        <p>
          Violations may result in suspension or termination without refund.
        </p>

        <h2 className='text-xl font-medium mt-8'>3. Payment and Renewal</h2>
        <p>
          Plans are billed in advance on a monthly or yearly basis. Failure to
          pay before renewal may result in service suspension. Prices may change
          with prior notice.
        </p>

        <h2 className='text-xl font-medium mt-8'>4. Refund Policy</h2>
        <p>
          Refunds are available within{' '}
          <strong>7 days of initial purchase</strong> for hosting services only.
          Domain registration fees are non-refundable once processed.
        </p>

        <h2 className='text-xl font-medium mt-8'>5. Resource Usage</h2>
        <p>
          Each plan includes defined resource limits. Accounts exceeding their
          quotas may be restricted or asked to upgrade.
        </p>

        <h2 className='text-xl font-medium mt-8'>6. Backups and Data</h2>
        <p>
          While we perform routine backups, clients are responsible for
          maintaining their own data backups.
        </p>

        <h2 className='text-xl font-medium mt-8'>7. Service Availability</h2>
        <p>
          We target 99.9% uptime but do not guarantee uninterrupted operation.
          Maintenance or unexpected outages may occur.
        </p>

        <h2 className='text-xl font-medium mt-8'>8. Liability Disclaimer</h2>
        <p>
          SheBa Web Technology is not liable for data loss, downtime, or damages
          arising from service use. Services are provided “as is.”
        </p>

        <h2 className='text-xl font-medium mt-8'>9. Termination</h2>
        <p>
          We may suspend or terminate accounts that violate these terms or
          threaten platform integrity.
        </p>

        <h2 className='text-xl font-medium mt-8'>10. Contact</h2>
        <p>
          For legal or support inquiries, reach us at{' '}
          <strong>support@shebawebtech.com</strong> or visit{' '}
          <strong>www.shebawebtech.com</strong>.
        </p>
      </section>
    </main>
  );
}

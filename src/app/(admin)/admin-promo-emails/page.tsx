'use client';

import React, { useEffect, useState } from 'react';
import PromoEmailService from '@/endpoints/PromoEmailService';
import { DataTable } from '@/components/ui/data-table';
import IPromoEMail from '@/interfaces/collections/IPromoEmail';
import { ColumnDef } from '@tanstack/react-table';
import PromoEmailForm from './components/SendEmailForm';

const Page = () => {
  const [emails, setEmails] = useState<IPromoEMail[]>([]);
  const [form, setForm] = useState({
    to: '',
    subject: '',
    body: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleOpen = () => setOpen(!open);

  const handleChange = (value: string, field: 'to' | 'subject' | 'body') => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const columns: ColumnDef<IPromoEMail>[] = [
    { header: 'To', accessorKey: 'to' },
    { header: 'Subject', accessorKey: 'subject' },
    {
      header: 'Body',
      accessorKey: 'body',
      cell: ({ row }) => (
        <div className='max-w-[300px] truncate text-sm'>
          {row.original.body}
        </div>
      )
    },
    {
      header: 'Sent At',
      accessorKey: 'createdAt',
      cell: ({ row }) => (
        <div>{new Date(row.original.createdAt).toLocaleString()}</div>
      )
    }
  ];

  const load = async () => {
    try {
      const svc = new PromoEmailService();
      const data = await svc.getSentEmails();
      setEmails(data);
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const svc = new PromoEmailService();
      await svc.sendEmail(form.to, form.subject, form.body);

      setSuccess('Email sent successfully!'); // 🎉 success state

      setForm({ to: '', subject: '', body: '' });
      setRefresh(true);

      // Optional: keep the modal open so user SEES the success banner.
      // If you absolutely want to close modal automatically, uncomment:
      // setOpen(false);
    } catch (err: any) {
      console.error(err);
      const message =
        err?.response?.data?.message || err?.message || 'Failed to send email.';
      setError(message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (refresh) {
      load();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <div className='container mx-auto py-6'>
      <h1 className='text-2xl font-bold mb-6'>Promo Emails</h1>

      <PromoEmailForm
        email={form}
        // @ts-ignore
        handleChange={handleChange}
        handleOpen={handleOpen}
        isLoading={isLoading}
        mode='new'
        error={error}
        success={success}
        open={open}
        save={submit}
      />

      <DataTable columns={columns} data={emails} />
    </div>
  );
};

export default Page;

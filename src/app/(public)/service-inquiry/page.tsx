'use client';

import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import FormSubmissionService from '@/endpoints/admin/FormSubmissionService';

export default function ServiceRequestForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    details: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: FormEvent) => {
    // @ts-ignore
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new FormSubmissionService().create({
        email: form.email,
        name: form.name,
        servicetype: form.service,
        details: form.details
      });

      setForm({
        name: '',
        email: '',
        service: '',
        details: ''
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto space-y-10'>
        <div className='text-center'>
          <div className='inline-flex items-center gap-2 text-primary font-semibold text-lg'>
            <Sparkles className='w-5 h-5' /> Make Something Awesome
          </div>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mt-2'>
            Request a Custom Service
          </h1>
          <p className='mt-4 text-muted-foreground text-base'>
            Fill out the form below and let us know how we can bring your vision
            to life.
          </p>
        </div>

        <Card className='shadow-2xl rounded-2xl border border-gray-200'>
          <CardContent className='p-8 space-y-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <Input
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder='Full Name'
                  className='rounded-xl border border-primary'
                  required
                />
                <Input
                  name='email'
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='Email Address'
                  className='rounded-xl border border-primary'
                  required
                />
              </div>

              <Input
                name='service'
                value={form.service}
                onChange={handleChange}
                placeholder='Which service are you interested in? (e.g. Logo Design)'
                className='rounded-xl border border-primary'
                required
              />

              <Textarea
                name='details'
                value={form.details}
                onChange={handleChange}
                placeholder='Any other queries you have'
                className='rounded-xl border border-primary'
                rows={6}
                required
              />

              <Button
                type='submit'
                className='w-full bg-primary text-white text-lg py-3 rounded-xl hover:bg-primary/90 transition cursor-pointer duration-200'
                disabled={isLoading}
              >
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

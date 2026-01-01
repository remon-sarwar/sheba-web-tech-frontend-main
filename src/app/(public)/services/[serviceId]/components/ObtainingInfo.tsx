'use client';

import React, { FormEvent, useState } from 'react';
import { IService } from '@/util/ServicesData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FormSubmissionService from '@/endpoints/admin/FormSubmissionService';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

import bgImage from '../../../../../../public/services-bg.png';

export interface IObtainingInfo {
  service: Partial<IService>;
}

const OBTAINING_MAP: Record<string, { steps: string[]; actionLabel: string }> =
  {
    'direct-buy': {
      steps: [
        'Choose your desired package',
        'Add to cart and complete payment.',
        'Receive confirmation and access details.'
      ],
      actionLabel: 'Buy Now'
    },
    'tailored-solution': {
      steps: [
        'Fill out the project brief (we only need a few details).',
        'Our team reviews your request and schedules a call.',
        'Receive a tailored proposal and timeline.'
      ],
      actionLabel: 'Request Quote'
    },
    default: {
      steps: [
        'Fill out the project brief (we only need a few details).',
        'Our team reviews your request and schedules a call.',
        'Receive a tailored proposal and timeline.'
      ],
      actionLabel: 'Get Started'
    }
  };

const ObtainingInfo: React.FC<IObtainingInfo> = ({ service }) => {
  const svcType = service?.type ?? 'default';
  const proc = OBTAINING_MAP[svcType] ?? OBTAINING_MAP.default;

  const [form, setForm] = useState({
    name: '',
    email: '',
    serviceName: service?.title || '',
    details: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: FormEvent) => {
    // @ts-ignore
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    try {
      await new FormSubmissionService().create({
        email: form.email,
        name: form.name,
        servicetype: form.serviceName,
        details: form.details
      });

      setForm({
        name: '',
        email: '',
        serviceName: '',
        details: ''
      });
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    }
    setIsLoading(false);
  };

  return (
    <section id='obtaining' className='mt-8'>
      <h2 className='text-3xl font-semibold mb-8 text-center'>
        Take your business to the next level
      </h2>
      <div>
        <h3 className='text-xl font-medium mb-8 text-center'>
          How to obtain {service?.title ?? 'this service'}
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {proc.steps.map((s, idx) => (
            <div
              key={idx}
              className='rounded-xl shadow-sm flex flex-col'
              style={{
                backgroundImage: `url(${bgImage.src})`
              }}
            >
              <div className='flex w-full justify-center'>
                <div className='text-primary font-bold text-3xl bg-[#0081cc70] rounded-t-lg w-full p-10 text-center'>
                  {idx + 1}
                </div>
              </div>
              <div className='mt-2 text-center text-xl my-2 p-4 font-bold text-primary'>
                {s}
              </div>
            </div>
          ))}
        </div>

        {service?.type === 'tailored-solution' ? (
          <div className='flex justify-center w-full py-16'>
            <form onSubmit={handleSubmit} className='space-y-6 w-1/2'>
              <h3 className='text-2xl text-center my-12'>
                Reach out to us for {service?.title}!
              </h3>

              {isSuccess && (
                <div className='text-green-600 bg-green-100 border border-green-300 rounded-md p-3 text-center text-sm font-medium'>
                  Your request has been submitted successfully! Our team will
                  get back to you soon.
                </div>
              )}

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <Label className='mb-2'>Full Name</Label>
                  <Input
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='Full Name'
                    className='rounded-xl border border-primary text-lg'
                    required
                  />
                </div>
                <div>
                  <Label className='mb-2'>Email</Label>
                  <Input
                    name='email'
                    type='email'
                    value={form.email}
                    onChange={handleChange}
                    placeholder='Email Address'
                    className='rounded-xl border border-primary text-lg'
                    required
                  />
                </div>
              </div>

              <div>
                <Label className='mb-2'>Your queries</Label>
                <Textarea
                  name='details'
                  value={form.details}
                  onChange={handleChange}
                  placeholder='Any other queries you have'
                  className='rounded-xl border border-primary text-lg'
                  rows={6}
                  required
                />
              </div>

              <Button
                type='submit'
                className='w-full bg-primary text-white text-lg py-3 rounded-xl hover:bg-primary/90 transition cursor-pointer duration-200 flex justify-center items-center gap-2'
                disabled={isLoading}
                size='lg'
              >
                {isLoading ? (
                  <>
                    <svg
                      className='animate-spin h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </form>
          </div>
        ) : (
          <div className='flex justify-center w-full py-16'>
            <Link href='/shared-hosting'>
              <Button className='px-6 py-8 text-xl cursor-pointer' size='lg'>
                Explore cPanel Hosting
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ObtainingInfo;

// app/contact/page.jsx
'use client';

import { FormEvent, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdLocationPin } from 'react-icons/md';

// export const metadata = {
//   title:
//     'Contact Us | Let’s Build Something Great Together – SheBa Web Technology',
//   description:
//     'Have a question or a project idea? Reach out to SheBa Web Technology — real people, real support, and quick responses.'
// };

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: FormEvent) => {
    // @ts-ignore
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white p-6 md:p-12'>
      <h1 className='text-4xl font-bold text-center text-slate-900 mb-12'>
        Contact SheBa Web Technology
      </h1>

      <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12'>
        {/* Company Info */}
        <div className='bg-slate-50 p-10 rounded-2xl shadow-2xl border border-slate-100 hover:scale-105 transition-transform duration-300'>
          <h2 className='text-3xl font-bold text-primary mb-6'>
            Company Information
          </h2>
          <p className='mb-6 text-slate-800'>
            Welcome to <strong>SheBa Web Technology</strong>, your trusted
            partner in delivering innovative web and technology solutions with
            exceptional service.
          </p>

          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold text-primary text-lg'>
                USA & International Contact
              </h3>
              <div className=''>
                <p className='inline-flex items-center gap-2'>
                  <MdLocationPin />
                  Bridgeport, Connecticut, USA
                </p>
              </div>
              <div className=''>
                <p className='inline-flex items-center gap-2'>
                  <FaWhatsapp size={18} /> +1-203-534-6163
                </p>
              </div>
              <div className=''>
                <p className='inline-flex items-center gap-2'>
                  <MdEmail size={18} />
                  <a href='mailto:admin@shebawebtech.com'>
                    admin@shebawebtech.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className='bg-white p-10 rounded-2xl shadow-2xl border border-gray-200 hover:scale-105 transition-transform duration-300'>
          <h2 className='text-3xl font-bold text-primary mb-6'>
            Send Us a Message
          </h2>

          {submitted ? (
            <div className='bg-green-100 text-green-800 p-5 rounded-lg text-center font-semibold'>
              Thank you for your message! We will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='block font-medium text-primary mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  required
                  className='w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400'
                  placeholder='Your Name'
                />
              </div>
              <div>
                <label className='block font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  required
                  className='w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400'
                  placeholder='you@example.com'
                />
              </div>
              <div>
                <label className='block font-medium text-primary mb-1'>
                  Message
                </label>
                <textarea
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  required
                  className='w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400'
                  placeholder='Your message...'
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-xl transition-colors duration-300'
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

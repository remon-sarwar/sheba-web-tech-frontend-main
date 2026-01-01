'use client';

import React, { FormEvent, useState } from 'react';

export default function EditUserDetails() {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+880 1234 567890',
    domain: 'example.com',
    hostingPlan: 'Premium'
  });

  // Removed TypeScript type annotation
  const handleChange = (e: FormEvent) => {
    // @ts-ignore
    setFormData({ ...formData, [e.target?.name]: e.target?.value });
  };

  const handleSave = () => {
    alert('User details updated!');
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6'>
      <div className='max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8'>
        {/* Page Title */}
        <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
          Edit User Details
        </h1>

        {/* Profile Picture Upload */}
        <div className='flex flex-col items-center mb-6'>
          <img
            src='https://via.placeholder.com/120'
            alt='Profile'
            className='w-28 h-28 rounded-full border-4 border-gray-200 object-cover'
          />
          <label
            htmlFor='profilePic'
            className='mt-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
          >
            Change Picture
          </label>
          <input type='file' id='profilePic' className='hidden' />
        </div>

        {/* Form Fields */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block font-bold text-gray-700 mb-1'>
              Full Name
            </label>
            <input
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div>
            <label className='block font-bold text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div>
            <label className='block font-bold text-gray-700 mb-1'>Phone</label>
            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div>
            <label className='block font-bold text-gray-700 mb-1'>Domain</label>
            <input
              type='text'
              name='domain'
              value={formData.domain}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div>
            <label className='block font-bold text-gray-700 mb-1'>
              Hosting Plan
            </label>
            <input
              type='text'
              name='hostingPlan'
              value={formData.hostingPlan}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400'
            />
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-center gap-4 mt-8'>
          <button
            className='bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition'
            onClick={() => alert('Cancelled')}
          >
            Cancel
          </button>
          <button
            className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition'
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

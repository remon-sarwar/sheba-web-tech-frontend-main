'use client';

import React, { useState } from 'react';

function CheckoutPage() {
  const [duration, setDuration] = useState(12);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(3);
  const [agreed, setAgreed] = useState(false);

  const domainCost = 12;
  const hostingCostPerMonth = 1;
  const hostingCost = duration * hostingCostPerMonth;
  const total = domainCost + hostingCost - promoDiscount;

  const handlePromoApply = () => {
    if (promoCode.trim().toLowerCase() === 'save3') {
      setPromoDiscount(3);
    } else {
      alert('Invalid promo code');
      setPromoDiscount(0);
    }
  };

  const handleProceed = () => {
    if (!agreed) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    alert(`Payment processed! Total paid: $${total}`);
  };

  return (
    <div className='min-h-screen bg-white p-5 font-poppins text-black'>
      {/* Header */}

      {/* Main content */}
      <div className='flex flex-wrap gap-10'>
        {/* Left - Checkout */}
        <div className='flex-1 min-w-[350px] p-6 bg-white rounded shadow-sm'>
          <h2 className='text-2xl font-semibold mb-2'>Checkout</h2>
          <p className='mb-4'>Order Summary</p>

          <div className='flex justify-between my-2'>
            <span>brandname.com</span>
            <span>$12/year</span>
          </div>

          <label htmlFor='duration' className='block mt-4 mb-1 font-medium'>
            Starter Plan for Hosting
          </label>
          <select
            id='duration'
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            className='w-full border border-gray-300 rounded px-3 py-2'
          >
            <option value={12}>12 Months</option>
            <option value={24}>24 Months</option>
            <option value={36}>36 Months</option>
            <option value={48}>48 Months</option>
            <option value={60}>60 Months</option>
          </select>

          {/* Promo Code */}
          <div className='flex gap-2 mt-4'>
            <input
              type='text'
              placeholder='Promo Code'
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              className='flex-1 border border-gray-300 rounded px-3 py-2'
            />
            <button
              onClick={handlePromoApply}
              className='bg-cyan-400 text-white px-4 py-2 rounded hover:bg-cyan-500 transition'
            >
              Apply
            </button>
          </div>

          <hr className='my-4' />

          <div className='flex justify-between my-2'>
            <span>Domain Registration</span>
            <span>${domainCost}</span>
          </div>
          <div className='flex justify-between my-2'>
            <span>Hosting ({duration} Months)</span>
            <span>${hostingCost}</span>
          </div>
          <div className='flex justify-between my-2'>
            <span>Promo Applied</span>
            <span className='text-green-600'>-${promoDiscount}</span>
          </div>
          <div className='flex justify-between my-4 font-bold'>
            <span>Total</span>
            <span>${total}</span>
          </div>

          <div className='mt-4'>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className='accent-cyan-500'
              />
              <span>I agree to Terms and Conditions</span>
            </label>
          </div>

          <button
            onClick={handleProceed}
            disabled={!agreed}
            className={`w-full mt-5 py-3 rounded text-black font-semibold ${
              agreed
                ? 'bg-cyan-100 hover:bg-cyan-200 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
        </div>

        {/* Right - Image from local /public/images/checkout.jpg */}
        <div className='flex-1 min-w-[300px] flex items-center justify-center'>
          <img
            src='/images/checkout.jpg'
            alt='Checkout'
            className='rounded-lg w-full max-w-md'
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import {
  initCart,
  removeItem,
  openCart,
  closeCart
} from '@/lib/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FaShoppingCart } from 'react-icons/fa';
import { MdClose, MdDelete } from 'react-icons/md';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = () => {
  const { cart, isCartOpen } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const cartInit = () => dispatch(initCart());

  const removeCartItem = (id: string | number) => dispatch(removeItem(id));

  const openReduxCart = () => dispatch(openCart());
  const closeReduxCart = () => dispatch(closeCart());

  useEffect(() => {
    cartInit();
  }, []);

  return (
    <div className='fixed top-20 right-4 z-50'>
      {/* FAB button */}
      {!isCartOpen && (
        <button
          onClick={() => openReduxCart()}
          className='relative w-14 h-14 rounded-full bg-[#0081cc] text-white shadow-lg flex items-center justify-center hover:bg-[#0081cc]/90 transition-all cursor-pointer'
        >
          <FaShoppingCart size={22} />

          {/* Badge */}
          <span className='absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold'>
            {cart.length}
          </span>
        </button>
      )}

      {/* Expanded panel */}
      {isCartOpen && (
        <div
          className={`relative w-72 min-h-[200px] max-h-[400px] bg-white shadow-lg border border-blue-300 rounded-lg overflow-y-scroll transform transition-all duration-300`}
        >
          {/* Close (X) button */}
          <button
            onClick={() => closeReduxCart()}
            className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition cursor-pointer'
          >
            <MdClose size={22} />
          </button>

          <div className='h-full flex flex-col justify-start p-4'>
            <div>
              <p className='text text-gray-600'>
                {cart.length} item{cart.length > 1 ? 's' : ''} in cart
              </p>
              <p className='text-lg font-semibold mt-1'>
                ${cart.reduce((acc, curr) => (acc += Number(curr.price)), 0)}
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              {cart.map((item, i: number) => (
                <div
                  className='bg-slate-100 py-2 px-4 flex justify-between'
                  key={i}
                >
                  <div className=''>
                    <h4 className='my-1 text-lg font-bold'>{item.name}</h4>
                    <span className='my-1'>${item.price}</span>
                  </div>
                  <div className=''>
                    <button
                      className='bg-red-400 text-white p-2 rounded-md cursor-pointer'
                      onClick={() => removeCartItem(item.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex flex-col space-y-2 mt-4'>
              <Link href='/cart' className='cursor-pointer'>
                <button className='w-full px-4 py-2 bg-[#0081cc] text-white rounded-md hover:bg-[#0081cc]/80 transition cursor-pointer'>
                  View Cart
                </button>
              </Link>

              {/* <button
                onClick={() => alert('Checkout')}
                className='w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition cursor-pointer'
              >
                Checkout
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;

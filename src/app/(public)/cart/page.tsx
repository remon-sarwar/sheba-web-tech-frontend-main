'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { addItem, removeItem, initCart } from '@/lib/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

// export const metadata = {
//   title: 'Cart | Review Your Order – SheBa Web Technology',
//   description:
//     'Double-check your hosting or service plan before checkout. Transparent pricing, no hidden fees, no surprise renewals.'
// };

export default function CartPage() {
  const { cart } = useAppSelector(state => state.cart);
  // const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const [total, setTotal] = useState(0);

  const dispatch = useAppDispatch();
  const addCartItem = (item: Record<string, string | number>) =>
    dispatch(addItem(item));
  const removeCartItem = (id: string | number) => dispatch(removeItem(id));

  useEffect(() => {
    dispatch(initCart());
  }, []);

  useEffect(() => {
    const totalPrice = (cart as Record<string, string | number>[])
      .filter(item => selected.includes(item.id))
      .reduce((sum, item) => sum + Number(item.price), 0);
    setTotal(totalPrice);
  }, [selected, cart]);

  const toggleSelect = (id: string | number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(sid => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const proceedToOrder = () => {
    const selectedItems = cart.filter(item => selected.includes(item.id));
    if (selectedItems.length === 0) {
      alert('Please select at least one package to proceed.');
      return;
    }

    // FIX this logic seems flawed
    if (localStorage.getItem('token')) {
      document.location = '/payment/' + selectedItems[0].id;
    } else {
      alert('You have to login before order!');
      document.location = '/login';
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-8 space-y-10'>
      <h1 className='text-4xl font-extrabold text-center text-primary'>
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className='min-h-[50vh]'>
          <p className='text-center text-gray-500'>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className='rounded-lg shadow-lg shadow-neutral-200 bg-blue-300 px-4 py-4'>
            Please select an item to proceed to checkout
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {cart.map(item => (
              <Card
                key={item.id}
                className='rounded-2xl border shadow-md hover:shadow-xl transition duration-200 bg-white'
              >
                <CardContent className='space-y-4 p-6'>
                  <div className='flex justify-between items-start'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        checked={selected.includes(item.id)}
                        onCheckedChange={() => toggleSelect(item.id)}
                      />
                      <h2 className='text-lg font-semibold text-gray-800'>
                        {item.name}
                      </h2>
                    </div>
                    <span className='text-xl font-bold text-green-600'>
                      ${item.price}
                    </span>
                  </div>

                  {/* Only show a few important details */}
                  <ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
                    {
                      // @ts-ignore
                      (item.detailslist as any[])
                        .slice(0, 3)
                        .map(
                          (
                            detail: Record<string, string | number>,
                            idx: number
                          ) => (
                            <li key={idx}>
                              <span className='font-medium'>{detail.key}:</span>{' '}
                              {detail.value}
                            </li>
                          )
                        )
                    }
                  </ul>

                  <div className='flex justify-end'>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => removeCartItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {cart.length > 0 && (
        <div className='text-center space-y-4'>
          {selected.length > 0 && (
            <div className='text-xl font-semibold text-gray-800'>
              Total Price: <span className='text-green-600'>${total}</span>
            </div>
          )}
          <Button
            className='bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary/90 shadow-md cursor-pointer'
            size='lg'
            onClick={proceedToOrder}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
